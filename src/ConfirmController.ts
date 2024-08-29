import express, { Request, Response } from 'express';
import * as yup from 'yup';

const router = express.Router();

const confirmSchema = yup.object().shape({
    measure_uuid: yup.string().required('Measure UUID is required'),
    confirmed_value: yup.number().required('Confirmed value is required').positive('Confirmed value must be a positive number'),
});

// Placeholder database logic
const database = new Map<string, { value: number, confirmed: boolean }>();

router.patch('/confirm', async (req: Request, res: Response) => {
    try {
        await confirmSchema.validate(req.body);
        const { measure_uuid, confirmed_value } = req.body;

        // Check if the reading exists in the database
        const existingReading = database.get(measure_uuid);
        if (!existingReading) {
            return res.status(404).json({ error: 'Reading not found' });
        }

        // Check if the reading has already been confirmed
        if (existingReading.confirmed) {
            return res.status(409).json({ error: 'Reading has already been confirmed' });
        }

        // Save the new value in the database
        existingReading.value = confirmed_value;
        existingReading.confirmed = true;
        database.set(measure_uuid, existingReading);

        // Return an OK response
        return res.status(200).json({ message: 'Value confirmed successfully' });

    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: error.message,
            });
        }
        console.error('Error confirming value:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
