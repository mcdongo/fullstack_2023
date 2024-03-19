import patientService from '../../services/patients';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";
import BaseEntry from './Entry';

interface Props {
  diagnosis: Diagnosis[];
}

const PatientInfo = ({ diagnosis }: Props) => {
  const [patient, setPatient] = useState<Patient>();
  const id = useParams().id;

  useEffect(() => {
    const getPatientData = async () => {
      if (id) {
        const chosenPatient = await patientService.getOne(id);
        setPatient(chosenPatient);
      }
    };
    void getPatientData();
  }, [id]);

  const findDiagnosisName = (code: string) => {
    const foundDiagnosis = diagnosis.find((d) => d.code === code);
    if (!foundDiagnosis) return 'not found';
    return foundDiagnosis.name;
  };


  if (!id || !patient) {
    return (<div>Patient not found</div>);
  }
  return (
    <div>
      <div>
        <h1>{patient.name}</h1>
        <p>gender: {patient.gender}</p>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>        
      </div>
      <div>
        <h3>entries</h3>
        {patient.entries.map((entry) => (
          <div key={entry.id} style={{border: '2px solid black', padding: '5px', margin: '5px'}}>
            <BaseEntry entry={entry} diagnosisCodes={entry.diagnosisCodes} findDiagnosisName={findDiagnosisName}/>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PatientInfo;