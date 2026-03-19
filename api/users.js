import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    // Read mock users from JSON file
    const filePath = path.join(process.cwd(), 'public', 'mock-users.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(fileContents);
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    res.status(200).json(users);
  } catch (error) {
    console.error('Error reading mock users:', error);
    res.status(500).json({ error: 'Failed to fetch mock users' });
  }
}
