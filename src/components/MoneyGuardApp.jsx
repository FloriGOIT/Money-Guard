import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const SharedLayout = lazy(() => import('./SharedLayout'));
const Home = lazy(()=>(import("../pages/Home")))
const Logout = lazy(()=>(import("../pages/Logout")))
const MoneyGuardApp = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/logout" element={<Logout />}/>
      </Route>
    </Routes>
  );
};

export default MoneyGuardApp;
