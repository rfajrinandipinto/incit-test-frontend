import type { NextApiRequest, NextApiResponse } from 'next';

type User = {
    id: number;
    email: string;
    name: string | null;
    createdAt: string;
    updatedAt: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<User[]>) {
    if (req.method === 'GET') {
        const response = await fetch('http://localhost:5000/api/dashboard/users');
        const data = await response.json();
        res.status(response.status).json(data);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
