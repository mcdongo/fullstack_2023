import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import { getAllEntries, createEntry } from "./diaryService";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    getAllEntries().then(data => {
      setDiaries(data)
    })
  }, [])

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createEntry({
      date,
      weather,
      visibility,
      comment
    }).then(data => {
      setDiaries(diaries.concat(data));
    }).catch(e => {
      if (axios.isAxiosError(e)) {
        setErrorMessage(e.response?.data || 'unknown error occured')
      }
      setTimeout(() => {
        setErrorMessage('');
      }, 5000)
    }) 
    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  }


  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={entryCreation}>
        date
        <input
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br />
        visibility
        <input
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)}
        />
        <br />
        weather
        <input
          value={weather}
          onChange={(event) => setWeather(event.target.value)}
          />
        <br />
        comment
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          />
        <br />
        <button type='submit'>add</button>
      </form>
      <div style={{ color: 'red' }}>
        {errorMessage}
      </div>
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