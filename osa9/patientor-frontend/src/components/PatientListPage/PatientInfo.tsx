import patientService from '../../services/patients';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Patient } from "../../types";


const PatientInfo = () => {
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
          <div>
            <p>{entry.date}: {entry.description}</p>
            <ul>
              {entry.diagnosisCodes?.map((entry) => (
                <li>{entry}</li>
              ))}

            </ul>
          </div>
        ))}
      </div>

    </div>
  );
};

export default PatientInfo;