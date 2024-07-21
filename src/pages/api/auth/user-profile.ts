// /Users/rfajrin/project/incit/incit/fullstack-app/frontend/src/pages/api/auth/user-profile.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type UserProfile = {
    email: string;
    name: string | null;
};

type ResponseData = {
    user?: UserProfile;
    message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method === 'GET') {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;

        try {
            const response = await fetch('http://localhost:5000/api/auth/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                res.status(200).json({ user: data.user });
            } else {
                const errorData = await response.json();
                res.status(response.status).json({ message: errorData.message || 'Failed to fetch user profile' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
