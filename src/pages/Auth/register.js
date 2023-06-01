import Layout from '../../components/layout/layout.js';
import toast from 'react-hot-toast';
import {React,useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name,setName] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

  
    //handle submit
    const HandleSubmit = async (e)=>{
      e.preventDefault()
      setIsLoading(true)
      setIsError(false)
      try{
        const resp = await axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/auth/signup`,{
            "name": name,
            "email": email,
            "password": password
        }
        );
        console.log(resp)
        if (resp.status === 200 && resp.data.success) {
          // show success message to the user
          navigate('/login')
          toast.success("User Created Successfully.");
          
        } else {
          setIsLoading(false)
          setIsError(true)
          // show error message to the user
          toast.error("Something Went Wrong.");
        }
      } catch(error){
        setIsLoading(false)
        setIsError(true)
        toast.error("Something Went Wrong.")
      }
    }
  
    return (
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="max-width-250 rounded p-5 login-container">
      <h2 class="text-center mb-4">Sign Up</h2>
      <form onSubmit={HandleSubmit}>
        <div class="mb-3">
          <label for="exampleInputName" class="form-label">Name</label>
          <input 
            type="text" 
            class="form-control" 
            id="exampleInputName" 
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            required
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input 
            type="email" 
            class="form-control" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            required
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input 
            type="password" 
            class="form-control" 
            id="exampleInputPassword1"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            required
          />
        </div>
        {isError && <p className='text-danger'><small>Something went wrong</small></p>}
        <button type="submit" 
        class="btn btn-primary w-100"
        disabled={isLoading}
        >{isLoading ? 'Registering...':'Register'}</button>
      </form>
      <div class="mt-3 text-center">
      <Link to='/login' className="signin">
        Sign In
        </Link>
      </div>
    </div>
  </div>
    )
  }

export default Register;