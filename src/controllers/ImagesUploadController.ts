import { Request, Response } from 'express';
export const uploadImages = (req: Request, res: Response): void => {
    res.send('Upload of images');
};