export interface diagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other' 
}

export interface patientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}


export type nonSensitivePatientEntry = Omit<patientEntry, 'ssn'>;
export type newPatientEntry = Omit<patientEntry, 'id'>;