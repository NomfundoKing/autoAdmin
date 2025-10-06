import { useEffect, useState } from "react";
import styled from 'styled-components';
import Card from '../UI/Card';
import Details from './Details';
import Button from '../UI/Button';

const ProfileContainer = styled(Card)`
  max-width: 600px;
  margin: 20px auto;
  background: repeating-radial-gradient(ellipse,#c50909,#262628 20%);
  color: white;
  background-image: url('/20215.jpg'); 
`;


const EditButton = styled.button`
  padding: 10px 20px;
  background: #70252dff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #70252dff;
  }
`;

function Profile({ user, onLogout, onEditProfile }) {
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) setCurrentUser(storedUser);
  }, []);

  if (!currentUser) return <p>No user logged in.</p>;

  return (
    <ProfileContainer>
      <h2>Welcome, {currentUser.firstname} {currentUser.lastname}!</h2>
      <Details user={currentUser} />

      <Button onClick={onLogout}>Logout</Button>
      <EditButton onClick={onEditProfile}>Edit Profile</EditButton>
    </ProfileContainer>
  );
}

export default Profile;
