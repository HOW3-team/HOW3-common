// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//  if (req.method === 'POST') {
//     const { name, description, tags } = req.body;

//     // Simple validation
//     if (!name) {
//       return res.status(400).json({ message: 'Name is required' });
//     }

//     try {
//       // Create a new category in the database
//       const newCategory = await prisma.category.create({
//         data: {
//           name,
//           description,
//           tags,
//           // createdDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
//         },
//       });

//       // Return a success response
//       return res.status(200).json({ message: 'Category created successfully', category: newCategory });
//     } catch (error) {
//       // Handle errors
//       return res.status(500).json({ message: 'Error creating category', error: error.message });
//     }
//  } else {
//     // Handle any other HTTP method
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//  }
// }







// import { PrismaClient } from '@prisma/client';
// import Cors from 'cors';

// const prisma = new PrismaClient();

// // Initialize the cors middleware
// const cors = Cors({
//  methods: ['POST', 'OPTIONS'], // Specify the methods you want to allow
// });

// // Helper method to run cors middleware
// const runMiddleware = (req, res, fn) => {
//  return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//  });
// };

// export default async function handler(req, res) {
//  // Run the middleware
//  await runMiddleware(req, res, cors);

//  if (req.method === 'POST') {
//     const { username, name, subscribers, geography, platform, price } = req.body;

//     // Simple validation
//     if (!name) {
//       return res.status(400).json({ message: 'Name is required' });
//     }

//     // Check if the category name already exists
//     const existingCategory = await prisma.category.findUnique({
//       where: {
//         name: name,
//       },
//     });

//     if (existingCategory) {
//       // Category name already exists, return an error
//       return res.status(400).json({ message: 'Category name already exists' });
//     }

//     try {
//       // Create a new category in the database
//       const newCategory = await prisma.category.create({
//         data: {
//           username,
//           name,
//           subscribers,
//           geography,
//           platform,
//           price,
//           // createdDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
//         },
//       });

//       // Return a success response
//       return res.status(200).json({ message: 'Category created successfully', category: newCategory });
//     } catch (error) {
//       // Handle errors
//       return res.status(500).json({ message: 'Error creating category', error: error.message });
//     }
//  } else {
//     // Handle any other HTTP method
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//  }
// }








import { PrismaClient } from '@prisma/client';
import Cors from 'cors';

const prisma = new PrismaClient();

// Initialize the cors middleware
const cors = Cors({
 methods: ['POST', 'OPTIONS'], // Specify the methods you want to allow
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

 if (req.method === 'POST') {
    const { categories } = req.body;

    if (!categories || !Array.isArray(categories)) {
      return res.status(400).json({ message: 'Categories array is required' });
    }

    try {
      const createdCategories = await Promise.all(categories.map(async (categoryData) => {
        const { username, name, subscribers, geography, platform, price } = categoryData;
        
        if (!name) {
          return res.status(400).json({ message: 'Name is required for all categories' });
        }

        const existingCategory = await prisma.category.findUnique({
          where: {
            name: name,
          },
        });

        if (existingCategory) {
          return res.status(400).json({ message: `Category with name ${name} already exists` });
        }

        return prisma.category.create({
          data: {
            username,
            name,
            subscribers,
            geography,
            platform,
            price,
          },
        });
      }));

      return res.status(200).json({ message: 'Categories created successfully', categories: createdCategories });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating categories', error: error.message });
    }
 } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
 }
}
