import React from 'react';
import Profile from '../Profile/Profile';



export default function Home({user, onLogout, onEditProfile}) {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Welcome to Your Dashboard</h1>
      <Profile onLogout={onLogout} />
      <h2>Welcome, {user.firstname}!</h2>

    </div>
  );
}

