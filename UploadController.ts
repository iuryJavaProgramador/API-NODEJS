
/*
import express, { Request, Response } from 'express';
import * as yup from 'yup';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Function to validate if a string is a valid Base64
function isValidBase64(str: string): boolean {
    try {
        return Buffer.from(str, 'base64').toString('base64') === str;
    } catch (err) {
        return false;
    }
}

// Schema for validating the request body
const uploadSchema = yup.object().shape({
    image: yup.string()
        .required('Image is required')
        .test('is-base64', 'Invalid Base64 string', value => isValidBase64(value || '')),
    type: yup.string()
        .required('Type is required')
        .oneOf(['WATER', 'GAS'], 'Type must be either "WATER" or "GAS"')
});

// Method to check if a reading already exists
async function checkIfReadingExists(type: string): Promise<boolean> {
    // Placeholder logic, replace with actual check
    return false;
}

// Start of the endpoint
const router = express.Router();

router.post('/upload', async (req: Request, res: Response) => {
    try {
        // Validate the request body
        await uploadSchema.validate(req.body);
        const { image, type } = req.body;

        // Check if a reading already exists for the month and type
        const readingExists = await checkIfReadingExists(type);
        if (readingExists) {
            return res.status(409).json({
                error_code: "DOUBLE_REPORT",
                error_description: "Leitura do mês já realizada",
            });
        }

        const geminiApiUrl = 'https://api.gemini.example.com/analyze';
        const geminiResponse = await axios.post(geminiApiUrl, { image });
        const measureValue = geminiResponse.data.value; 
        const imageUrl = `https://your-storage-service.com/temp/${uuidv4()}`;
        const measureUuid = uuidv4();

        // Return the response with image_url, measure_value, and measure_uuid
        return res.status(200).json({
            image_url: imageUrl,
            measure_value: measureValue,
            measure_uuid: measureUuid,
        });
    } catch (error) {
        console.error('Error processing upload:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;   */