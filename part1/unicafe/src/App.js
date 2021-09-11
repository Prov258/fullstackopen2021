import React, {useState} from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick} >{text}</button>
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
      <h1>statistics</h1>
      <ul>
        <li>good: {good}</li>
        <li>neutral: {neutral}</li>
        <li>bad: {bad}</li>
      </ul>
    </div>
  );
}

export default App;
