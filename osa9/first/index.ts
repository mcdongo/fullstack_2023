import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).send({error: 'parameters missing'});
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    res.status(400).send({error: 'malformatted parameters'});
  }

  const result = calculateExercises(daily_exercises as number[], Number(target));
  res.send({ result });

});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});