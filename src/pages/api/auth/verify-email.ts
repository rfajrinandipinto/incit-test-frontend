// src/pages/api/auth/verify-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    success: boolean;
    message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method === 'GET') {
        const { token } = req.query;

        if (typeof token !== 'string') {
            return res.status(400).json({ success: false, message: 'Invalid token' });
        }

        const response = await fetch(`http://localhost:5000/api/auth/verify-email?token=${token}`, {
            method: 'GET',
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
