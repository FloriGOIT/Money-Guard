
import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Login = lazy(() => (import("../pages/Login")));
const Register = lazy(()=> (import("../pages/Register")))

const MoneyGuardApp = () => {
  return (
    <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

    </Routes>
  );
};

export default MoneyGuardApp;
