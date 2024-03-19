import { Entry } from "../../types";

interface Props {
  entry: Entry;
  findDiagnosisName: (code: string) => string;
}

const BaseEntry = ({ entry, findDiagnosisName }: Props) => {
  switch (entry.type) {
    case 'Hospital':
      return <ShowHospitalEntry entry={entry} findDiagnosisName={findDiagnosisName} />;
    case 'OccupationalHealthcare':
      return <ShowOccupationalHealthcareEntry entry={entry} findDiagnosisName={findDiagnosisName} />;
    case 'HealthCheck':
      return <ShowHealthCheckEntry entry={entry} findDiagnosisName={findDiagnosisName} />;
    default:
      return <></>;
  }
};



const ShowOccupationalHealthcareEntry = ({ entry, findDiagnosisName }: Props) => {
  if (entry.type !== 'OccupationalHealthcare') {
    return null;
  } 
  return (
    <div>
      <p>{entry.date}: Occupational entry | {entry.employerName}</p>
      <p><i>{entry.description}</i></p>
      {entry.sickLeave &&
      <p>Sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>
      }
      <ul>
      {entry.diagnosisCodes &&
      entry.diagnosisCodes.map((code) => (
        <li key={code}>{code}: {findDiagnosisName(code)}</li>
      ))
      }
      </ul>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

const ShowHospitalEntry = ({ entry, findDiagnosisName }: Props) => {
  if (entry.type !== 'Hospital') {
    return null;
  }
  return (
    <div>
      <p>{entry.date}: Hospital entry</p>
      <p><i>{entry.description}</i></p>
      <p>Discharged on {entry.discharge.date}: {entry.discharge.criteria}</p>
      {entry.diagnosisCodes &&
      <ul>
        {entry.diagnosisCodes.map((code) => (
          <li key={code}>{code}: {findDiagnosisName(code)}</li>
        ))}
      </ul>
      }
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

const ShowHealthCheckEntry = ({ entry, findDiagnosisName }: Props) => {
  if (entry.type !== 'HealthCheck') {
    return null;
  }
  return (
    <div>
      <p>{entry.date}: Health check</p>
      <p><i>{entry.description}</i></p>
      <p>Risk rating: {entry.healthCheckRating}</p>
      {entry.diagnosisCodes &&
      <ul>
        {entry.diagnosisCodes.map((code) => (
          <li key={code}>{code}: {findDiagnosisName(code)}</li>
        ))}
      </ul>
      }
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default BaseEntry;