import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const mockCourse = (prompt: string, lang: string, opts: any) => ({
  title: `AI Course: ${prompt}`,
  description: `This course was generated for: ${prompt}`,
  modules: [
    { title: 'Module 1', lessons: [{ title: 'Lesson 1', content: 'Intro' }] },
  ],
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { prompt, provider, options, language } = req.body;

  if (provider === 'ollama') {
    try {
      const ollamaRes = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama3', // or another model you have installed
          prompt: `Generate a detailed course with the following structure:\nTitle: ${prompt}\nLanguage: ${language}\nObjectives: List 3-5 objectives.\nContent: List main topics and subpoints.\nAssessment: Suggest quiz and practical assessment.\nRemarks: Add a summary.\nFormat as JSON with keys: title, objectives, content, assessment, remarks.`,
          stream: false
        })
      });
      const data = await ollamaRes.json();
      // Try to parse JSON from Ollama's response
      let course;
      try {
        course = JSON.parse(data.response);
      } catch {
        course = { title: prompt, description: data.response };
      }
      return res.status(200).json(course);
    } catch (err) {
      return res.status(500).json({ error: 'Ollama request failed', details: err });
    }
  }

  if (provider === 'openrouter') {
    try {
      const apiKey = process.env.OPENROUTER_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'OpenRouter API key not set in environment.' });
      }
      const openrouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'mistralai/mixtral-8x7b', // or another available model
          messages: [
            {
              role: 'system',
              content: 'You are a world-class course generator. Always respond in JSON with keys: title, objectives, content, assessment, remarks.'
            },
            {
              role: 'user',
              content: `Generate a detailed course with the following structure:\nTitle: ${prompt}\nLanguage: ${language}\nObjectives: List 3-5 objectives.\nContent: List main topics and subpoints.\nAssessment: Suggest quiz and practical assessment.\nRemarks: Add a summary.\nFormat as JSON with keys: title, objectives, content, assessment, remarks.`
            }
          ],
          max_tokens: 1024
        })
      });
      const data = await openrouterRes.json();
      let course;
      try {
        // OpenRouter returns choices[0].message.content
        course = JSON.parse(data.choices[0].message.content);
      } catch {
        course = { title: prompt, description: data.choices?.[0]?.message?.content || 'No response' };
      }
      return res.status(200).json(course);
    } catch (err) {
      return res.status(500).json({ error: 'OpenRouter request failed', details: err });
    }
  }

  // Fallback: mock
  await new Promise(r => setTimeout(r, 1200));
  res.status(200).json(mockCourse(prompt, language, options));
} 