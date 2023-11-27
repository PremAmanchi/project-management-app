import "./App.css";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import test from "./components/test";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Axios from "axios";

function App() {
  Axios.defaults.withCredentials = true;
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<test />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
