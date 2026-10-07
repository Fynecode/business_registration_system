import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import {
    corsConfig,
    jsonConfig,
    helmetConfig,
    apiRateLimiter,
} from './config/server.config';

import clientRoutes from './presentation/routes/client.routes';
import requestRouter from './presentation/routes/request.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(corsConfig);
app.use(helmetConfig);
app.use(express.json(jsonConfig));
app.use(cookieParser());
app.use('/api', apiRateLimiter);

app.use('/api/clients', clientRoutes);
app.use('/api/requests', requestRouter);
app.listen(PORT, () => {
    console.log(`Business Registration API running on http://localhost:${PORT}`);
});