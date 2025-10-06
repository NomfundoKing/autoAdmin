import { useState, useEffect } from 'react';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import EditProfile from './Pages/EditProfile';
import Profile from './components/Profile/Profile';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-image: url('/first.gif'); 
`;

function App() {
  const [currentForm, setCurrentForm] = useState("login"); 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUser(storedUser);
      setCurrentForm("home");
    }
  }, []);

  const handleSignupSuccess = () => setCurrentForm("login");

  const handleLoginSuccess = () => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(storedUser);
    setCurrentForm("home"); 
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setCurrentForm("login");
  };

  const handleSaveProfile = (updatedUser) => {
    setUser(updatedUser);
    setCurrentForm("home");
  };

  return (
    <AppContainer>  
    <div style={{ minHeight: "100vh", padding: "20px" }}>
      {currentForm === "login" && <Login onLogin={handleLoginSuccess} onShowSignup={() => setCurrentForm("signup")} />}
      {currentForm === "signup" && <Signup onSignupSuccess={handleSignupSuccess} onShowLogin={() => setCurrentForm("login")} />}
      {currentForm === "home" && user && <Profile user={user} onLogout={handleLogout} onEditProfile={() => setCurrentForm("editProfile")} />}
      {currentForm === "editProfile" && user && <EditProfile user={user} onSave={handleSaveProfile} />}
    </div>

    </AppContainer>
  );
}

export default App;
