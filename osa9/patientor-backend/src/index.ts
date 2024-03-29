import express from 'express';
import cors from 'cors';

import diagnosisRouter from './routes/diagnosisRouter';
import patientRouter from './routes/patientRouter';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('ping');
  res.send('pong');
});

app.use('/api/diagnosis', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});