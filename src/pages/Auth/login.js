import {React,useState} from 'react';
import Layout from '../../components/layout/layout.js';
import {Link, useNavigate,useLocation} from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useAuth } from '../../context/auth.js';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth] = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  //handle submit
  const HandleSubmit = async (e)=>{
    setIsLoading(true)
    setIsError(false);
    e.preventDefault()
    try{
      const resp = await axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/auth/login`,{
        "email": email,
        "password": password
      }
      );
      console.log(resp)
      if (resp.status === 200 && resp.data.success) {
        setAuth({
          ...auth,
          role:resp.data.userExists.role || 'user',
          user: resp.data.userExists.name,
          token: resp.data.token,
          id: resp.data.userExists._id
        })
        //set data in local storage
        localStorage.setItem('auth',JSON.stringify(resp.data))
        // show success message to the user
        toast.success("Login successful");
        navigate(location.state || '/')
      } else {
        setIsLoading(false);
        setIsError(true);
        // show error message to the user
        toast.error("Invalid email or password");
      }
    } catch(error){
      setIsLoading(false);
      setIsError(true);
      toast.error("Something Went Wrong.")
    }
  }

  return (
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <div class="max-width-250 rounded p-5 login-container">
        <h2 class="text-center mb-4">Sign In</h2>
        <form onSubmit={HandleSubmit}>
          <div class="mb-3">
            <label for="exampleloginEmail1" class="form-label">Email address</label>
            <input 
              type="email" 
              class="form-control" 
              id="exampleloginEmail1" 
              aria-describedby="emailHelp"
              autoComplete="new-password"
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
          {isError && <p className='text-danger'><small>Invalid Credentials</small></p>}
          <button type="submit"
          class="btn btn-primary w-100"
          disabled = {isLoading}
          >{isLoading ? 'Logging in...' : 'Login'}</button>
        </form>
        <div class="mt-3 text-center">
        <Link to='/register' className="singup">
          Sign up now
          </Link>
        </div>
        <div class="mt-3 text-center">
        <Link to='/forgotpassword' className="singup">
          Forgot Password?
          </Link>
        </div>
      </div>
    </div>

  )
}

export default Login;
