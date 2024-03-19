import { v1 as uuid } from 'uuid';
import patientData from '../data/patients';

import { Patient, NonSensitivePatient, NewPatient, Entry, EntryWithoutId } from '../types';

const getPatients = (): Patient[] => {
  const updatedPatients = patientData;
  return updatedPatients;
};

const patients = getPatients();

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( entry: NewPatient ): Patient => {

    const id: string = uuid();

    const newPatient = {
      id,
      ...entry
    };

    patients.push(newPatient);

    return newPatient;
};

const findById = ( id: string ): Patient => {
  const foundPatient = patients.find((patient => patient.id === id));
  if (!foundPatient) {
    throw new Error('Patient not found');
  }
  return foundPatient;
};

const addEntry = ( id: string, entry: EntryWithoutId): Entry => {
  const newId: string = uuid();

  
  const newEntry = {
    id: newId,
    ...entry
  };
  patients.find((patient) => patient.id === id)?.entries.push(newEntry);
  return newEntry;
};

export default {
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry
};