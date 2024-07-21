import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { token } = req.query;

            const response = await fetch(`http://localhost:5000/api/users/verify-email/${token}`, {
                method: 'GET',
            });

            const data = await response.json();
            res.status(response.status).json(data);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
