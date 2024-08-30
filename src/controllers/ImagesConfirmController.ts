import { Request, Response } from 'express';

export const confirmImages = (req: Request, res: Response): void => {
    res.send('Confirm the images');
};