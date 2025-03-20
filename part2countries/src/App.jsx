import { useState, useEffect } from 'react'
import './App.css'
import { Search } from './components/Search'
import axios from 'axios'

function App() {
  const [country, setCountry] = useState('')
  const [result, setResult] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setResult(response.data)
      })
  }, [])

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  return (
    <div>
      <form>
        find countries <input value={country} onChange={handleCountryChange} />
        <Search result={result} country={country} />
      </form>
    </div>
  )
}

export default App