import { Router, Request, Response } from 'express';
import * as yup from 'yup';

interface UploadBody {
  image: string; 
  customer_code: string;
  measure_datetime: string; // Mudado para string para validação de data ISO
  measure_type: "WATER" | "GAS";
}

const uploadSchema = yup.object().shape({
  image: yup.string().required("Image is required"),
  customer_code: yup.string().required("Customer code is required"),
  measure_datetime: yup.string()
    .matches(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/, "Measure datetime must be a valid ISO8601 date string")
    .required("Measure datetime is required"),
  measure_type: yup.mixed<"WATER" | "GAS">()
    .oneOf(["WATER", "GAS"], "Invalid measure type")
    .required("Measure type is required"),
});

const router = Router();

router.post('/upload', async (req: Request, res: Response) => {
  try {
    await uploadSchema.validate(req.body, { abortEarly: false });

    const body: UploadBody = req.body;
    // Process the data here
    const imageUrl = 'https://miro.medium.com/v2/resize:fit:750/format:webp/1*moJeTvW97yShLB7URRj5Kg.png';  
    const measureValue = 123;  
    const measureUuid = 'uuid-typescript';  

    return res.status(200).json({
      image_url: imageUrl,
      measure_value: measureValue,
      measure_uuid: measureUuid
    });

  } catch (error) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: error instanceof yup.ValidationError ? error.errors : "Error"
    });
  }
});
export default router;