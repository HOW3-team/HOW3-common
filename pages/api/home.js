export default async function handler(req, res) {
   if (req.method === 'GET') {
       // Example of an asynchronous operation
       // For demonstration, we'll simulate a delay using setTimeout
       await new Promise(resolve => setTimeout(resolve, 1000));

       res.status(200).json({ message: 'House of Web3 is a Perfect Palce to Work' });
   } else {
       res.setHeader('Allow', ['GET']);
       res.status(405).end(`Method ${req.method} Not Allowed`);
   }
}
