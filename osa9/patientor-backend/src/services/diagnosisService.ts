import diagnosisData from '../data/diagnosis';

import { diagnosisEntry } from '../types';

const diagnosis: diagnosisEntry[] = diagnosisData;

const getEntries = (): diagnosisEntry[] => {
  return diagnosis;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis
};