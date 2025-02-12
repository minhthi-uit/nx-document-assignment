import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import routes from './app/routes';

const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
