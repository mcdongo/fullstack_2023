import Part from "./Part";
import { CoursePart } from "../types";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    (courseParts.map((part => (
      <div key={part.name}>
          <b>{part.name} {part.exerciseCount}</b>
          <Part part={part} />
      </div>
    ))))
  );
};

export default Content;