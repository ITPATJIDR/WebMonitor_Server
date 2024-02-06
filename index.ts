import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import auth_Router from './routers/auth_Router';

const app = express();
const PORT = 5000;

app.use(express.json())
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Im alive!!!');
});

app.use("/auth", auth_Router)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
