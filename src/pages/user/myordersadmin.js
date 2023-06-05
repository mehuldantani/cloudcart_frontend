import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/layout'
import Adminmenu from '../../components/layout/adminmenu'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import axios from 'axios'
import {toast} from 'react-hot-toast'

const Myadminorders = () => {

  const [expandedRows, setExpandedRows] = useState([]);
  const [orders,setOrders] = useState([])
  const handleRowClick = (rowIndex) => {
    const isRowExpanded = expandedRows.includes(rowIndex);
    const updatedRows = isRowExpanded
      ? expandedRows.filter((row) => row !== rowIndex)
      : [...expandedRows, rowIndex];
    setExpandedRows(updatedRows);
  };

  const isRowExpanded = (rowIndex) => expandedRows.includes(rowIndex);

  const TableRow = ({ rowIndex, name, amount,date,status, expanded, onClick, children }) => (
    <>
      <tr onClick={() => onClick(rowIndex)} style={{ cursor: 'pointer' }}>
        <td><span style={{ 'margin-right': '10px' }}>{expanded ? (
            <BsChevronUp size={20} color="#888" />
          ) : (
            <BsChevronDown size={20} color="#888" />
          )}</span>{name}</td>
        <td>{amount}</td>
        <td>{status}</td>
        <td>{date}</td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan="4">
            <div className="card card-body">{children}</div>
          </td>
        </tr>
      )}
    </>
  );
  
   //get all categories
   const getAllorders = async () => {
    try {
      const resp = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/order`);

      if (resp.status === 200 && resp.data.success) {
        setOrders(resp.data.allOrders)
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        // handle other errors
        
        toast.error('Something Went Wrong.');
      }
    }
  };

  useEffect(() =>{
    getAllorders();
  },[])

  return (
    <Layout>
      <div className='container-fluid p-3'>
          <div className='row'>
            <div className='col-md-3' style={{paddingTop:'60px'}}>
                <Adminmenu />
            </div>
            <div className="col-md-9" style={{paddingTop:'60px'}}>
            <h3>Orders</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            const createdAtIST = new Date(order.createdAt).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true
            });

            return (
              <TableRow
                key={index}
                rowIndex={index}
                name={order.paymentMode}
                amount={order.amount}
                date={createdAtIST}
                status={order.status}
                expanded={isRowExpanded(index)}
                onClick={handleRowClick}
              >
              <span>
                Coupon: {order.coupon}
              </span>
              </TableRow>
            );
          })}
        </tbody>
      </table>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Myadminorders