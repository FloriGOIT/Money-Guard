import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FallBackSpinner from './FallBackSpinner';
const AllinOne = lazy(() =>
  import('../components/TabletMobileDesign/AllinOne')
);
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const SharedLayout = lazy(() => import('./SharedLayout'));
const Home = lazy(() => import('../pages/Home'));
const Logout = lazy(() => import('../pages/Logout'));
const NewCard = lazy(() => import('../pages/NewCard'));
const Currency = lazy(() => import('../pages/Currency'));
const ExpensesStatistics = lazy(() => import('../pages/ExpensesStatistics'));
const NewCoin = lazy(() => import('./NewCoin'));
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

const MoneyGuardApp = () => {
  const isMobile = useIsMobile();
  let localDataCardsParsed = [];
  try {
    localDataCardsParsed = JSON.parse(localStorage.getItem('listCards')) || [];
  } catch {
    localDataCardsParsed = [];
  }
  const localDataCards = localDataCardsParsed.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const [isArr, setIsArr] = useState(localDataCards);

  useEffect(
    () => localStorage.setItem('listCards', JSON.stringify(isArr)),
    [isArr]
  );

  const handleDeleteCard = idCardForDel => {
    const modifiedIsArr = isArr.filter(card => card.id !== idCardForDel);
    setIsArr(modifiedIsArr);
  };
  return (
    <>
      {isMobile ? (
        <Suspense fallback={<FallBackSpinner />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<SharedLayout />}>
              <Route
                index
                element={
                  <Home info={isArr} handleDeleteCard={handleDeleteCard} />
                }
              />
              <Route path="logout" element={<Logout />} />
              <Route path="newCard" element={<NewCard info={isArr} />} />
              <Route path="newCard/:id" element={<NewCard info={isArr} />} />
              <Route
                path="statistics"
                element={<ExpensesStatistics info={isArr} />}
              />
              <Route path="currency" element={<Currency />} />
              <Route
                path="currency/:name"
                element={<NewCoin origin="/currency" />}
              />
              <Route
                path="currency/newCoin"
                element={<NewCoin origin="/currency" />}
              />  
            </Route>
          </Routes>
        </Suspense>
      ) : (
        <Suspense fallback={<FallBackSpinner />}>
          <AllinOne
            info={isArr}
            handleDeleteCard={handleDeleteCard}
            origin="/all"
          />
        </Suspense>
      )}
    </>
  );
};

export default MoneyGuardApp;

/*
            <Route
              path="/all"
              element={
                <AllinOne
                  info={isArr}
                  handleDeleteCard={handleDeleteCard}
                  origin="/all"
                />
              }
            />
*/
