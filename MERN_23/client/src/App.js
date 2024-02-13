import {Routes, Route} from "react-router-dom"
import SignUp from "./components/SignUp";
import About from "./components/About";
import Contact from "./components/Contact";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.css"
// import './App.css'
import './Style.css'
import Navbar from "./components/Navbar";

function App(){
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/about" Component={About}/>
        <Route path="/contact" Component={Contact}/>
        <Route path="/signup" Component={SignUp}/>
        <Route path="/signin" Component={LogIn} />
      </Routes>
    </>
  )
}

export default App;
