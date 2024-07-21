// fullstack-app/frontend/src/pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type User = {
    id: number;
    email: string;
    name: string | null;
    createdAt: string;
    updatedAt: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<User[] | { message: string }>) {
    if (req.method === 'GET') {
        try {
            const response = await fetch('http://localhost:5000/api/users');
            const data = await response.json();
            res.status(response.status).json(data);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch users' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}