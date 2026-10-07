import { z } from 'zod';

const environmentSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),

    PORT: z.coerce
        .number()
        .int()
        .positive()
        .default(3000),

    FRONTEND_URL: z
        .string()
        .url()
        .default('http://localhost:5173'),

    SUPABASE_URL: z
        .string()
        .url(),

    SUPABASE_SERVICE_ROLE_KEY: z
        .string()
        .min(1),

    CLOUDINARY_CLOUD_NAME: z
        .string()
        .min(1),

    CLOUDINARY_API_KEY: z
        .string()
        .min(1),

    CLOUDINARY_API_SECRET: z
        .string()
        .min(1),
});

const parsedEnvironment = environmentSchema.safeParse(process.env);

if (!parsedEnvironment.success) {
    console.error(
        'Invalid environment variables:',
        parsedEnvironment.error.flatten().fieldErrors
    );

    process.exit(1);
}

export const environment = parsedEnvironment.data;