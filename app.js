import express from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { userRouter } from './routes/user.js';

const app = express();
app.disable('x-powered-by'); // Chau marca de agua.

app.use(corsMiddleware());
app.use('/user', userRouter);

// Query para probar el funcionamiento del backend.
app.get('/pagani', (req, res) => {
    res.send('Pagani gil');
});

const PORT = process.argv[2] ?? 8000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
