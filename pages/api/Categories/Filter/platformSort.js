import { PrismaClient } from '@prisma/client';
import Cors from 'cors';

const prisma = new PrismaClient();

// Initialize the cors middleware
const cors = Cors({
 methods: ['GET', 'OPTIONS'], // Specify the methods you want to allow
});

// Helper method to run cors middleware
const runMiddleware = (req, res, fn) => {
 return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
 });
};

export default async function handler(req, res) {
 // Run the middleware
 await runMiddleware(req, res, cors);

 if (req.method === 'GET') {
    try {
      const { platform } = req.query;
      
      let categories;
      
      if (platform) {
        categories = await prisma.category.findMany({
          where: {
            platform: platform, 
          },
        });
      } else {
        categories = await prisma.category.findMany();
      }

      return res.status(200).json({ message: 'Categories fetched successfully', categories });
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
 } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
 }
}
