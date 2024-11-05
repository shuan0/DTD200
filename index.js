import express from 'express';
import { corsMiddleware } from './cors.js';

const app = express();
app.disable('x-powered-by'); // Chau marca de agua.
app.use(corsMiddleware());

app.get('/pagani', (req, res) => {
    res.send('Pagani gil');
});

const PORT = process.argv[2] ?? 8000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
