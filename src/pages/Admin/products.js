import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/layout.js'
import Adminmenu from '../../components/layout/adminmenu.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare ,faTrashCan} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import {toast} from 'react-hot-toast'

const Products = () => {

  const [products,setProducts] = useState([])

  const getallproducts = async ()=>{
    try {
      const resp = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/product`);

      if (resp.status === 200 && resp.data?.success) {
        setProducts(resp.data.products); // Set categories directly without Object.entries()
        
      }
    } catch (error) {
      if (error.response) {
        // handle error response with status code 400
        toast.error(error.response.data.message);
      } else {
        // handle other errors
        
        toast.error('Something Went Wrong.');
      }
    }
  };

  const handleDelete = async (productid)=>{
    try{
      const resp = await axios.delete(`${process.env.REACT_APP_BASE_URL}api/v1/product/${productid}`);

      if (resp.status === 200 && resp.data.success) {
        toast.success("Deleted Successfully");
        getallproducts()
      } else {
        // show error message to the user
        toast.error(resp.data.message);
      }
    } catch(error){
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getallproducts();
  }, []);

  return (
    <Layout>
    <div className='container-fluid p-3'>
      <div className='row'>
        <div className='col-md-3' style={{paddingTop:'60px'}}>
            <Adminmenu />
        </div>
        <div className='col-md-9' style={{paddingTop:'60px'}}>
          <h1 className='text-center'>Products Catalogue</h1>
          <div className='d-flex flex-wrap'>
          {products?.map(product => (
            <div className="m-2 rounded zoom-image product-card" >
              {product.photos && product.photos.length > 0 ? (
                <div style={{ display: "flex", justifyContent: "center"}}>
                  <img
                  className="img rounded  img-responsive m-1"
                  src={product.photos[0].secure_url}
                  alt={product.name}
                />
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "center"}}>
                  <img
                  className="img rounded  img-responsive m-1"
                  src='https://cloud-cart.s3.ap-south-1.amazonaws.com/products/6471f1fe66f3b36622234f30/photo_1.png'
                  alt='No Image'
                />
                </div>
              )}
              <div className="card-body m-2">
                <h6 className="card-title">{product.name}</h6>
                <p className="card-text font-weight-bold lh-lg">{product.description.substring(0,20)}</p>
                <div className='d-flex justify-content-between'>
                <div className="card-text font-weight-bold"><strong>Rs. {product.price}</strong></div>
                  <div className="ml-auto">
                    <FontAwesomeIcon className='margin-auto' style={{cursor: 'pointer',color:'red',fontSize:'20px'}} icon={faTrashCan} onClick={()=>{handleDelete(product._id)}} />
                  </div>
              </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default Products