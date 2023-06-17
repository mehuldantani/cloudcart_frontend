import Layout from "../../components/layout/layout.js";
import toast from "react-hot-toast";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  //handle submit
  const HandleSubmit = async (e) => {
    setIsLoading(true);
    setIsError(false);
    e.preventDefault();
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/v1/auth/password/forgot/`,
        {
          email: email,
        }
      );
      if (resp.status === 200 && resp.data.success) {
        toast.success(`We have sent an email to ${email} address.`);
        // show success message to the user
        navigate("/login");
      } else {
        setIsLoading(false);
        setIsError(true);
        // show error message to the user
        toast.error("Something Went Wrong.");
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      toast.error("Something Went Wrong.");
    }
  };

  return (
    <div className="d-flex">
      <div
        className="container text-white bg-primary justify-content-center vh-100"
        style={{ display: "flex", flexDirection: "column", textAlign: "right" }}
      >
        <div className="m-3">
          <h1>CloudCart</h1>
          <h4 className="cool-animation">Shop like a pro, effortlessly.</h4>
        </div>
      </div>
      <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="p-3 m-3" style={{ width: "350px" }}>
          <h2 class="text-center mb-4">Forgot Password</h2>
          <form onSubmit={HandleSubmit}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Registered Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
            {isError && (
              <p className="text-danger">
                <small>User not found.</small>
              </p>
            )}
            <button
              type="submit"
              class="btn btn-primary w-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <div class="spinner-border" role="status" />
              ) : (
                "Send Email"
              )}
            </button>
          </form>
          <div class="mt-3 text-center">
            <Link
              to="/login"
              className="signin"
              style={{ fontSize: "13px", textDecoration: "none" }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
