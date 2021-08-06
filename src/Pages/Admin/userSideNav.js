import React from 'react';
import styled, { css } from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  width: 155px;
  margin-right: 35px;
`;

const ClickedBtn = styled.button`
  padding: 20px 15px 15px 30px;
  width: 100%;
  font-size: 15px;
  text-align: left;
  background-color: #f5faff;
  color: #1685fd;
  font-weight: 600;
  border-bottom: 1px solid #1685fd;

  ${props =>
    !props.isChosen &&
    css`
      color: #4a4a4a;
      border-bottom: 1px solid #f8f8f8;
      background-color: white;

      &:hover {
        background-color: #f5faff;
        color: #1685fd;
        font-weight: 600;
        border-bottom: 1px solid #1685fd;
      }
    `}
`;

function UserSideNav({ onClickFilter, filterNumber, USER_FILTER }) {
  return (
    <Container>
      {USER_FILTER.map((filter, index) => (
        <ClickedBtn
          key={index}
          isChosen={filter?.role === filterNumber}
          onClick={() => {
            console.log(filter.role);
            onClickFilter(filter?.role);
          }}
        >
          {filter?.title}
        </ClickedBtn>
      ))}
    </Container>
  );
}

export default UserSideNav;
