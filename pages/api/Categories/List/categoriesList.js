import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();
const corsMiddleware = cors();

export default async function handler(req, res) {

 // await corsMiddleware(req, res);

 // Preflight request. Reply successfully:
 if (req.method === 'OPTIONS') {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(204).end();
    return;
 }

 // Set CORS headers for the actual request
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Methods', 'GET');
 res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

 if (req.method === 'GET') {
    try {
      // Fetch all unique name values from the categories table
      const categories = await prisma.category.findMany({
        select: {
          name: true,
        },
        distinct: ['name'],
      });

      // Extract the name values from the result
      const uniquecategories = categories.map(category => category.name);

      // Return a success response
      return res.status(200).json({categories: uniquecategories });
    } catch (error) {
      // Handle errors
      return res.status(500).json({ message: 'Error fetching unique categories', error: error.message });
    }
 } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
 }
}
