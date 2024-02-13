import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logoSignup from '../images/digital-contract.svg'
function SignUp() {
  const [user, setUser] = useState({
    name : '',
    email : '',
    phone : '',
    work : '',
    password : '',
    confirmPassword : '' 
  })
  
  let name, value;
  function InputEvents (event){
    name = event.target.name
    value = event.target.value
    
    setUser({...user, [name] : value})
  }

  async function userSubmit(event) {
    event.preventDefault()
    // console.log(event)
    const {name, email, phone, work, password, confirmPassword} = user;
    // const
    const resp = await fetch('/signup', {
      method : "POST",
      headers : {
        "Content-Type" : 'application/json'
      },
      body : JSON.stringify({
        name, email, phone, work, password, confirmPassword
      }),
    });

    const data = await resp.json();
    if(resp.status === 422 || !data ){
      console.log('Invalid Registration')
    }else {
      console.log('Registration Success')
      window.alert("Registration Success")
    }
  }

  
  return (
    <>
      <section className="signup magicpattern">
        <div className="container mt-5">
          <div className="signup-content px-4">
              {/* <h2 className="form-title">Sign Up</h2> */}
            <div className="signup-form row ">
              {/* remonving mt-4 form classname */} 
              <form method="POST" className="register-form col" id="register-form">
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="zmdi zmdi-account zmdi-hc-lg"></i>
                  </label>
                  {/* <input type="text" disabled={true}
                    value={user.userId}
                  /> */}
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    value={user.name}
                    onChange={InputEvents}
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email zmdi-hc-lg"></i>
                  </label>
                  <input
                    type="email "
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={user.email}
                    onChange={InputEvents}
                    placeholder="Your email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="zmdi zmdi-phone-in-talk zmdi-hc-lg"></i>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    inputMode="numeric"
                    id="phone"
                    autoComplete="off"
                    value={user.phone}
                    onChange={InputEvents}
                    placeholder="Your phone"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="work">
                    <i className="zmdi zmdi-slideshow zmdi-hc-lg"></i>
                  </label>
                  <input
                    type="text"
                    name="work"
                    id="work"
                    autoComplete="off"
                    value={user.work}
                    onChange={InputEvents}
                    placeholder="Your Profession"
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
                    value={user.password}
                    onChange={InputEvents}
                    placeholder="Your password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cpassword">
                    <i className="zmdi zmdi-lock zmdi-hc-lg"></i>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="cpassword"
                    autoComplete="off"
                    value={user.confirmPassword}
                    onChange={InputEvents}
                    placeholder="Confirm password"
                  />
                </div>

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value="register"
                    onClick={userSubmit}
                  />
                </div>
              </form>

                {/* removing classname mt-5  */}
              <div className="signup-image col">
                <figure>
                  <img src={logoSignup} alt="img" />
                </figure>
                <NavLink to="/login" className="signup-image-link">
                  I am already register
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default SignUp
