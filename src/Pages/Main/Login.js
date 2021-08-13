import { userListStorage } from 'store'

export default function Login({ userName, password }) {
  const user = userListStorage.load().find(
    user => user.userName === userName && user.password === password
  );
  return user;
} 