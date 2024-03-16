interface trainingData {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (exercises: number[], targetHours: number): trainingData => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter(value => value !== 0).length;
  const average = exercises.reduce((total, current) => total + current, 0) / periodLength;
  const success = average >= targetHours ? true : false;
  const target = targetHours;
  let rating, ratingDescription;

  switch (true) {
    case targetHours - average > 2:
      rating = 0;
      ratingDescription = 'bad';
      break;
    case targetHours - average > 1:
      rating = 1;
      ratingDescription = 'ok';
      break;
    case targetHours - average > 0:
      rating = 2;
      ratingDescription = 'not too bad, but could be better';
      break;
    case targetHours - average <= 0:
      rating = 3;
      ratingDescription = 'good';
      break;
  }


  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3,0,2,4.5,0,3,1], 2))