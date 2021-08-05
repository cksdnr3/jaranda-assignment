import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import UserTable from './userTable';
import OptionalAccount from './optionalAccount';
import userListData from 'store/userList';
import useInput from 'hooks/useInput';
import UserSideNav from './userSideNav';
import { userStorage } from 'store';
// import Error from 'Pages/Error/Error';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #f8f8f8;
  padding-bottom: 150px;
`;

const AdminWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Title = styled.h1`
  margin: 50px 0px 30px 0px;
  width: 985px;
  font-size: 28px;
  font-weight: 800;
  color: #252529;
`;

const Search = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  input {
    position: relative;
    padding-left: 75px;
    margin-right: 25px;
    font-size: 17px;
    width: 595px;
    height: 55px;
    border-radius: 5px;
    background-color: white;
    background-image: url('images/search.svg');
    background-position: 30px 50%;
    background-repeat: no-repeat;
  }

  input::placeholder {
    font-size: 17px;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 30px;
    height: 55px;
    font-size: 18px;
    font-weight: 500;
    background-color: #1685fd;
    color: white;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    white-space: nowrap;
  }

  img {
    margin-right: 10px;
  }
`;

const Input = styled.input``;

function Admin() {
  const [users] = useState(userListData.load());
  const [user] = useState(userStorage.load());
  const [filterNumber, setFilterNumber] = useState(100);
  // const [input, setInput] = useState('');

  const [userList, setUserList] = useState(users);
  const [isModal, setIsModal] = useState(false);

  const search = useInput('');

  const toggleModal = () => {
    setIsModal(prev => !prev);
  };

  const onClickFilter = role => {
    setFilterNumber(role);
  };

  console.log(user);

  useEffect(() => {
    const { value } = search;
    let filteredList = [...users];

    if (value !== '' && filterNumber === 100) {
      filteredList = filteredList.filter(el =>
        el.userName.toLowerCase().includes(value.toLowerCase()),
      );
    }
    if (filterNumber !== 100) {
      filteredList = filteredList.filter(
        v =>
          v.role === filterNumber &&
          v.userName.toLowerCase().includes(value.toLowerCase()),
      );
    }
    return setUserList(filteredList);
  }, [search.value, users, filterNumber]);

  const findLastId = () => {
    return Math.max(...users.map(v => v.id));
  };

  // if (!user || !user.isAdmin) {
  //   return <Error />;
  // }

  return (
    <Container>
      <AdminWrap>
        <Title>사용자 관리</Title>
        <Wrapper>
          <UserSideNav
            filterNumber={filterNumber}
            onClickFilter={onClickFilter}
          />
          <div>
            <Search>
              <Input placeholder="전체 사용자 검색" {...search} />
              <button onClick={toggleModal}>
                <img src="images/user-add.svg" alt="추가" />
                사용자 추가
              </button>
            </Search>
            <UserTable setUserList={setUserList} userList={userList} />
          </div>
        </Wrapper>
      </AdminWrap>
      <OptionalAccount
        show={isModal}
        toggle={toggleModal}
        setUserList={setUserList}
        lastId={findLastId() + 1}
      />
    </Container>
  );
}

export default Admin;
