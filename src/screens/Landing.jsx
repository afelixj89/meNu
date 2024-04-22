import React from "react";
import { register, login } from "../services/users.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Landing(props) {
  const [formToggle, setFormToggle] = useState(true);

  const navigate = useNavigate();

  // Register Form Code --------------------------------------------------

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    firstName: "",
    lastName: "",
    description: "",
    image: "",
    isError: false,
    errorMsg: "",
  });

  //          Handle Change for Register form
  const registerHandleChange = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  //        Function for clicking register button
  const onSignUp = async (event) => {
    event.preventDefault();
    const { setUser } = props;

    // Check if password and password confirmation match
    if (registerForm.password !== registerForm.passwordConfirmation) {
      setRegisterForm({
        ...registerForm,
        isError: true,
        errorMsg: "Password and password confirmation do not match.",
      });
      return; // Exit the function early
    }

    try {
      const user = await register(registerForm);
      setUser(user);
      navigate("/home");
    } catch (error) {
      //trying to let client know username they put is already used.....
      if (error.message === "Username already exist") {
        setRegisterForm({
          ...registerForm,
          isError: true,
          errorMsg: "Username is already taken.",
        });
      } else {
        setRegisterForm({
          ...registerForm,
          username: "",
          email: "",
          password: "",
          passwordConfirmation: "",
          description: "",
          image: "",
          isError: true,
          errorMsg: "Sign Up Details Invalid",
        });
      }
    }
  };

  const renderRegisterError = () => {
    // const toggleRegisterForm = registerForm.isError ? "danger" : "";
    if (registerForm.isError) {
      return <p className="register-error">{registerForm.errorMsg}</p>;
    }
  };

  const {
    username,
    email,
    password,
    passwordConfirmation,
    firstName,
    lastName,
    description,
    image,
  } = registerForm;

  // LOGIN Form Code --------------------------------------------------

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
    isError: false,
    errorMsg: "",
  });

  const onLoginSubmit = async (event) => {
    event.preventDefault();
    const { setUser } = props;
    try {
      const user = await login(loginForm);
      // Assuming login() returns the user if login is successful
      if (user) {
        setUser(user);
        navigate("/home");
      } else {
        setLoginForm({
          ...loginForm,
          isError: true,
          errorMsg: "Invalid Credentials",
          username: "",
          password: "",
        });
      }
    } catch (error) {
      console.error(error);
      setLoginForm({
        ...loginForm,
        isError: true,
        errorMsg: "Invalid Credentials",
        username: "",
        password: "",
      });
    }
  };

  const loginHandleChange = (event) =>
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });

    const renderLoginError = () => {
      if (loginForm.isError) {
        return <p className="register-error">{loginForm.errorMsg}</p>;
      }
      return null; // Return null if there's no error
    };
    
  function handleRegisterLoginClick() {
    setFormToggle((prev) => !prev);
  }

  return (
    <div>
      <div className="homeBody">
        <div className="landingNav">
          <p className="navTitles">ME n U</p>
        </div>
        <div className="row justify-content-center align-items-center vh-100">
          <div className="d-flex justify-content-around">
            {formToggle ? (
              <div className="form-container">
                <form
                  onSubmit={onSignUp} //make onSubmit function
                  action="/register"
                  method="POST"
                  className="col-4 p-4 mx-auto"
                  id="userForms"
                >
                  <h2 id="userFormsTitle" className="text">
                    Register
                  </h2>
                  {renderRegisterError()}
                  <div className="names">
                    <div className="form-group firstname-box">
                      <p className="input-title">First Name</p>
                      <label htmlFor="firstName"></label>
                      <input
                        required
                        type="text"
                        name="firstName"
                        value={firstName}
                        // placeholder="First Name"
                        onChange={registerHandleChange} //make handleChange function
                        className="userFormInputs"
                      />
                    </div>

                    <div className="form-group lastname-box">
                      <p className="input-title">Last Name</p>
                      <label htmlFor="lastName"></label>
                      <input
                        required
                        type="text"
                        name="lastName"
                        value={lastName}
                        // placeholder="Last Name"
                        onChange={registerHandleChange} //make handleChange function
                        className="userFormInputs"
                      />
                    </div>
                  </div>

                  <div className="username-description-box">
                    <div className="form-group username-box">
                      <p className="input-title">Username</p>
                      <label htmlFor="username"></label>
                      <input
                        required
                        type="text"
                        name="username"
                        value={username}
                        // placeholder="username"
                        onChange={registerHandleChange} //make handleChange function
                        className="userFormInputs"
                      />
                    </div>

                    <div className="form-group description-box">
                      <p className="input-title">Description</p>
                      <label htmlFor="description"></label>
                      <input
                        required
                        type="text"
                        name="description"
                        value={description}
                        // placeholder="Description"
                        onChange={registerHandleChange} //make handleChange function
                        className="userFormInputs"
                      />
                    </div>
                  </div>

                  <div className="form-group email-picture-box">
                    <p className="input-title">Email Name</p>

                    <label htmlFor="email"></label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={email}
                      // placeholder="Email"
                      onChange={registerHandleChange} //make handleChange function
                      className="userFormInputs"
                    />
                  </div>

                  <div className="passwords">
                    <div className="form-group">
                      <p className="input-title">Password</p>

                      <label htmlFor="password"></label>
                      <input
                        required
                        type="password"
                        name="password"
                        value={password}
                        // placeholder="Password"
                        onChange={registerHandleChange}
                        className="userFormInputs"
                      />
                    </div>
                    <div className="form-group">
                      <p className="input-title">Re-type Password</p>

                      <label htmlFor="confirm"></label>
                      <input
                        placeholder="Confirm Password"
                        type="password"
                        name="passwordConfirmation"
                        value={passwordConfirmation}
                        onChange={registerHandleChange}
                        className="userFormInputs"
                      />
                    </div>
                  </div>

                  <div className="form-group email-picture-box">
                    <p className="input-title">Profile Picture</p>

                    <label htmlFor="image"></label>
                    <input
                      placeholder="Insert img URL"
                      name="image"
                      type="text"
                      value={image}
                      onChange={registerHandleChange}
                      className="userFormInputs"
                    />
                  </div>

                  <div className="buttonsignup text-center">
                    <input
                      id="userFormsButtons"
                      type="submit"
                      value="Register"
                      className="btn mt-3"
                    />
                  </div>

                  <div className="haveAccountButton">
                    <button
                      className="toggletag have-account"
                      onClick={handleRegisterLoginClick}
                    >
                      Have An Account?
                    </button>
                  </div>
                </form>
                
                
                
              </div>
              
            ) : (
              <form
                onSubmit={onLoginSubmit}
                action="/home"
                method="POST"
                className="col-3 p-3"
                id="userForms"
              >
                <h2 id="userFormsTitle" className="text text-center">
                  Login
                </h2>
                {renderLoginError()}
                <div className="form-group login-input">
                  <p className="input-title">Username</p>
                  <label htmlFor="username"></label>
                  <input
                    type="text"
                    // placeholder="Username"
                    name="username"
                    value={loginForm.username}
                    onChange={loginHandleChange}
                    className="userFormInputs"
                  />
                </div>
                <div className="form-group login-input">
                  <p className="input-title">Password</p>
                  <label htmlFor="password"></label>
                  <input
                    type="password"
                    // placeholder="Password"
                    name="password"
                    value={loginForm.password}
                    onChange={loginHandleChange}
                    className="userFormInputs"
                  />
                  <div className="text-center">
                    <input
                      id="userFormsButtons"
                      type="submit"
                      value="Log In"
                      className="btn mt-3"
                    />
                  </div>
                </div>
                <p className="toggletag" onClick={handleRegisterLoginClick}>
                  Not Registered? Register here.
                </p>
                {/* {renderLoginError()} */}
              </form>
            )}
          </div>
          <div className="storyToggleParent">
          <div className= "storyToggle">Read Our Story</div>
          <div className="intro-container">
                  <h2 className="intro-title">ME n U</h2>
                  <p className="intro-paragraph">
                    {" "}
                    In a world where culinary creativity knows no bounds and the
                    joy of sharing delicious discoveries is limitless, welcome
                    to MEnU! Embark on a journey where flavors converge,
                    cultures intertwine, and recipes come to life in vibrant
                    detail. Whether you're a seasoned chef or a kitchen novice,
                    our platform offers a dynamic space where you can explore,
                    share, and savor an endless array of culinary delights.{" "}
                  </p>
                  <p className="intro-paragraph join">
                    Join our community today and let the aroma of creativity
                    waft through your feed
                  </p>
                </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Landing;
