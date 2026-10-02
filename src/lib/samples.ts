import { SampleProblem } from './types';

export const SAMPLE_PROBLEMS: SampleProblem[] = [
  {
    id: 'container-with-most-water',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    tags: ['Two Pointers', 'Arrays', 'Greedy'],
    description: `Given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

Example 1:
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.`,
    userAttempt: `I wrote a nested loop to check every pair of lines (i, j) and calculate area = min(height[i], height[j]) * (j - i).
This gives O(N^2) time complexity and gets Time Limit Exceeded on larger inputs.

I tried to optimize by sorting the array first, but then I lose the original indices which are needed for calculating width (j - i). How can I find the max container in O(N) without losing index order?`,
    simulatedHints: {
      1: {
        title: 'Hint 1: Direction & Pattern',
        content: `**Observe the extreme boundaries.**

Instead of checking every random pair, consider starting with the widest possible container first (using the very first line at index \`0\` and the very last line at index \`n - 1\`). 

Ask yourself: If you want to find a container with a *larger* area than this initial wide container, what MUST change about the height of the lines as the width decreases?`
      },
      2: {
        title: 'Hint 2: Relevant Technique',
        content: `**Use the Two Pointers Technique.**

Maintain a \`left\` pointer at \`0\` and a \`right\` pointer at \`n - 1\`. Calculate the area at each step and track the maximum area seen so far.

In each step, you must shrink the width by moving one of the pointers inward (\`left++\` or \`right--\`). How do you decide *which* pointer to move to have any chance of increasing the area?`
      },
      3: {
        title: 'Hint 3: Key Observation',
        content: `**The Bottleneck Principle (Shorter Line Limits Height).**

The area is bounded by the *shorter* of the two lines: \`Area = min(height[left], height[right]) * (right - left)\`.

If \`height[left] < height[right]\`, moving \`right\` inward can *never* increase the area because:
1. The width decreases by 1.
2. The height will still be at most \`height[left]\` (or even smaller).

Therefore, you should always move the pointer pointing to the **shorter line**!`
      },
      4: {
        title: 'Hint 4: Implementation Guidance',
        content: `**Algorithm Outline:**

1. Initialize \`left = 0\`, \`right = len(height) - 1\`, \`maxArea = 0\`.
2. Loop while \`left < right\`:
   - Calculate \`currentArea = min(height[left], height[right]) * (right - left)\`.
   - Update \`maxArea = max(maxArea, currentArea)\`.
   - If \`height[left] < height[right]\`, do \`left++\`.
   - Else, do \`right--\`.
3. Return \`maxArea\`.`
      },
      approach: {
        title: 'Optimal Approach & Solution',
        content: `### Two Pointers Greedy Approach

#### Logic Explanation
We start with the maximum possible width using pointers at both ends of the array. At each step, the area is limited by the shorter vertical line. Moving the taller line inward cannot increase the area (since width shrinks and height cannot exceed the shorter line). Thus, moving the shorter line's pointer is the only greedy step that offers a chance to find a taller boundary and a larger area.

#### Complexity Analysis
- **Time Complexity:** $\\mathcal{O}(N)$ — single pass using two pointers from opposite ends.
- **Space Complexity:** $\\mathcal{O}(1)$ — auxiliary space for pointers and maximum area variable.

#### Go Implementation
\`\`\`go
package main

import "fmt"

func maxArea(height []int) int {
    left, right := 0, len(height)-1
    maxWater := 0

    for left < right {
        w := right - left
        h := min(height[left], height[right])
        area := w * h
        if area > maxWater {
            maxWater = area
        }

        if height[left] < height[right] {
            left++
        } else {
            right--
        }
    }

    return maxWater
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
\`\`\``
      }
    }
  },
  {
    id: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    tags: ['Sliding Window', 'Hash Table', 'Strings'],
    description: `Given a string s, find the length of the longest substring without repeating characters.

Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.`,
    userAttempt: `I tried iterating through all possible start and end indices with nested loops, generating substrings and checking if all characters in the substring are unique using a Set.

It works for small inputs but fails due to TLE on long inputs. Time complexity is O(N^3) or O(N^2). How can I scan the string once without re-checking characters?`,
    simulatedHints: {
      1: {
        title: 'Hint 1: Direction & Pattern',
        content: `**Avoid re-evaluating overlapping substrings.**

Notice how as you move from index \`i\` to \`i+1\`, much of the unique substring content remains identical.

Instead of restarting substring checks from scratch, can you maintain a active dynamic window \`[left, right]\` of valid unique characters that expands to the right?`
      },
      2: {
        title: 'Hint 2: Relevant Technique',
        content: `**Use the Sliding Window technique with a Hash Map / Set.**

Maintain two pointers: \`right\` expands the window by adding character \`s[right]\`.
A Hash Set or Map keeps track of character counts or their most recent indices inside the current window.

When \`s[right]\` is already inside your set, what action should your \`left\` pointer take?`
      },
      3: {
        title: 'Hint 3: Key Observation',
        content: `**Instant Pointer Jump with Last-Seen Map.**

When a duplicate character \`c = s[right]\` is encountered, you don't need to increment \`left\` step by step!

If you store the **last seen index** of each character in a map (\`lastSeen[c]\`), you can immediately jump \`left\` to \`max(left, lastSeen[c] + 1)\`. This guarantees all characters in \`[left, right]\` remain strictly unique.`
      },
      4: {
        title: 'Hint 4: Implementation Guidance',
        content: `**Algorithm Steps:**

1. Create a map \`lastSeen = map[char]int{}\` to store the last index of each character.
2. Maintain \`left = 0\` and \`maxLength = 0\`.
3. Iterate \`right\` from \`0\` to \`len(s) - 1\`:
   - If \`s[right]\` exists in \`lastSeen\` and its recorded index $\\ge$ \`left\`, set \`left = lastSeen[s[right]] + 1\`.
   - Update \`lastSeen[s[right]] = right\`.
   - Update \`maxLength = max(maxLength, right - left + 1)\`.
4. Return \`maxLength\`.`
      },
      approach: {
        title: 'Optimal Approach & Solution',
        content: `### Sliding Window with Hash Map

#### Logic Explanation
We maintain a sliding window \`[left, right]\`. The \`right\` pointer expands the window by scanning the string character by character. We track each character's last seen index in a hash table. If the current character has been seen within the current window boundary (\`\\ge left\`), we shrink the window by moving \`left\` to one index past its previous occurrence.

#### Complexity Analysis
- **Time Complexity:** $\\mathcal{O}(N)$ — single pass over the string with $N$ characters.
- **Space Complexity:** $\\mathcal{O}(\\min(N, M))$ where $M$ is the size of the character set (e.g. 128 for ASCII).

#### Go Implementation
\`\`\`go
package main

func lengthOfLongestSubstring(s string) int {
    lastSeen := make(map[byte]int)
    left, maxLen := 0, 0

    for right := 0; right < len(s); right++ {
        char := s[right]
        if idx, exists := lastSeen[char]; exists && idx >= left {
            left = idx + 1
        }
        lastSeen[char] = right

        windowLen := right - left + 1
        if windowLen > maxLen {
            maxLen = windowLen
        }
    }

    return maxLen
}
\`\`\``
      }
    }
  },
  {
    id: 'course-schedule',
    title: 'Course Schedule',
    difficulty: 'Medium',
    tags: ['Graph', 'Topological Sort', 'DFS/BFS'],
    description: `There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [a, b] indicates that you must take course b first if you want to take course a.

Return true if you can finish all courses. Otherwise, return false.

Example:
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true (To take course 1 you should have finished course 0. So it is possible.)`,
    userAttempt: `I built an adjacency list graph and used simple DFS to visit connected nodes.
However, I get stuck in infinite loops when there's a cycle like 0 -> 1 -> 0, or I mark nodes as visited permanently so valid paths get blocked.

How do I distinguish between a node visited in the current DFS path (cycle detection) versus a node fully processed earlier?`,
    simulatedHints: {
      1: {
        title: 'Hint 1: Direction & Pattern',
        content: `**Reframe as Directed Graph Cycle Detection.**

Think of course prerequisites as directed edges: \`b -> a\` (you must complete course \`b\` before taking course \`a\`).

Can you take all courses if and only if the directed graph contains **no directed cycles**?`
      },
      2: {
        title: 'Hint 2: Relevant Technique',
        content: `**Use 3-State DFS or Kahn's Algorithm (BFS In-Degrees).**

If using DFS, a simple boolean \`visited\` array is insufficient because it cannot differentiate between:
1. Nodes currently on the active recursion stack.
2. Nodes completely processed in previous DFS traversals.

Consider tracking 3 distinct states for each node: \`0 = Unvisited\`, \`1 = Visiting (Active Stack)\`, \`2 = Visited (Done)\`.`
      },
      3: {
        title: 'Hint 3: Key Observation',
        content: `**Detecting Back-Edges in Graph Traversal.**

During DFS:
- If you encounter a neighbor with state \`1 (Visiting)\`, you have discovered a **back-edge**, which means a cycle exists!
- If a neighbor has state \`2 (Visited)\`, it is safe and safe to skip.
- Once all neighbors of a node are finished without cycles, mark the current node state as \`2 (Visited)\`.`
      },
      4: {
        title: 'Hint 4: Implementation Guidance',
        content: `**Algorithm Overview:**

1. Build adjacency list: \`graph[u] = [v1, v2...]\`.
2. Array \`state = [0] * numCourses\`.
3. Define helper \`hasCycle(course)\`:
   - If \`state[course] == 1\`, return \`true\` (cycle detected!).
   - If \`state[course] == 2\`, return \`false\` (already checked).
   - Set \`state[course] = 1\`.
   - For each neighbor in \`graph[course]\`:
     - If \`hasCycle(neighbor)\`, return \`true\`.
   - Set \`state[course] = 2\` and return \`false\`.
4. Loop through courses \`0\` to \`numCourses - 1\`: if unvisited, run \`hasCycle\`. If any cycle found, return \`false\`. Else return \`true\`.`
      },
      approach: {
        title: 'Optimal Approach & Solution',
        content: `### Topological Sort via DFS 3-State Cycle Detection

#### Logic Explanation
Course dependencies form a directed graph. The problem is equivalent to determining if the graph is a Directed Acyclic Graph (DAG). We perform Depth First Search using 3 states per node:
- **State 0 (Unvisited):** Node has not been inspected yet.
- **State 1 (Visiting):** Node is currently on the active DFS stack. Hitting a node in this state indicates a cycle.
- **State 2 (Visited):** Node and all its descendants are confirmed cycle-free.

#### Complexity Analysis
- **Time Complexity:** $\\mathcal{O}(V + E)$ where $V$ is \`numCourses\` and $E$ is \`len(prerequisites)\`.
- **Space Complexity:** $\\mathcal{O}(V + E)$ for adjacency graph representation and recursion stack.

#### Go Implementation
\`\`\`go
package main

func canFinish(numCourses int, prerequisites [][]int) bool {
    adj := make([][]int, numCourses)
    for _, req := range prerequisites {
        course, pre := req[0], req[1]
        adj[pre] = append(adj[pre], course)
    }

    // 0: Unvisited, 1: Visiting, 2: Visited
    state := make([]int, numCourses)

    var hasCycle func(c int) bool
    hasCycle = func(c int) bool {
        if state[c] == 1 {
            return true
        }
        if state[c] == 2 {
            return false
        }

        state[c] = 1
        for _, neighbor := range adj[c] {
            if hasCycle(neighbor) {
                return true
            }
        }
        state[c] = 2
        return false
    }

    for i := 0; i < numCourses; i++ {
        if state[i] == 0 {
            if hasCycle(i) {
                return false
            }
        }
    }

    return true
}
\`\`\``
      }
    }
  }
];
