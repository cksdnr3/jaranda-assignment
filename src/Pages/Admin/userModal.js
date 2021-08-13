import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { ROLE } from 'constant/role';
import userImage from 'asset/user.png';
import Modal from 'Components/modal';
import Button from 'Components/button';
import SelectRole from 'Components/selectRole';
import { cardNumberFormat } from 'utils/format';
import { userListStorage } from 'store';

const ImageWrapper = styled.div`
  margin-bottom: 30px;
`;
const Container = styled.div`
  position: relative;
  padding: 0px 30px;
  margin: 20px 0px 60px 0px;
  color: #4a4a4a;
`;
const UserAvatar = styled.img`
  height: 100px;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  margin-bottom: 20px;
  line-height: 1.45;
  word-break: keep-all;
`;
const UserName = styled.div`
  font-size: 30px;
  font-weight: 500;
  text-align: left;
  margin-bottom: 30px;
  color: #252529;
`;
const Label = styled.div`
  margin-right: 10px;
  width: 70px;
  font-size: 15px;
  font-weight: 400;
  color: #9a9a9a;
`;
const Footer = styled.div`
  button {
    position: absolute;
    right: 30px;
    bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 20px;
    height: 40px;
    font-size: 18px;
    font-weight: 500;
    background-color: #1685fd;
    color: white;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
  img {
    width: 18px;
    margin-right: 5px;
  }
`;
const CloseImg = styled.img`
  width: 16px;
  height: 16px;

  position: absolute;
  right: 30px;
  top: 30px;

  cursor: pointer;
`;
const UserModal = ({ show, toggleModal, user, setUserList }) => {
  const [userState, setUserState] = useState(user);
  useEffect(() => {
    setUserState(user);
    console.log(user);
  }, [user]);
  const toggleIsAdmin = () => {
    setUserState({ ...userState, isAdmin: !userState.isAdmin });
  };
  const setRoleId = value => {
    setUserState({ ...userState, role: parseInt(value, 10) });
  };
  const changeUserData = () => {
    userListStorage.push(userState);
    console.log(userState)
    setUserList(prev => prev.map(v => (v.id === userState.id ? userState : v)));
    let changeData = '';
    if (userState.role !== user.role) {
      changeData += `권한이 ${ROLE[userState.role]}로 바뀌었습니다.`;
    }
    if (userState.isAdmin !== user.isAdmin) {
      changeData += `${changeData ? '\n' : ''}`;
      changeData += `관리자${
        userState.isAdmin ? '로 설정' : '에서 해제'
      }되었습니다`;
    }
    const noChangeMsg = '변경사항이 없습니다.';
    const alertCheck = alert(changeData || noChangeMsg);
    console.log(alertCheck, userState);
  };

  return (
    <Modal show={show} width="470px" toggle={toggleModal}>
      <Container>
        <ImageWrapper>
          <UserAvatar src={userImage} alt="user" />
        </ImageWrapper>
        <UserName>{userState.userName}</UserName>
        <UserInfo>
          <Label>아이디</Label>
          <span>{userState.id}</span>
        </UserInfo>
        <UserInfo>
          <Label>주소</Label>
          <span>{userState.address}</span>
        </UserInfo>
        <UserInfo>
          <Label>카드번호</Label>
          {cardNumberFormat(userState.cardNumber)}
        </UserInfo>
        <UserInfo>
          <Label>권한</Label>
          <SelectRole
            currentRoleId={userState.role}
            callback={role => setRoleId(role)}
          />
        </UserInfo>
        <UserInfo>
          <Label>관리 권한</Label>
          관리자
          <input
            type="checkbox"
            checked={userState.isAdmin}
            onChange={toggleIsAdmin}
          />
        </UserInfo>
      </Container>
      <Footer>
        <Button Small onClick={changeUserData}>
          <img src="images/edit-alt white.svg" alt="아이콘" />
          수정
        </Button>
      </Footer>
      <CloseImg src="images/close.svg" alt="close" onClick={toggleModal} />
    </Modal>
  );
};

export default React.memo(UserModal);
