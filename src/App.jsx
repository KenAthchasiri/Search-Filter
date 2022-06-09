import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [countries,setCountries] = useState([])
  const [word,setWord] = useState('')
  const [dataFilter] = useState(['name','capital'])

  const searchCountries = (countries) => {
    return countries.filter((item)=>{
      return dataFilter.some((filter)=>{
        if(item[filter]){
          return item[filter].toString().toLowerCase().indexOf(word.toLowerCase())>-1
        }
      })
    })
  }

  const formatNumber=(num)=> {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  
  useEffect(()=>{
    fetch('https://restcountries.com/v2/all')
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        setCountries(data)
      })
  },[])
  return (
    <div className='container'>
      <div className='search-container'>
        <label htmlFor="search-form">
          <input className='search-input' type="text" placeholder='ค้นหาข้อมูลประเทศที่ต้องการ (เมืองหลวง,ชื่อประเทศ)' value={word} onChange={(e)=>setWord(e.target.value)}/>
        </label>
      </div>
      <ul className='row'>
        {searchCountries(countries).map((element,i)=>{
          return (
              <li key={i}>
                <div className='card'>
                  <div className='card-title'>
                    <img className='card-img' src={element.flags.png} alt={element.name} />
                  </div>
                  <div className='card-body'>
                    <div className='card-description'>
                      <h2>{element.name}</h2>
                      <ol className='card-list'>
                        <li>ประชากร : <span>{formatNumber(element.population)}</span> </li>
                        <li>ภูมิภาค : <span>{element.region}</span></li>
                        <li>เมืองหลวง : <span>{element.capital}</span> </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </li>

          )
        })}
      </ul>
      
    </div>
  )
}

export default App
