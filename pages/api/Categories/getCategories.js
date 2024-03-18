// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//  if (req.method === 'GET') {
//     try {
//       // Fetch all categories from the database
//       const categories = await prisma.category.findMany();

//       // Return a success response
//       return res.status(200).json({ message: 'Categories fetched successfully', categories });
//     } catch (error) {
//       // Handle errors
//       return res.status(500).json({ message: 'Error fetching categories', error: error.message });
//     }
//  } else {
//     // Handle any other HTTP method
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//  }
// }

// Subscribers, Category, Geography, Platform, Place 









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
      // Fetch all categories from the database
      const categories = await prisma.category.findMany();

      // Return a success response
      return res.status(200).json({ message: 'Categories fetched successfully', categories });
    } catch (error) {
      // Handle errors
      return res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
 } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
 }
}











// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   // Manually set CORS headers for any origin (not recommended for production)
//   res.setHeader('Access-Control-Allow-Origin', '*');  // Modification for CORS
//   res.setHeader('Access-Control-Allow-Methods', 'GET');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   if (req.method === 'GET') {
//     try {
//       const categories = await prisma.category.findMany();
//       res.status(200).json({ message: 'Categories fetched successfully', categories });
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching categories', error: error.message });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
