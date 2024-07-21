import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    message: string;
    token?: string; // Include token if needed
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method === 'POST') {
        try {
            const response = await fetch('http://localhost:5000/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body),
                credentials: 'include', // Ensure cookies are included
            });

            const data = await response.json();
            res.status(response.status).json(data);
        } catch (err) {
            console.error('Error during sign-in proxy:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
