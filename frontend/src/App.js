import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Login from './components/User/Login'
import Signup from './components/User/Signup'
import { Navbar } from './components/Navbar/Navbar'
// import Timer from './components/Timer/Timer'
import { Profile } from './components/Profile/Profile'
import ForgotPassword from './components/User/ForgotPassword/ForgotPassword'
import HomePage from './components/HomePage/HomePage'
import Comments from './components/Community/Comments'
import Info from './components/HomePage/Info'
import Rankings from "./components/Community/Rankings/Rankings"
import { Analytics } from "./components/Analytics/Analytics"
import { LandingPage } from "./components/LandingPage/LandingPage"


function App() {
  const location = useLocation();
  return (
    <div>
      <div>
        <div>
          {location.pathname !== "/" && (
            <div>
              <Navbar />

            </div>)}
        </div>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/community" element={<Comments />} />
          <Route path="/info" element={<Info />} />
          {/* <Route path="/timer" element={< Timer />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/analytics" element={<Analytics />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;