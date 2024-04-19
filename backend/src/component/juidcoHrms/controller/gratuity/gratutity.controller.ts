// // src/controllers/GratuityController.ts

// import { Request, Response } from 'express';
// import GratuityDao from '../gratuity/gratuity.dao.ts';

// const gratuityDao = new GratuityDao();

// export default class GratuityController {
//   async getGratuityRecords(req: Request, res: Response): Promise<void> {
//     try {
//       const records = await gratuityDao.getGratuityRecords();
//       res.status(200).json(records);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }
// }
