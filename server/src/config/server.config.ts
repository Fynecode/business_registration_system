import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { environment } from './environment.config';

export const corsConfig = cors({
    origin: environment.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
});

export const jsonConfig = {
    limit: '1mb',
};

export const apiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        error: 'Too many requests. Please try again later.',
    },
});

export const helmetConfig = helmet();