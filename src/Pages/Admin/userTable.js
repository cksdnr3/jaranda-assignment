import React, { useState } from 'react';
import styled from 'styled-components/macro';

import PageButton from 'Pages/Admin/pageButton';
import UserModal from './userModal';
import { ROLE } from 'constant/role';
import { cardNumberFormat } from 'utils/format';

const Container = styled.div`
  position: relative;
  margin-top: 30px;
  padding: 30px;
  width: 795px;
  font-weight: 400;
  background-color: white;
  color: #4a4a4a;

  button {
    border: none;
  }
`;

const Total = styled.div`
  margin-bottom: 35px;
  font-size: 17px;
  font-weight: bold;
  color: #252529;

  span {
    color: #1685fd;
  }
`;

const Td = styled.td`
  padding: 20px 30px 20px 0px;
  max-width: 150px;
  min-width: 90px;
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AdminTd = styled.td`
  padding: 20px 30px 20px 0px;
  font-weight: 600;
`;

const Table = styled.table`
  margin-bottom: 45px;
`;
const THead = styled.thead`
  margin: 8px 0px;
  tr {
    color: #9a9a9a;
  }
`;
const TBody = styled.tbody``;

const ModifyBtn = styled.td`
  position: absolute;
  right: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 10px;
  margin-top: 8px;
  border: 1px solid #e3e3e3;
  border-radius: 5px;
  background-color: #fafafa;
  cursor: pointer;
  color: #7e7e7e;

  img {
    width: 18px;
    margin-right: 5px;
  }
`;

const User = ({ user, onClickhandler }) => {
  const { id, userName, address, cardNumber, role, isAdmin } = user;
  return (
    <tr>
      <Td>{id}</Td>
      <Td>{userName || userName.value}</Td>
      <Td>{address}</Td>
      <Td>{cardNumberFormat(cardNumber)}</Td>
      <Td>{ROLE[role]}</Td>
      <AdminTd>{isAdmin ? '관리자' : ''}</AdminTd>
      <ModifyBtn onClick={onClickhandler}>
        <img src="images/edit-alt.svg" alt="아이콘" />
        수정
      </ModifyBtn>
    </tr>
  );
};

const UserTable = ({ userList, setUserList, page, setPage, pageable }) => {
  const [isModal, setIsModal] = useState(false);
  const [modalId, setModalId] = useState(0);
  const { content, ...props } = pageable;

  const openModal = id => {
    console.log(id);
    setIsModal(true);
    setModalId(id);
  };

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  console.log(content);

  return (
    <Container>
      <Total>
        전체 사용자 <span>{userList.length}</span>명
      </Total>
      <Table>
        <THead>
          <tr>
            <Td>No</Td>
            <Td>아이디</Td>
            <Td>주소</Td>
            <Td>카드번호</Td>
            <Td>권한</Td>
            {/* <Td>admin</Td> */}
          </tr>
        </THead>
        <TBody>
          {content.map((user, idx) => (
            <User
              key={idx}
              user={user}
              onClickhandler={() => openModal(user.id)}
            />
            // {userList.map((user, idx) => (
            //   <User
            //     key={idx}
            //     user={user}
            //     onClickhandler={() => openModal(user.id)}
            //   />
          ))}
        </TBody>
      </Table>
      <PageButton {...props} setPage={setPage} page={page} size={5} />
      {isModal && (
        <UserModal
          show={isModal}
          user={userList.find(v => v.id === modalId)}
          toggleModal={toggleModal}
          setUserList={setUserList}
        />
      )}
    </Container>
  );
};

export default UserTable;
