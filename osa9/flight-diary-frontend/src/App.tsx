import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import { getAllEntries } from "./diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then(data => {
      setDiaries(data)
    })
  }, [])
  return (
    <div>
      <h1>Diary entries</h1>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h2>{diary.date}</h2>
          <p>
            visibility: {diary.visibility} <br />
            weather: {diary.weather}
          </p>
        </div>
      ))}
    </div>
  )
};

export default App;