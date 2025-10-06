import React from 'react';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  padding: 20px 0;
`;

const DetailItem = styled.div`
  margin: 15px 0;
  font-size: 16px;
`;

const Label = styled.strong`
  color: #e7dfdfff;
  margin-right: 10px;
`;

export default function Details({ user }) {
  return (
    <DetailsContainer>
      <DetailItem><Label>First Name:</Label> {user.firstname}</DetailItem>
      <DetailItem><Label>Last Name:</Label> {user.lastname}</DetailItem>
      <DetailItem><Label>Email:</Label> {user.email}</DetailItem>
    </DetailsContainer>
  );
}