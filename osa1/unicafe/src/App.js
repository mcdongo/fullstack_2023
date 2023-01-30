import { useState } from 'react'

const Header = ( {name} ) => <h1>{name}</h1>

const Button = ( {text, handleClick }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ( {good, neutral, bad} ) => {
  if (good === 0 & neutral === 0 & bad === 0) {
    return (
      <p>No feedback given</p>
    )
  } else {
    return (
      <table>
        <tbody>
          <tr><StatisticsLine text="good" value={good}/></tr>
          <tr><StatisticsLine text="neutral" value={neutral}/></tr>
          <tr><StatisticsLine text="bad" value={bad}/></tr>
          <tr><StatisticsLine text="all" value={good + neutral + bad}/></tr>
          <tr><StatisticsLine text="average" value={(good - bad) / (good + neutral + bad)}/></tr>
          <tr><StatisticsLine text="positive" value={good / (good + neutral + bad)*100} /></tr>
          </tbody>
      </table>
    )
  }
}

const StatisticsLine = ( {text, value} ) => {
  if (text === "positive") {
    return (
      <>
        <th>{text}</th><th>{value} %</th>
      </>
    )
  } else {
    return (
      <>
        <th>{text}</th><th>{value}</th>
      </>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <Header name="give feedback"/>
      <Button text="good" handleClick={handleGood}/>
      <Button text="neutral" handleClick={handleNeutral}/>
      <Button text="bad" handleClick={handleBad}/>
      <Header name="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App