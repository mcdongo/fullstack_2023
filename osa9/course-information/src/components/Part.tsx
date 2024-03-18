import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return <p>{part.description}</p>
    case "group":
      return <p>Project exercises {part.groupProjectCount}</p>
    case "background":
      return (
        <div>
          <p>{part.description}<br />{part.backgroundMaterial}</p>
        </div>
      )
    case "special":
      return (
        <div>
          {part.description}<br />
          required skills: 
          {part.requirements.map((req, i) => (
            <span key={req}> {req}
            {i !== part.requirements.length - 1 && ','}
            </span>
          ))}
        </div>
      )
  }
};

export default Part;