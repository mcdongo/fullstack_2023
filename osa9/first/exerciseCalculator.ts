export interface trainingArguments {
  dailyData: number[];
  targetHours: number;
}

export const parseDailyArguments = (args: string[]): trainingArguments => {
  if (args.length < 4) throw new Error('Not enough arguments!');
  
  let targetHours: number;

  if (!isNaN(Number(args[2]))) {
    targetHours = Number(args[2]);
  } else {
    throw new Error('Provided values were not numbers!');
  }

  const dailyData: number[] = [];
  args.slice(3).forEach((arg) => {
    if (!isNaN(Number(arg))) {
      dailyData.push(Number(arg));
    } else {
      throw new Error('Provided values were not numbers!');
    }

  });

  return {
    dailyData,
    targetHours
  };
};

export interface trainingData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (exercises: number[], targetHours: number): trainingData => {
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
    default:
      rating = 3;
      ratingDescription = 'good';
  }


  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

/*try {
  const { dailyData, targetHours } = parseDailyArguments(process.argv);
  console.log(calculateExercises(dailyData, targetHours));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
    console.log(errorMessage);
  }
}*/

//console.log(calculateExercises([3,0,2,4.5,0,3,1], 2))