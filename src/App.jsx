import { useEffect, useState } from 'react'
import axios from 'axios'


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchBox, setsearchBox] = useState('')
  const [content, setContent] = useState()
  const [showor, setShowor] = useState(false)

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then(response => {
      const data = response.data
      setCountries(data.map((country) => country.name.common))
    })
  }, [])

  const search = (event) => {
    setsearchBox(event.target.value)
    setShowor(false)
  }

  const ddos = (country) => {
    const name = country.toLowerCase()
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`).then(response => {
    const data = response.data
    let lmao = <div>
      <h1>{data.name.common}</h1>
      <p>capital {data.capital}</p>
      <p>area {data.area}</p>
      <strong>languages:</strong>
      <ul>
        {Object.values(data.languages).map((name, index) => <li key = {index}>{name}</li>)}
      </ul>
      <img src={data.flags.png} alt={data.flags.png}/> 
    </div>
    setContent(lmao)
    }).catch(error => {
      console.log('fail')
    })
    return content
  }

  const dox = (country) => {
    const name = country.toLowerCase()
    ddos(name)
    setShowor(true)
  }

  const countryToShow = searchBox.trim().length === 0
    ? [] :
    (searchBox.trim().length > 0 && countries.filter((name) => name.toLowerCase().includes(searchBox.toLowerCase())).length > 10)? ["Too many matches, specify another filter"] :
    searchBox.trim().length > 0 && countries.filter((name) => name.toLowerCase().includes(searchBox.toLowerCase())).length === 1? ddos(countries.filter((name) => name.toLowerCase().includes(searchBox.toLowerCase()))[0]):
    countries.filter((name) => name.toLowerCase().includes(searchBox.toLowerCase()) === true).map((name, index) => <div key = {index}>{name} <button onClick={() => dox(name)}>show</button></div>)

  const show = showor
  ? content
  : countryToShow

  return (
    <div>
      <form>
        <div>
          find countries<input value = {searchBox}
                onChange={search}/>
        </div>
      </form>
      <div>
        {show}
      </div>
    </div>
  )
}

export default App