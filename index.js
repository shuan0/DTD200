import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Román pajero</h1>');
});

const PORT = process.argv[2] ?? 8000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} (http://localhost:${PORT})`);
});
