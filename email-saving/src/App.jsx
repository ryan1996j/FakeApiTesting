import React from 'react'
import './App.css'
import { useEffect, useState } from 'react'
import axios from "axios"
import Cart from './components/Cart/Cart'
import { Routes, Route } from "react-router-dom"
import Create from './components/Create/Create'
import Edit from './components/Edit/Edit'

export const InfoContext = React.createContext()
function App() {
  const [info, setInfo] = useState([])
  const getData = async () => {

    const { data } = await axios.get('http://localhost:3000/contact');
    setInfo(data)
    console.log(info)


  }
  useEffect(() => {
    getData()



  }, [])



  return (
    <>

      <InfoContext.Provider value={info}>

        <Routes>
          <Route path='/' element={<Cart getData={getData} />}> </Route>
          <Route path='/Create' element={<Create setInfo={setInfo} info={info} getData={getData} />}></Route>
          <Route path='/Edit/:id' element={<Edit getData={getData} />}></Route>
        </Routes>

      </InfoContext.Provider>


    </>
  )
}

export default App
