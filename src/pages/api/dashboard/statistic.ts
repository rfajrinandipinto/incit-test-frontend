import type { NextApiRequest, NextApiResponse } from 'next';

type Statistics = {
    totalUsers: number;
    activeToday: number;
    averageActiveSessions: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Statistics>) {
    if (req.method === 'GET') {
        const response = await fetch('http://localhost:5000/api/dashboard/statistics');
        const data = await response.json();
        res.status(response.status).json(data);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
