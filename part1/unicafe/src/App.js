import React, {useState} from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick} >{text}</button>

const StatisticLine = ({ statText, statValue }) => {
  return (
    <tr>
      <td>{statText}</td>
      <td>{statValue}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  const findFeedbackAverage = () => total ? (good - bad) / total : 0;

  const findPositivePercentage = () => total ? ((good / total) * 100) + "%" : "0%";

  return (
    <>
      <h1>statistics</h1>
      {total ? 
        <table>
          <tbody>
            <StatisticLine statText={"good"} statValue={good} />
            <StatisticLine statText={"neutral"} statValue={neutral} />
            <StatisticLine statText={"bad"} statValue={bad} />
            <StatisticLine statText={"all"} statValue={total} />
            <StatisticLine statText={"average"} statValue={findFeedbackAverage()} />
            <StatisticLine statText={"positive"} statValue={findPositivePercentage()} />
          </tbody>
        </table> : 
        <div>No feedback given</div>
      }
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
