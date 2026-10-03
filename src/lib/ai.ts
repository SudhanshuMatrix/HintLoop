import { HintLevel, HintRequest, HintApiResponse } from './types';
import { SAMPLE_PROBLEMS } from './samples';

const PROVIDER = (process.env.AI_PROVIDER || 'openrouter').toLowerCase();
const MODEL_NAME = resolveModelName(PROVIDER, process.env.AI_MODEL);
const API_KEY = process.env.AI_API_KEY || process.env.OPENROUTER_API_KEY || process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY || '';
const API_BASE = process.env.AI_API_BASE || getProviderBase(PROVIDER);

function resolveModelName(provider: string, envModel?: string): string {
  // If user provided a specific custom model that doesn't match cross-provider defaults
  if (envModel && envModel !== 'google/gemma-2-9b-it:free' && envModel !== 'gemma-2-9b-it') {
    if (provider === 'groq' && envModel.includes('google/')) {
      return 'gemma2-9b-it';
    }
    return envModel;
  }

  switch (provider) {
    case 'groq':
      return 'gemma2-9b-it';
    case 'ollama':
      return 'gemma2:9b';
    case 'google':
      return 'gemma-2-9b-it';
    case 'huggingface':
      return 'google/gemma-2-9b-it';
    case 'openrouter':
    default:
      return envModel || 'google/gemma-2-9b-it:free';
  }
}

function getProviderBase(provider: string): string {
  switch (provider) {
    case 'groq':
      return 'https://api.groq.com/openai/v1';
    case 'ollama':
      return 'http://localhost:11434/v1';
    case 'huggingface':
      return 'https://api-inference.huggingface.co/v1';
    case 'google':
      return 'https://generativelanguage.googleapis.com/v1beta/openai';
    case 'openrouter':
    default:
      return 'https://openrouter.ai/api/v1';
  }
}

