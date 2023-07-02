import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../../context/cart";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  const navigate = useNavigate();
  const HandleLougout = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/v1/auth/logout`,
        null
      );

      if (resp.status === 200 && resp.data.success) {
        // show success message to the user
        //navigate('/contact')
        toast.success("Logged Out");
      } else {
        // show error message to the user
        toast.error("Something Went Wrong.");
      }
    } catch (error) {
      toast.error("Something Went Wrong.");
    }

    setAuth({
      ...auth,
      user: null,
      token: null,
      role: null,
    });

    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary d-flex justify-content-between">
        <div className="brand">
          <Link to="/" className="navbar-brand navbar-custom">
            <HiShoppingCart style={{ fontSize: "40px", color: "white" }} />{" "}
            CloudCart
          </Link>
        </div>
        <div className="d-flex w-50 justify-content-center">
          <div style={{width:"450px"}}>
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search Products"
            aria-label="Search"
          />
          </div>
        </div>
        <div>
          <div className="collapse navbar-collapse d-flex" id="navbarText">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: "white" }}
              >
                {auth.user}
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    to={`/dashboard/${
                      auth?.role === "ADMIN" ? "admin" : "user"
                    }`}
                    className="dropdown-item"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    onClick={HandleLougout}
                    className="dropdown-item"
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link navbar-custom">
                <span className="position-relative">
                  Cart{" "}
                  <span className="badge badge-pill badge-secondary cart-badge">
                    {cart.length}
                  </span>
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
