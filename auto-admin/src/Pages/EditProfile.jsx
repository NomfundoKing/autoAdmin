import { useState } from 'react';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import FormContainer from '../components/UI/FormContainer';
import styled from 'styled-components';
import Label from './../components/UI/Label';

const FormContainerStyled = styled(FormContainer)`

  max-width: 500px;  
  margin: 50px auto;
  text align: center;
  background:conic-gradient(from '#006400', '#228B22', '#32CD32', '#90EE90','#ADD8E6', '#4682B4', '#191970' );
   background-image: url('/new3.jpg'); 
`;

function EditProfile({ user, onSave }) {
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password || "");
  const [confirmPassword, setConfirmPassword] = useState(user.password || "");

  const handleSave = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const updatedUser = { ...user, firstname, lastname, email, password };
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    onSave(updatedUser);
  };


  return (
    <FormContainerStyled>
      <FormContainer>
      <h2>Edit Profile</h2>
      <Label >First Name: <Input value={firstname} onChange={(e) => setFirstname(e.target.value)} /></Label>
      <Label>Last Name: <Input value={lastname} onChange={(e) => setLastname(e.target.value)} /></Label>
      <Label>Email: <Input value={email} onChange={(e) => setEmail(e.target.value)} /></Label>
      <Label>Password: <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></Label>
      <Label>Confirm Password: <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></Label>
      <Button onClick={handleSave}>Save</Button>
    </FormContainer>
    </FormContainerStyled>
    
  );
}

export default EditProfile;
