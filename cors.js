import cors from 'cors';

const ACCEPTED_ORIGINS = [
    'http://localhost:8000',
    'http://localhost:8080'
];

export function corsMiddleware({acceptedOrigins = ACCEPTED_ORIGINS} = {}) {
    return cors({
        origin(orig, callback) {
            if (acceptedOrigins.includes(orig) || !orig) {
                return callback(null, true);
            }
            return callback(new Error('Not allowed by CORS'));
        }
    });
}
