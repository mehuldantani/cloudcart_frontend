import React,{useState,useEffect} from 'react';
import Layout from '../components/layout/layout.js';
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {Checkbox,Radio} from 'antd'
import {prices} from '../components/layout/filterprices.js'
import {useCart} from '../context/cart.js'

const HomePage = () => {

  const [cart,setCart] = useCart([])

  const [products,setProducts] = useState([])
  const [categories, setCategories] = useState([]);
  const [checked,setCheceked] = useState([])
  const [radio,setRadio] = useState([])

  useEffect(() => {
    getAllCategories();
  }, []);
  
  useEffect(() => {
    if (checked.length === 0 && radio.length === 0) {
      getallproducts();
    }
  }, [checked.length, radio.length]);
  


  useEffect(() => {
    if (checked.length || radio.length) filteredproducts();
  }, [checked.length, radio.length]);

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
        console.log(error);
        toast.error('Something Went Wrong.');
      }
    }
  };

  //get all categories
  const getAllCategories = async () => {
    try {
      const resp = await axios.get(`${process.env.REACT_APP_BASE_URL}api/v1/collection`);

      if (resp.status === 200 && resp.data.success) {
        setCategories(resp.data.allCollections); // Set categories directly without Object.entries()
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // handle error response with status code 400
        toast.error(error.response.data.message);
      } else {
        // handle other errors
        console.log(error);
        toast.error('Something Went Wrong.');
      }
    }
  };

  const handleFilter = (value,id) => {
    let all = [...checked]

    if (value){
      all.push(id)
    }
    else{
      all = all.filter((c) => c !== id)
    }
    setCheceked(all);
  }

  const filteredproducts = async () =>{

    const args = {
      "categories":checked,
      "price":radio
      };

    try {
      console.log(args)
      const resp = await axios.post(`${process.env.REACT_APP_BASE_URL}api/v1/product/filter-products`,args);

      if (resp.status === 200 && resp.data?.success) {
        console.log('filtered',resp.data.products)
        setProducts(resp.data.products); // Set categories directly without Object.entries()
        
      }
    } catch (error) {
      if (error.response) {
        // handle error response with status code 400
        setProducts([])
        toast.error(error.response.data.message);
      } else {
        // handle other errors
        console.log(error);
        toast.error('Something Went Wrong.');
      }
    }
  }

  return (
    <Layout>
      <div className='container-fluid p-3'>
      <div className='row'>
        <div className='col-md-2' style={{paddingTop:'60px'}}>
          <h4 className='text-left'> Filters</h4>
          <div className='d-flex flex-column'>
          <h6 className='mt-4 font-weight-bold'>Categories</h6>
          {categories?.map((c) => (
            <Checkbox className='ms-3' key={c._id} onChange={(e)=>{handleFilter(e.target.checked,c._id)}}>
                {c.name}
            </Checkbox>
          ))}
          </div>
          <div className='d-flex flex-column'>
          <h6 className='mt-4 font-weight-bold'>Prices</h6>
          <Radio.Group className='ms-3' onChange={(e) =>{setRadio(e.target.value)}}>
          {prices?.map((c) => (
            <div key={c._id}>
              <Radio value={c.array}>{c.name}</Radio>
            </div>
          ))}
          </Radio.Group>
          </div>
          <div className='d-flex justify-content-center m-4 float-right'>
            <button 
            className='btn btn-dark'
            onClick={()=>{
              window.location.reload()
                      }}>Reset</button>
          </div>
        </div>
        <div className='col-md-10' style={{paddingTop:'60px'}}>
          <h4 className='text-left'>Best of CloudCart Exclusive</h4>
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
                  className="img img-responsive"
                  src='https://cloud-cart.s3.ap-south-1.amazonaws.com/products/6471f1fe66f3b36622234f30/photo_1.png'
                  alt='No Image'
                />
                </div>
              )}
              <div className="card-body m-2">
                <h6 className="card-title">{product.name.substring(0,40)}</h6>
                <div className="card-text font-weight-bold lh-lg"><strong>Rs. {product.price}</strong></div>
                <button className="btn btn-primary add-to-cart-btn" onClick={() => {
                  setCart([...cart, product]);
                  localStorage.setItem('cart',JSON.stringify([...cart, product]))
                  toast.success(`${product.name} Added to Cart`);
                }}>
                  Add to Cart
                </button>

              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default HomePage;
