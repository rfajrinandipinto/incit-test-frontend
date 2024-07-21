import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
    message?: string;
    error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method === 'POST') {
        try {
            const response = await fetch('http://localhost:5000/api/auth/logout', { // Ensure this matches your backend route
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include credentials in the request
            });

            const data = await response.json();
            res.status(response.status).json(data);
        } catch (error) {
            console.error('Error logging out:', error);
            res.status(500).json({ error: 'Logout failed' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
