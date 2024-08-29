import express, { Request, Response } from 'express';

const router = express.Router();

// Simulated database for demonstration purposes
const database = new Map<string, Array<{ 
    measure_uuid: string, 
    measure_datetime: string, 
    measure_type: string, 
    has_confirmed: boolean, 
    image_url: string 
}>>();

// Example data entry
database.set('customer123', [
    {
        measure_uuid: 'uuid1',
        measure_datetime: '2024-08-28T12:34:56Z',
        measure_type: 'WATER',
        has_confirmed: true,
        image_url: 'https://example.com/image1.png',
    },
    {
        measure_uuid: 'uuid2',
        measure_datetime: '2024-08-28T13:34:56Z',
        measure_type: 'GAS',
        has_confirmed: false,
        image_url: 'https://example.com/image2.png',
    }
]);

router.get('/:customerCode/list', async (req: Request, res: Response) => {
    try {
        const { customerCode } = req.params;
        let { measure_type } = req.query;

        // Retrieve customer measures from the database
        let customerMeasures = database.get(customerCode);

        if (!customerMeasures) {
            return res.status(404).json({
                error_code: "MEASURES_NOT_FOUND",
                error_description: "No readings found"
            });
        }

        // If measure_type is provided, filter the measures by type
        if (measure_type) {
            measure_type = (measure_type as string).toUpperCase();
            if (measure_type !== 'WATER' && measure_type !== 'GAS') {
                return res.status(400).json({
                    error_code: "INVALID_TYPE",
                    error_description: "Measurement type not allowed"
                });
            }
            customerMeasures = customerMeasures.filter(measure => measure.measure_type === measure_type);
        }

        // If no measures remain after filtering, return 404
        if (customerMeasures.length === 0) {
            return res.status(404).json({
                error_code: "MEASURES_NOT_FOUND",
                error_description: "No readings found"
            });
        }

        // Return the list of filtered measures
        return res.status(200).json({
            customer_code: customerCode,
            measures: customerMeasures
        });

    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
