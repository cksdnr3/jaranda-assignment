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
    !props.selected &&
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

function UserSideNav({ ROLES, setValue, clickFilterListener, selected }) {
  return (
    <Container>
      {ROLES.map((filter) => (
        <ClickedBtn
          key={filter.role}
          data-name={filter.role}
          selected={selected.includes(filter.role)}
          onClick={(e) => {
            clickFilterListener(e, "role");
            setValue('');
          }}
        >
          {filter?.title}
        </ClickedBtn>
      ))}
    </Container>
  );
}

export default UserSideNav;
