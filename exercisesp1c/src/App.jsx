import { useState } from 'react'

import { Statistics } from './components/Statistics'


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [score, setScore] = useState(0)
  const [percPositive, setPercPositive] = useState(0)
  



  

  const updateStats = () =>{
    setTotal(good + neutral + bad + 1)
    setScore((good * 1 + bad * (-1))/(good + bad))
    setPercPositive(good/(good+neutral+bad)*100)
    
  }

  const handleGoodClick = () =>{
    setGood(good + 1)
    updateStats()
  }
  const handleNeutralClick = () =>{
    setNeutral(neutral + 1)
    updateStats()
  }
  const handleBadClick = () =>{
    setBad(bad + 1)
    updateStats()
  }

  

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      </div>
      <Statistics 
        data={{
          good: good,
          neutral: neutral,
          bad: bad,
          total: total,
          average: score,
          positive: percPositive
        }}
      />
    </div>
  )
}

export default App