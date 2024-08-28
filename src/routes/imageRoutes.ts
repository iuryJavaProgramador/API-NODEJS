import { Router, Request, Response } from 'express';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

interface UploadBody {
  image: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: "WATER" | "GAS";
}

const uploadSchema = yup.object().shape({
  image: yup.string().required("Image is required"),
  customer_code: yup.string().required("Customer code is required"),
  measure_datetime: yup.date().required("Measure datetime is required")
    .typeError("Measure datetime must be a valid date"),
  measure_type: yup.mixed<"WATER" | "GAS">()
    .oneOf(["WATER", "GAS"], "Invalid measure type")
    .required("Measure type is required"),
});

const router = Router();

const previousReadings: { customer_code: string; measure_type: "WATER" | "GAS"; measure_datetime: Date }[] = [];

router.post('/upload', async (req: Request, res: Response) => {
  try {
    await uploadSchema.validate(req.body, { abortEarly: false });

    const body: UploadBody = req.body;
    const alreadyReported = previousReadings.find(reading => 
      reading.customer_code === body.customer_code &&
      reading.measure_type === body.measure_type &&
      new Date(reading.measure_datetime).getMonth() === new Date(body.measure_datetime).getMonth() &&
      new Date(reading.measure_datetime).getFullYear() === new Date(body.measure_datetime).getFullYear()
    );

    if (alreadyReported) {
      return res.status(409).json({
        error_code: "DOUBLE_REPORT",
        error_description: "Leitura do mês já realizada"
      });
    }
    previousReadings.push({ customer_code: body.customer_code, measure_type: body.measure_type, measure_datetime: body.measure_datetime });

    const imageUrl = 'https://example.com/image.png';
    const measureValue = 123; 
    const measureUuid = uuidv4(); 

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
