import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const SharedLayout = lazy(() => import('./SharedLayout'));
const Home = lazy(() => import('../pages/Home'));
const Logout = lazy(() => import('../pages/Logout'));
const NewCard = lazy(() => import('../pages/NewCard'));
const Currency = lazy(() => import('../pages/Currency'));
const ExpensesStatistics = lazy(() => import('../pages/ExpensesStatistics'));
const NewCoin = lazy(() => import("./NewCoin"));


const MoneyGuardApp = () => {
  const localDataCardsNotParsed = localStorage.getItem('listCards') || '[]';
  const localDataCardsParsed = JSON.parse(localDataCardsNotParsed);
  const [isArr, setIsArr] = useState(localDataCardsParsed);

  useEffect(
    () => localStorage.setItem('listCards', JSON.stringify(isArr)),
    [isArr]
  );

  const handleDeleteCard = idCardForDel => {
    const nmodifiedIsArr = isArr.filter(card => card.id !== idCardForDel);
    setIsArr(nmodifiedIsArr);
  };
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<SharedLayout />}>
        <Route
          index
          element={<Home info={isArr} handleDeleteCard={handleDeleteCard} />}
        />
        <Route path="/logout" element={<Logout />} />
        <Route path="/newCard" element={<NewCard info={isArr} />} />
        <Route path="/newCard/:id" element={<NewCard info={isArr} />} />
        <Route path="/statistics" element={<ExpensesStatistics info={isArr} />} />
        <Route path="/currency" element={<Currency />} />
        <Route path="/currency/:name" element={<NewCoin/>} />
        <Route path="/currency/newCoin" element={<NewCoin/>} />
      </Route>
    </Routes>
  );
};

export default MoneyGuardApp;
