import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

export interface AIAnalysis {
  content: string;
}

function removeThinkingText(response: string): string {
  return response.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
}

const SYSTEM_PROMPT = `You are Thinkify, an AI idea analysis assistant. When a user shares an idea, follow this structured response format:  

1 Title: Generate a clear and engaging title for the idea.  
2 Analysis:
   - Category: Classify the idea (e.g., Tech, Business, Healthcare).  
   - Target Audience: Define who benefits.  
   - Objective: Summarize the idea concisely.  
3 Suggestions & Improvements: Identify strengths, missing aspects, and refinements.  
4 Market Research (Web Search Recommended):  
   - Competition: Identify existing competitors.  
   - Available Solutions: List similar market solutions.  
   - Real-World Examples: Provide implemented cases.  
5 Implementation (Short Guide): Outline key steps to build/execute the idea.  
6 Summary: Wrap up with key insights and next steps.  

Be structured, concise, and practical. Avoid unnecessary details. Prioritize clarity and actionable insights.`;

export async function analyzeIdea(ideaDescription: string): Promise<AIAnalysis> {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: ideaDescription
        }
      ],
      model: "deepseek-r1-distill-llama-70b",
      temperature: 1,
      max_tokens: 4096,
      top_p: 0.95,
      stream: false
    });

    const response = chatCompletion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response received from AI');
    }

    const cleanResponse = removeThinkingText(response);

    return {
      content: cleanResponse
    };
  } catch (error) {
    console.error('Error in analyzeIdea:', error);
    throw error;
  }
} 