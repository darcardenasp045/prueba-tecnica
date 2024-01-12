import './App.css'
import { useEffect, useState } from 'react'

const CAT_API_URL = 'https://catfact.ninja/fact'

function App() {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(()=>{
    fetch(CAT_API_URL)
    .then(response => response.json())
    .then(data => {
      const {fact} = data
      setFact(fact)
      
    })
   
    
  }, [] )

  useEffect(()=>{
    
    if(!fact) return

    const threeFirstWords = fact.split(' ', 3).join(' ')
    console.log(threeFirstWords)

    fetch(`https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red&json=true`)
    .then(res => res.json())
    .then(response => {
      console.log(response)
      const {_id } = response
      console.log(_id)
      setImageUrl(`https://cataas.com/cat/${_id}/says/${threeFirstWords}?fontSize=50&fontColor=red`)
    })

  },[ fact])

  return (
    <main>
      <h1>App de Gatos</h1>
    {
      fact && <p>{fact}</p> 
    }
    {
      imageUrl && <img src={imageUrl} alt={`image extracted using the first three words for ${fact}`} />
    }

    </main>
    

  )
} 

export default App
