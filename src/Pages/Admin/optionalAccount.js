import Modal from 'Components/modal';
import SelectRole from 'Components/selectRole';
import useInput from 'hooks/useInput';
import React, { useEffect, useState } from 'react';
import { userListStorage } from 'store';

import styled from 'styled-components/macro';

const OptionalAccountWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 864px;
  margin: auto;
`;
const OptionalAccountContainer = styled.div`
  max-width: 480px;
  margin: 35px 0;
  padding: 0 15px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 35px;
  line-height: 1;
  font-size: 25px;
  font-weight: 800;
  color: #252529;
`;

const InputContainer = styled.div`
  width: 350px;
  margin-bottom: 35px;
  input {
    display: block;
    height: 45px;
    width: 100%;
    margin-bottom: 15px;
    padding: 0 15px;
    border: 1px solid rgba(154, 154, 154, 0.5);
    border-radius: 2px;
    background-color: #ffffff;
    font-size: 15px;
  }

  input::placeholder {
    font-size: 15px;
  }
`;

const SubmitButton = styled.button`
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  overflow: visible;
  cursor: pointer;

  height: 45px;
  font-size: 18px;
  border-radius: 3px;
  background-color: #0085fd;
  color: #fff;
  text-align: center;
  line-height: 2;
  width: 100%;
`;

const CloseImg = styled.img`
  width: 16px;
  height: 16px;

  position: absolute;
  right: 30px;
  top: 30px;

  cursor: pointer;
`;

const Input = styled.input``;

const OptionalAccount = ({ lastId, setUserList, show, toggle }) => {
  const userName = useInput('');
  const password = useInput('');
  const name = useInput('');
  const [role, setRole] = useState(0);
  const onSubmit = () => {
    const newAccount = {
      id: lastId,
      userName: userName.value,
      address: '',
      cardNumber: '',
      password: password.value,
      role: parseInt(role),
      isAdmin: 0,
    };

    toggle();
    userListStorage.push(newAccount);
    setUserList(prev => [...prev, newAccount]);

    return alert('계정이 생성되었습니다.');
  };

  useEffect(() => {
    userName.setValue('');
    password.setValue('');
    name.setValue('');
  }, [show]);

  return (
    <Modal show={show} width="420px" height="470px" toggle={toggle}>
      <OptionalAccountWrap>
        <OptionalAccountContainer>
          <CloseImg src="images/close.svg" alt="close" onClick={toggle} />
          <Header>사용자 추가</Header>
          <form
            onSubmit={e => {
              onSubmit(e);
              e.preventDefault();
            }}
          >
            <InputContainer>
              <Input required {...name} placeholder="이름" />
              <Input required {...userName} type="id" placeholder="아이디" />
              <Input required {...password} placeholder="비밀번호" />
              <SelectRole required currentRoleId={role} callback={setRole} />
            </InputContainer>
            <SubmitButton type="submit">사용자 추가하기</SubmitButton>
          </form>
        </OptionalAccountContainer>
      </OptionalAccountWrap>
    </Modal>
  );
};

export default OptionalAccount;
