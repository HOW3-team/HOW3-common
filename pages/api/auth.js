// pages/api/checkEmail.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
 if (req.method === 'GET') {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    try {
      // Check if the email exists in the database
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (user) {
        // Email exists, grant access
        return res.status(200).json({ message: 'Access granted', user });
      } else {
        // Email does not exist, deny access
        return res.status(404).json({ message: 'Email not found' });
      }
    } catch (error) {
      // Handle errors
      return res.status(500).json({ message: 'Error checking email', error: error.message });
    }
 } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
 }
}
