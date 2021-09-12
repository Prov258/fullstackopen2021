import React, {useState} from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick} >{text}</button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  const findFeedbackAverage = () => total ? (good - bad) / total : 0;

  const findPositivePercentage = () => total ? (good / total) * 100 : 0;

  return (
    <>
      <h1>statistics</h1>
      <ul>
        <li>good: {good}</li>
        <li>neutral: {neutral}</li>
        <li>bad: {bad}</li>
        <li>all : {total}</li>
        <li>average: {findFeedbackAverage()}</li>
        <li>positive: {findPositivePercentage()}%</li>
      </ul>
    </>
  )
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);  
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={() => setGood(good + 1)} text={"good"} />
        <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"} />
        <Button onClick={() => setBad(bad + 1)} text={"bad"} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
