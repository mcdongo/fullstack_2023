import { useState, useEffect } from "react";
import { DiaryEntry, Visibility, Weather } from "./types";
import { getAllEntries, createEntry } from "./diaryService";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
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
    setVisibility(Visibility.Good);
    setWeather(Weather.Sunny);
    setComment('');
  }


  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={entryCreation}>
        date
        <input 
          type='date'
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br />
        <div>
          visibility 
          great
          <input
            type='radio'
            name='visibility'
            defaultChecked
            onChange={() => setVisibility(Visibility.Great)}
          />
          good
          <input
            type='radio'
            name='visibility'
            onChange={() => setVisibility(Visibility.Good)}
          />
          ok
          <input
            type='radio'
            name='visibility'
            onChange={() => setVisibility(Visibility.Ok)}
          />
          poor
          <input
            type='radio'
            name='visibility'
            onChange={() => setVisibility(Visibility.Poor)}
          />
        </div>
        <div>
          weather 
          sunny
          <input
            value={weather}
            type='radio'
            name='weather'
            defaultChecked
            onChange={() => setWeather(Weather.Sunny)}
          />
          rainy
          <input
            value={weather}
            type='radio'
            name='weather'
            onChange={() => setWeather(Weather.Rainy)}
          />
          cloudy
          <input
            value={weather}
            type='radio'
            name='weather'
            onChange={() => setWeather(Weather.Cloudy)}
          />
          stormy
          <input
            value={weather}
            type='radio'
            name='weather'
            onChange={() => setWeather(Weather.Stormy)}
          />
          windy
          <input
            value={weather}
            type='radio'
            name='weather'
            onChange={() => setWeather(Weather.Windy)}
          />
        </div>
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