import { useState, useEffect } from "react";
import styled from 'styled-components';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import Label from '../components/UI/Label';
import Button from '../components/UI/Button';
import StyledForm from '../components/UI/StyledForm';
import SmlButton from '../components/UI/SmlButton';

const FormContainer = styled(Card)`
  max-width: 500px;  
  margin: 50px auto;
  background: #817878ff;
  color : white;
  background-image: url('https://i0.wp.com/picjumbo.com/wp-content/uploads/red-and-blue-pillars-wallpaper-abstract-background-free-image.jpeg?w=600&quality=80');
  background-size: cover;
`;

function Login({ onLogin, onShowSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [showReset, setShowReset] = useState(false); 
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      alert("Login Successful!");
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      if (onLogin) onLogin();
    } else {
      alert("Invalid email or password");
    }
  };

  const handleForgotPassword = () => {
    const user = users.find((u) => u.email === email);
    if (user) {
      setShowReset(true); 
    } else {
      alert("No account found with that email.");
    }
  };

  const handleResetPassword = () => {
    if (!newPassword || newPassword.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const updatedUsers = users.map((u) =>
      u.email === email ? { ...u, password: newPassword } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    alert("Password reset successful! You can now log in.");
    setShowReset(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <FormContainer>
      <h2><b>Login</b></h2>
      {!showReset ? (
        <>
          <StyledForm onSubmit={handleSubmit}>
            <Label>
              Email: <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Label>
            
            <Label>
              Password: <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Label>
            
            <Button type="submit">Login</Button>
          </StyledForm>
          
          <p>
            <SmlButton type="button" onClick={handleForgotPassword}>
              Forgot Password?
            </SmlButton>
          </p>

          <p>
              New here?{" "}
            <SmlButton type="button" onClick={onShowSignup}>Sign Up</SmlButton>
          </p>
        </>
      ) : (
        <>
          <h3>Reset Password</h3>
          <Label>
            New Password: <Input  type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </Label>

          <Label>
             Confirm Password: <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </Label>

          <Button onClick={handleResetPassword}>Save New Password</Button>
          <p>
            <SmlButton type="button" onClick={() => setShowReset(false)}>Cancel</SmlButton>
          </p>
        </>
      )}
    </FormContainer>
  );
}

export default Login;
