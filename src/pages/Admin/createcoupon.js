import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import Adminmenu from "../../components/layout/adminmenu.js";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Couponform from "../../components/Form/couponform";
import { Modal } from "antd";

const Createcoupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [code, setCode] = useState("");
  const [updatedcode, setUpdatedcode] = useState("");
  const [discount, setDiscount] = useState(null);
  const [updateddiscount, setUpdateddiscount] = useState(0);
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);

  //form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/v1/coupon`,
        {
          code: code.toUpperCase(),
          discount: discount,
        }
      );

      if (resp.status === 200 && resp.data.success) {
        toast.success(`${code} Added.`);
        setCode("");
        setDiscount(null);
        getAllCoupons();
      } else {
        // show error message to the user
        toast.error(resp.data.message);
      }
    } catch (error) {
      if (error.response) {
        // handle error response with status code 400
        toast.error(error.response.data.message);
      } else {
        // handle other errors

        toast.error("Something Went Wrong.");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.put(
        `${process.env.REACT_APP_BASE_URL}api/v1/coupon/${selected._id}`,
        {
          code: updatedcode,
          discount: updateddiscount,
        }
      );

      if (resp.status === 200 && resp.data.success) {
        toast.success(`Updated ${updatedcode}.`);
        setCode("");
        setDiscount(null);
        setUpdateddiscount(0);
        setUpdatedcode("");
        getAllCoupons();
        setVisible(false);
        setSelected(null);
      } else {
        // show error message to the user
        toast.error(resp.data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong.");
    }
  };

  const handleDelete = async (itemid) => {
    try {
      const resp = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}api/v1/coupon/${itemid}`
      );
      if (resp.status === 200 && resp.data.success) {
        toast.success(`${code} Deleted`);
        setCode("");
        setUpdatedcode("");
        setDiscount(null);
        setUpdateddiscount(0);
        getAllCoupons();
      } else {
        // show error message to the user
        toast.error(resp.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //get all categories
  const getAllCoupons = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/v1/coupon`
      );
      if (resp.status === 200 && resp.data.success) {
        setCoupons(resp.data.coupons); // Set coupons directly without Object.entries()
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // handle error response with status code 400
        toast.error(error.response.data.message);
      } else {
        // handle other errors

        toast.error("Something Went Wrong.");
      }
    }
  };

  useEffect(() => {
    getAllCoupons();
  }, []);

  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3" style={{ paddingTop: "60px" }}>
            <Adminmenu />
          </div>
          <div className="col-md-9" style={{ paddingTop: "60px" }}>
            <h3>Manage Coupons</h3>
            <div className="p-3 w-50">
              <Couponform
                HandleSubmit={handleSubmit}
                value={code}
                setValue={setCode}
                discount={discount}
                setDiscount={setDiscount}
              />
            </div>
            <div>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col-4">Name</th>
                    <th scope="col">Discount</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((c) => (
                    <tr key={c._id}>
                      <td>{c.code}</td>
                      <td>{c.discount} %</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          style={{
                            cursor: "pointer",
                            color: "green",
                            fontSize: "18px",
                          }}
                          onClick={() => {
                            setVisible(true);
                            setUpdatedcode(c.code);
                            setUpdateddiscount(c.discount);
                            setSelected(c);
                          }}
                        />
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          style={{
                            cursor: "pointer",
                            color: "red",
                            fontSize: "18px",
                          }}
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <Couponform
                HandleSubmit={handleUpdate}
                value={updatedcode}
                setValue={setUpdatedcode}
                discount={updateddiscount}
                setDiscount={setUpdateddiscount}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Createcoupon;
