import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Román pajero</h1>');
});

app.get('/pagani', (req, res) => {
    res.send('Pagani gil');
});

const PORT = process.argv[2] ?? 8000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} (http://localhost:${PORT})`);
});
