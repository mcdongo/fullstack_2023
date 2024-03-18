import { v1 as uuid } from 'uuid';
import patientData from '../data/patients';

import { patientEntry, nonSensitivePatientEntry, newPatientEntry } from '../types';

const patients: patientEntry[] = patientData;

const getEntries = (): patientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): nonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( entry: newPatientEntry ): patientEntry => {

    const id: string = uuid();

    const newPatientEntry = {
      id,
      ...entry
    };

    patients.push(newPatientEntry);

    return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};