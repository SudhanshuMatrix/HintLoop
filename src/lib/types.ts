export type HintLevel = 1 | 2 | 3 | 4 | 'approach';

export interface HintStep {
  level: HintLevel;
  title: string;
  content: string;
  timestamp: string;
  isSimulated?: boolean;
  modelName?: string;
}

export interface SampleProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  description: string;
  userAttempt: string;
  simulatedHints: {
    1: { title: string; content: string };
    2: { title: string; content: string };
    3: { title: string; content: string };
    4: { title: string; content: string };
    approach: { title: string; content: string };
  };
}

export interface HintRequest {
  problemTitle: string;
  problemDescription: string;
  userAttempt: string;
  targetLevel: HintLevel;
  customQuery?: string;
}

export interface HintApiResponse {
  success: boolean;
  level: HintLevel;
  title: string;
  content: string;
  modelUsed: string;
  isSimulated: boolean;
  error?: string;
}
