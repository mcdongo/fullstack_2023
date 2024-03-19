import { NewPatient, Gender, EntryWithoutId, Diagnosis, HealthCheckRating, DischargeInfo, SickLeave } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name!');
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth!');
  }

  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing security number!');
  }

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender:' + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation!');
  }
  
  return occupation;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data!');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };

    return newEntry;
  }

  throw new Error('Incorrect data: a field missing!');
};


const parseDescription = (decription: unknown): string => {
  if (!decription || !isString(decription)) {
    throw new Error('Incorrect or missing description!');
  } 

  return decription;
};

const parseSpecialist = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing specialist!');
  }

  return name;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};


const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (param: unknown): HealthCheckRating => {
  if (!param || !isNumber(param) || !isHealthCheckRating(param)) {
    throw new Error('Incorrect HealthCheckRating field!');
  }

  return param;
};

const parseDischarge = (object: unknown): DischargeInfo => {
  if (!object || typeof object !== 'object' ||
      !('date' in object && 'criteria' in object)) {
    throw new Error('Incorrect discharge field!');
  }

  const discharge = object as DischargeInfo;
  if (!discharge.date || !isString(discharge.date) || !discharge.criteria || !isString(discharge.criteria)) {
    throw new Error('Malformatted parameters in discharge information!');
  }
  return discharge;
};

const parseEmployer = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error('Employer name missing!');
  }

  return param;
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== 'object' ||
      !('startDate' in object && 'endDate' in object)) {
        throw new Error('Incorrect sickleave field!');
  }

  const sickLeave = object as SickLeave;
  if (!sickLeave.startDate || !isString(sickLeave.startDate) || !sickLeave.endDate || !isString(sickLeave.endDate)) {
    throw new Error('Malformatted parameters in sickleave information');
  }

  return sickLeave;
};


export const toNewEntry = (object: unknown): EntryWithoutId => {
  console.log(object);

  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (!('type' in object && 'description' in object
        && 'date' in object && 'specialist' in object)) {
    throw new Error('Incorrect data: a field missing!');
  }

  const newEntry = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object)
  };


  switch (object.type) {
    case 'HealthCheck':
      if (!('healthCheckRating' in object)) {
        throw new Error('healthCheckRating missing');
      }

      return {
        ...newEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
    
    case 'Hospital':
      if (!('discharge' in object)) {
        throw new Error('discharge missing');
      }

      return {
        ...newEntry,
        type: 'Hospital',
        discharge: parseDischarge(object.discharge)
      };
    
    default:
      if (!('employerName' in object)) {
        throw new Error('Employer missing');
      }

      if ('sickLeave' in object) {
        return {
          ...newEntry,
          type: 'OccupationalHealthcare',
          employerName: parseEmployer(object.employerName),
          sickLeave: parseSickLeave(object.sickLeave)
        };
      }

      return {
        ...newEntry,
        type: 'OccupationalHealthcare',
        employerName: parseEmployer(object.employerName)
      };
  }
};