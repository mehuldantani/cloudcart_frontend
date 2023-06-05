import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/layout'
import Adminmenu from '../../components/layout/adminmenu.js'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan} from '@fortawesome/free-solid-svg-icons';
 
const User = () => {

  const [users,setUsers] = useState([]);

  const getAllusers = async ()=>{

    try {
      const resp = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/auth/allusers`);

      if (resp.status === 200 && resp.data.success) {
        setUsers(resp.data.users); // Set users directly without Object.entries()
      }
      else{
        toast.error(resp.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }

  };

  const handleDelete = async (userid) => {

    try{
      const resp = await axios.delete(`${process.env.REACT_APP_BASE_URL}api/v1/auth/${userid}`);

      if (resp.status === 200 && resp.data.success) {
        
        toast.success("User Deleted");
        getAllusers();
      } else {
        // show error message to the user
        toast.error(resp.data.message);
      }
    } catch(error){
      toast.error(error.response.data.message);
    }

  }

  useEffect(()=>{
    getAllusers();
  },[])

  return (
    <Layout>
        <div className='container-fluid p-3'>
          <div className='row'>
            <div className='col-md-3' style={{paddingTop:'60px'}}>
                <Adminmenu />
            </div>
            <div className='col-md-9' style={{paddingTop:'60px'}}>
              <h3>Users List</h3>
              <div>
              <table className='table table-striped table-hover'>
                <thead>
                  <tr>
                    <th scope='col-4'>Name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((c) => (
                    <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td><FontAwesomeIcon icon={faTrashCan} style={{cursor: 'pointer',color:'red',fontSize:'18px'}}  onClick={()=>{handleDelete(c._id)}} /></td>
                 </tr>
                  ))}
                </tbody>
              </table>
            </div>
              </div>
          </div>
        </div>
    </Layout>
  )
}

export default User