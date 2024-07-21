import type { NextApiRequest, NextApiResponse } from 'next';

type UpdateProfileRequest = {
    name: string;
};

type ResponseData = {
    user?: {
        email: string;
        name: string;
    };
    message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method === 'PUT') {
        const { name } = req.body as UpdateProfileRequest;

        const response = await fetch('http://localhost:5000/api/auth/profile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${req.headers.authorization}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
