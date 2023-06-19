import { useEffect } from 'react';
import './App.scss';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from 'components/Home/Home';
import Header from 'components/Header/Header';
import Notification from 'components/Notification/Notification';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'state_management/hooks';
import { getAllAsteroids } from 'state_management/actions/asteroids/asteroids.actions';
import Detail from 'components/Detail/Detail';
import SignUp from 'components/SignUp/SignUp';
import { storeAccessToken, storeRefreshToken, storeUserProfile } from 'utils/storage.util';
import Login from 'components/Login/Login';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { asteroidsList } = useAppSelector((state) => state.asteroids);
  const { open, message } = useSelector((state: any) => state.notification);
  const { accessToken, token } = useAppSelector(state => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllAsteroids())
  }, []);

  useEffect(() => {
    if (!!accessToken && !!token) {
      storeAccessToken(accessToken);
      storeRefreshToken(token);
      const tokenPayload = window.atob(accessToken.split('.')[1] || '');
      storeUserProfile(tokenPayload);
      navigate('/');
    }
  }, [accessToken, token]);

  return (
    <>
      <Header logo="/logo.svg" />
      <Routes>
        <Route index element={<Home asteroids={asteroidsList} />} />
        <Route path="/:id" element={<Detail />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Notification open={open} message={message} />
    </>
  );
};

export default App;
