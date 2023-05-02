import { useState } from 'react';

export default function AuthForm() {
  const [activePanel, setActivePanel] = useState('signin');

  const handlePanelToggle = (panel) => {
    setActivePanel(panel);
  };

  return (
    <div>
      <div className="container" id="container">
        <div className={`form-container ${activePanel}-container`}>
          {activePanel === 'signup' && (
            <form action="#">
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button type="submit">Sign Up</button>
            </form>
          )}

          {activePanel === 'signin' && (
            <form action="#">
              <h1>Sign In</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <a href="#" className="forgot" id="forgot-pw">
                Forgot your Password ?
              </a>
              <button type="submit">Sign In</button>
            </form>
          )}

          {activePanel === 'forgot' && (
            <div className="form-container forgot-pw">
              <h1>Reset Password</h1> <br />
              <br />
              <span>Enter your registered email</span>
              <input type="email" placeholder="Email" />
              <button type="submit" id="submit">
                Submit
              </button>
              <br />
              <br />
              <button
                type="button"
                onClick={() => handlePanelToggle('signin')}
              >
                Back
              </button>
            </div>
          )}
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep shopping with us please log in with your account</p>
              <button
                className="over-btn"
                id="signin"
                onClick={() => handlePanelToggle('signin')}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, there</h1>
              <p>
                We are excited as much as you. Click below to create an account
              </p>
              <button
                className="over-btn"
                id="signup"
                onClick={() => handlePanelToggle('signup')}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
