import express from 'express';

const app = express();
const PORT = 8001;

app.use((req: any, res: any) => {
    res.send('welcome to backend')
})

app.listen(PORT, () => {
    console.log(`server is listening at http://localhost:${PORT}`);
})