export async function fetchHintFromAI(req: HintRequest): Promise<HintApiResponse> {
  const { problemTitle, problemDescription, userAttempt, targetLevel, customQuery } = req;

  // Check if we should use live AI or fallback to simulated demo mode
  if (!API_KEY && PROVIDER !== 'ollama') {
    return generateSimulatedResponse(req, 'No API key configured (using Gemma-2-9B local demo mode)');
  }

  try {
    const promptInstructions = getPromptInstructions(targetLevel);
    
    const userPrompt = `
PROBLEM TITLE:
${problemTitle || 'DSA Problem'}

PROBLEM DESCRIPTION:
${problemDescription}

STUDENT'S CURRENT ATTEMPT & THOUGHT PROCESS:
${userAttempt}

${customQuery ? `STUDENT'S SPECIFIC QUESTION / NOTE:\n${customQuery}\n` : ''}

REQUIRED HINT LEVEL: ${targetLevel}
${promptInstructions}
`;

    const systemPrompt = `You are HintLoop, a specialized Data Structures & Algorithms (DSA) hint tutor powered by the open-weight Gemma model (${MODEL_NAME}).

YOUR TUTOR RULES:
1. Act exclusively as a hint-based DSA tutor for a friend.
2. DO NOT reveal the full solution or write complete code unless requested at level 'approach'.
3. Always tailor your response directly to what the student has tried. Acknowledge where their logic went wrong or reached a bottleneck.
4. Keep the hint clear, concise, encouraging, and focused on helping them think logically.
5. Format your output cleanly in Markdown.
6. Provide a concise Title for the hint on the first line formatted as '# Hint Title'.`;

    const response = await fetch(`${API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(API_KEY ? { 'Authorization': `Bearer ${API_KEY}` } : {}),
        'HTTP-Referer': 'https://hintloop.dev',
        'X-Title': 'HintLoop DSA Tutor',
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.4,
        max_tokens: 1200,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`AI API (${PROVIDER} / ${MODEL_NAME}) returned status ${response.status}: ${errText}`);
      return generateSimulatedResponse(req, `API call failed (status ${response.status}). Falling back to Gemma simulated mode.`);
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || '';

    if (!rawContent) {
      return generateSimulatedResponse(req, 'Empty response from model.');
    }

    // Extract title if present (first header line)
    const titleMatch = rawContent.match(/^#\s+(.+)$/m);
    const hintTitle = titleMatch ? titleMatch[1].trim() : getDefaultTitle(targetLevel);
    const content = rawContent.replace(/^#\s+.+$/m, '').trim();

    return {
      success: true,
      level: targetLevel,
      title: hintTitle,
      content: content,
      modelUsed: `Gemma (${MODEL_NAME})`,
      isSimulated: false,
    };
  } catch (err: any) {
    console.error('Error contacting AI service:', err);
    return generateSimulatedResponse(req, err?.message || 'Network error');
  }
}

function getPromptInstructions(level: HintLevel): string {
  switch (level) {
    case 1:
      return 'HINT LEVEL 1 RULE: Identify the overall direction, high-level approach, or pattern without giving away the data structure or algorithm.';
    case 2:
      return 'HINT LEVEL 2 RULE: Point toward the specific relevant data structure or algorithmic technique (e.g. Two Pointers, Sliding Window, Monotonic Stack, Trie, Union Find). Explain WHY it fits.';
    case 3:
      return 'HINT LEVEL 3 RULE: Explain the key mathematical or algorithmic observation/insight needed to bridge the gap between their attempt and the optimal solution.';
    case 4:
      return 'HINT LEVEL 4 RULE: Give detailed pseudo-code or step-by-step implementation guidance without giving a copy-paste solution.';
    case 'approach':
      return 'FULL APPROACH RULE: Provide the complete optimal approach explanation, time and space complexity, and write a complete, clean Go implementation with comments.';
  }
}

function getDefaultTitle(level: HintLevel): string {
  switch (level) {
    case 1: return 'Hint 1: Direction & Pattern';
    case 2: return 'Hint 2: Data Structure & Technique';
    case 3: return 'Hint 3: Key Insight & Observation';
    case 4: return 'Hint 4: Implementation Guidance';
    case 'approach': return 'Full Optimal Approach & Code';
  }
}

function generateSimulatedResponse(req: HintRequest, reason?: string): HintApiResponse {
  const { problemTitle, targetLevel } = req;
  
  // Look for matching sample problem
  const sample = SAMPLE_PROBLEMS.find(
    s => s.title.toLowerCase() === problemTitle.toLowerCase() ||
         s.id.toLowerCase() === problemTitle.toLowerCase().replace(/\s+/g, '-')
  );

  if (sample && sample.simulatedHints) {
    const hintData = targetLevel === 'approach' ? sample.simulatedHints.approach : sample.simulatedHints[targetLevel];
    return {
      success: true,
      level: targetLevel,
      title: hintData.title,
      content: hintData.content,
      modelUsed: `${MODEL_NAME} (Simulated)`,
      isSimulated: true,
    };
  }

  // Generic fallback if user typed a custom problem in offline mode
  const title = getDefaultTitle(targetLevel);
  let genericContent = '';

  if (targetLevel === 1) {
    genericContent = `**Direction & Pattern Hint:**\n\nAnalyze the constraints of your input. You mentioned trying an approach that takes $\\mathcal{O}(N^2)$ or higher. Consider whether you can pre-process the data (e.g., sorting, frequency count) or eliminate redundant checks.`;
  } else if (targetLevel === 2) {
    genericContent = `**Data Structure Hint:**\n\nTo optimize lookups or range tracking, consider using an auxiliary **Hash Table** or **Two-Pointer technique**. Think about what state you need to retain at each index.`;
  } else if (targetLevel === 3) {
    genericContent = `**Key Observation:**\n\nNotice that as your main index moves forward, the search space for valid elements moves monotonically. You don't need to re-scan elements you have already processed!`;
  } else if (targetLevel === 4) {
    genericContent = `**Implementation Guidance:**\n\n1. Maintain a pointer or set for active elements.\n2. Iterate through the array once.\n3. Update your tracking state dynamically in $\\mathcal{O}(1)$ time per element.`;
  } else {
    genericContent = `### Optimal Approach & Solution\n\nUse a single-pass hash map algorithm to achieve $\\mathcal{O}(N)$ time complexity and $\\mathcal{O}(N)$ space.\n\n\`\`\`go\n// Go solution outline\npackage main\n\nfunc solve(nums []int) int {\n    // Implementation\n    return 0\n}\n\`\`\``;
  }

  return {
    success: true,
    level: targetLevel,
    title: title,
    content: genericContent,
    modelUsed: `${MODEL_NAME} (Simulated)`,
    isSimulated: true,
  };
}
