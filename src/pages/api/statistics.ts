// fullstack-app/frontend/src/pages/api/statistics.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Statistics = {
    totalUsers: number;
    activeToday: number;
    averageActiveSessions: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Statistics | { message: string }>) {
    if (req.method === 'GET') {
        try {
            const response = await fetch('http://localhost:5000/api/statistics');
            const data = await response.json();
            res.status(response.status).json(data);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch statistics' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}