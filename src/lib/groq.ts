import Groq from 'groq-sdk';

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY ?? 'placeholder',
});

export async function generateResumeContent(
  jobTitle: string,
  jobDescription: string,
  currentData: {
    experience?: Array<{ company: string; position: string; description: string }>;
    skills?: Array<{ category: string; skills: string[] }>;
  }
) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not configured');
  }

  const systemPrompt = `You are an expert resume writer and career coach. Generate professional, ATS-optimized resume content based on the job description provided. Return ONLY valid JSON without any markdown or code blocks.`;

  const userPrompt = `Create resume content for this job:

Job Title: ${jobTitle}
Job Description: ${jobDescription}

Current experience: ${JSON.stringify(currentData.experience || [])}
Current skills: ${JSON.stringify(currentData.skills || [])}

Return a JSON object with this exact structure:
{
  "summary": "2-3 sentence professional summary tailored to the job",
  "experience_bullets": {
    "position_index_0": ["bullet 1", "bullet 2", "bullet 3"],
    "position_index_1": ["bullet 1", "bullet 2", "bullet 3"]
  },
  "skills": ["skill1", "skill2", "skill3", "skill4", "skill5", "skill6", "skill7", "skill8"]
}`;

  const completion = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    model: 'llama3-70b-8192',
    temperature: 0.7,
    max_tokens: 2000,
  });

  const content = completion.choices[0]?.message?.content ?? '{}';

  try {
    return JSON.parse(content);
  } catch {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Failed to parse AI response');
  }
}
