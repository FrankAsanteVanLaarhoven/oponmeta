import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const COURSES_PATH = path.resolve(process.cwd(), 'courses-data.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const course = req.body;
      let courses = [];
      if (fs.existsSync(COURSES_PATH)) {
        courses = JSON.parse(fs.readFileSync(COURSES_PATH, 'utf-8'));
      }
      courses.push({ ...course, id: Date.now() });
      fs.writeFileSync(COURSES_PATH, JSON.stringify(courses, null, 2));
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to save course.' });
    }
  } else if (req.method === 'GET') {
    try {
      if (fs.existsSync(COURSES_PATH)) {
        const courses = JSON.parse(fs.readFileSync(COURSES_PATH, 'utf-8'));
        if (req.query.id) {
          const course = courses.find((c: any) => String(c.id) === String(req.query.id));
          if (course) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json(course);
          } else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(404).json({ error: 'Course not found.' });
          }
        }
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(courses);
      } else {
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json([]);
      }
    } catch (e) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(500).json({ error: 'Failed to load courses.' });
    }
  } else {
    res.status(405).end();
  }
} 