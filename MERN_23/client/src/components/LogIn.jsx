import React, { useState } from "react"
import signpic from '../images/digital-contract.svg'
import {useNavigate} from 'react-router-dom'
const LogIn = () => {
  // Javascript code here

  //-- First we can destructure email and password for login use
  const [eamilPass, setData]  = useState({
    email: "",
    password: "",
  });

  // -- Navigate to page after login
  const navigateTo = useNavigate()

  let name, value
  function InputValues(event) {
    // [name, value] = event.target
    name = event.target.name;
    value = event.target.value;
    setData({ ...eamilPass, [name]: value })
  };
  async function loginFunction(event) {
    event.preventDefault()
    const { email, password } = eamilPass
    const resp = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = resp.json();
    if(resp===400 || !data) {
      window.alert('Invalid Creadentials')
      console.log("Invalid Creadentials");
    } else {
      window.alert("Welcome")
      console.log('Welcome');
      navigateTo('/about')
    }
  };

  return (
    <section className="signup magicpattern">
      <div className="container mt-5">
        <div className="signup-content px-4">
          <div className="signup-form row gx-5">
            <h2 className="form-title">Welcome</h2>
            <form
              method="POST"
              className="register-form col my-5"
              id="register-form"
            >
              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-email zmdi-hc-lg"></i>
                </label>
                <input
                  type="email "
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={eamilPass.email}
                  onChange={InputValues}
                  placeholder="Your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <i className="zmdi zmdi-lock zmdi-hc-lg"></i>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  value={eamilPass.password}
                  onChange={InputValues}
                  placeholder="Your password"
                />
              </div>

              <div className="from-group form-button">
                <input
                  type="submit"
                  name="signin"
                  id="signin"
                  className="form-submit"
                  value="Log in"
                  onClick={loginFunction}
                />
              </div>
            </form>

            <div className="signup-image col">
              <figure>
                <img src={signpic} alt="img" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogIn
