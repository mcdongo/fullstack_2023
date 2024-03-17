import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const query = req.query;
  if ((!query.weight || !query.height) || (isNaN(Number(query.weight)) || isNaN(Number(query.height)))) {
    res.status(400).send({error: 'malformatted parameters'});
  }

  const weightClass = calculateBmi(Number(query.height), Number(query.weight));
  
  res.send({
    'weight': query.weight,
    'height': query.height,
    'bmi': weightClass
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});