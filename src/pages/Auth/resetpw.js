import Layout from '../../components/layout/layout.js';
import toast from 'react-hot-toast';
import {React,useState} from 'react';
import {useNavigate,useParams} from 'react-router-dom'
import axios from 'axios'

const Resetpassword = () => {
 
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { token } = useParams();
    const navigate = useNavigate();
    //handle submit
    const HandleSubmit = async (e)=>{
      setIsLoading(true)
      e.preventDefault()
      
      const url = `api/v1/auth/password/reset/${token}`;
      try {
        const resp = await axios.post(`${process.env.REACT_APP_BASE_URL}${url}`, {
          "password": password,
          "confirmPassword": confirmpassword
        });
      
        if (resp.status === 200 && resp.data.success) {
          // show success message to the user
          navigate('/login')
          toast.success("Password Reset Successfully");
        } else {
          setIsLoading(false)
          // show error message to the user
          toast.error(resp.data.message);
        }
      } catch (error) {
        setIsLoading(false)
        if (error.response && error.response.status === 400) {
          // handle error response with status code 400
          toast.error(error.response.data.message);
        } else {
          // handle other errors
          console.log(error);
          toast.error("Something Went Wrong.");
        }
      }
        
    }
  
    return (
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="max-width-250 rounded p-5 login-container">
      <h2 class="text-center mb-4">Reset Password</h2>
      <form onSubmit={HandleSubmit}>
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
        <div class="mb-3">
          <label for="exampleInputPassword2" class="form-label">Confirm Password</label>
          <input 
            type="password" 
            class="form-control" 
            id="exampleInputPassword2"
            value={confirmpassword}
            onChange={(e)=>{setConfirmpassword(e.target.value)}}
            required
          />
        </div>
        <button type="submit" 
        class="btn btn-primary w-100"
        disabled={isLoading}
        >{isLoading ? 'Validating...' : 'Reset Password'}</button>
      </form>
    </div>
  </div>
    )
  }

export default Resetpassword;