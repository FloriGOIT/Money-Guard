import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState,useEffect } from 'react';

const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const SharedLayout = lazy(() => import('./SharedLayout'));
const Home = lazy(()=>(import("../pages/Home")))
const Logout = lazy(() => (import("../pages/Logout")))
const NewCard = lazy(() => (import("../pages/NewCard")))

const MoneyGuardApp = () => {
  const [isArr, setIsArr] = useState([])


  useEffect(()=>{    const localDataCardsNotParsed = localStorage.getItem("listCards")
  const localDataCardsParsed = JSON.parse(localDataCardsNotParsed);
    setIsArr(localDataCardsParsed)
  }, [])


  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home info={isArr} />} />
                <Route path="/logout" element={<Logout />} />
        <Route path="/newCard" element={<NewCard info={isArr}/>} />
      </Route>
    </Routes>
  );
};

export default MoneyGuardApp;
