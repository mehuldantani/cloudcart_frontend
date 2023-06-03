import React,{useState,useEffect, useInsertionEffect} from 'react'
import { useNavigate,useLocation } from 'react-router-dom';

const Spinner = ({path = "login"}) => {

  const [count,setCount] = useState(1)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(()=>{
    const interval = setInterval(() => {
      setCount((prevval) => --prevval)
    }, 1000);

    count === 0 && navigate(`/${path}`,{
      state:location.pathname
    })
    
    return ()=> clearInterval(interval)
  },[count,navigate,location,path])

  return (
    <>
    <div class="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  )
}

export default Spinner;