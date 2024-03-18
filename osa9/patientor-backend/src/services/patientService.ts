import patientData from '../data/patients';

import { patientEntry, nonSensitivePatientEntry } from '../types';

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

const addPatient = () => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};