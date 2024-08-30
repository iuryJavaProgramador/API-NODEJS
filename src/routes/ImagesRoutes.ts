import { Router } from 'express';
import { listImages } from '../controllers/ImagesListController';
import { confirmImages } from '../controllers/ImagesConfirmController';
import { uploadImages } from '../controllers/ImagesUploadController';

const router = Router();

router.get('/images', listImages);
router.post('/images/confirm', confirmImages);
router.post('/images/upload', uploadImages);

export default router;