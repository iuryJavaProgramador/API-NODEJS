import { Request, Response } from 'express';

interface Measure {
    measure_uuid: string;
    measure_datetime: string;
    measure_type: string;
    has_confirmed: string;
    image_url: string;
}

interface CustomerMeasures {
    customer_code: string;
    measures: Measure[];
}

export const listImages = (req: Request, res: Response): Response | void => {
    const { scenario } = req.query;

    let data: CustomerMeasures;

    if (scenario === 'not_found') {
        data = {
            customer_code: 'string',
            measures: []
        };

    } else if (scenario === 'invalid_type') {
        data = {
            customer_code: 'string',
            measures: [
                {
                    measure_uuid: 'string',
                    measure_datetime: 'datetime',
                    measure_type: 'INVALID_TYPE',
                    has_confirmed: 'boolean',
                    image_url: 'string'
                },
                {
                    measure_uuid: 'string',
                    measure_datetime: 'datetime',
                    measure_type: 'INVALID_TYPE',
                    has_confirmed: 'boolean',
                    image_url: 'string'
                }
            ]
        };

        // 
    } else {
        data = {
            customer_code: 'string',
            measures: [
                {
                    measure_uuid: 'string',
                    measure_datetime: 'datetime',
                    measure_type: 'string',
                    has_confirmed: 'boolean',
                    image_url: 'string'
                },
                {
                    measure_uuid: 'string',
                    measure_datetime: 'datetime',
                    measure_type: 'string',
                    has_confirmed: 'boolean',
                    image_url: 'string'
                }
            ]
        };
    }

    // http://localhost:3333/api/images?scenario=not_found
    if (data.measures.length === 0) {
        return res.status(404).json({
            error_code: 'MEASURES_NOT_FOUND',
            error_description: 'No readings found'
        });
    }

    // http://localhost:3333/api/images?scenario=invalid_type
    for (const measure of data.measures) {
        if (measure.measure_type === 'INVALID_TYPE') {
            return res.status(400).json({
                error_code: 'INVALID_TYPE',
                error_description: 'Measurement type not allowed'
            });
        }
    }

    return res.status(200).json({
        customer_code: data.customer_code,
        measures: data.measures.map(measure => ({
            measure_uuid: measure.measure_uuid,
            measure_datetime: measure.measure_datetime,
            measure_type: measure.measure_type,
            has_confirmed: measure.has_confirmed,
            image_url: measure.image_url
        }))
    });
};