import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import UserTable from './userTable';
import OptionalAccount from './optionalAccount';
import userListData from 'store/userList';
import useInput from 'hooks/useInput';
import UserSideNav from './userSideNav';
import { userStorage } from 'store';
import Error from 'Pages/Error/Error';

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

  const [filterNumber, setFilterNumber] = useState(0);

  const [userList, setUserList] = useState(users);
  const [isModal, setIsModal] = useState(false);

  const [page, setPage] = useState(0);
  const [limit] = useState(5);
  const search = useInput('');

  const [pageable, setPageable] = useState(
    userListData.findAllByUsername(page, limit),
  );

  const toggleModal = () => {
    setIsModal(prev => !prev);
  };

  const onClickFilter = role => {
    setFilterNumber(role);
  };

  useEffect(() => {
    const { value } = search;
    console.log('enter');

    setPageable(
      userListData.findAllByUsername(page, limit, value, filterNumber),
    );
  }, [page, userList]);

  useEffect(() => {
    console.log('serach enter');
    const { value } = search;

    setPageable(
      userListData.findAllByUsername(page, limit, value, filterNumber),
    );
    setPage(0);
  }, [search.value, filterNumber]);

  useEffect(() => {
    const { setValue } = search;
    setValue('');
  }, [filterNumber]);

  const findLastId = () => {
    return Math.max(...userList.map(v => v.id));
  };

  console.log(pageable);

  return (
    <>
      {!user || !user.isAdmin ? (
        <Error />
      ) : (
        <Container>
          <AdminWrap>
            <Title>사용자 관리</Title>
            <Wrapper>
              <UserSideNav
                filterNumber={filterNumber}
                onClickFilter={onClickFilter}
                USER_FILTER={USER_FILTER}
              />

              <div>
                <Search>
                  <Input placeholder="전체 사용자 검색" {...search} />
                  <button onClick={toggleModal}>
                    <img src="images/user-add.svg" alt="추가" />
                    사용자 추가
                  </button>
                  {/* <Link to={}>1페이지</Link> */}
                </Search>
                <UserTable
                  pageable={pageable}
                  setPage={setPage}
                  page={page}
                  setUserList={setUserList}
                  userList={userList}
                />
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
      )}
    </>
  );
}

export default Admin;

const USER_FILTER = [
  { title: '일반 사용자', role: 0 },
  { title: '프론트엔드', role: 11 },
  { title: '백엔드', role: 12 },
  { title: '서버', role: 13 },
  { title: '고객지원', role: 21 },
  { title: '인사관리', role: 22 },
];
