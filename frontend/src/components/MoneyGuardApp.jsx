import { lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import FallBackSpinner from './FallBackSpinner';
const AllinOne = lazy(() =>
  import('../components/TabletMobileDesign/AllinOne')
);

const SharedLayout = lazy(() => import('./SharedLayout'));
const Home = lazy(() => import('../pages/Home'));
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

function usePreviousWindowWidth(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const MoneyGuardApp = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const prevIsMobile = usePreviousWindowWidth(isMobile);
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

  useEffect(() => {
    if (prevIsMobile === true && isMobile === false) {
      navigate('/');
    }
  }, [prevIsMobile, isMobile, navigate]);

  useEffect(
    () => localStorage.setItem('listCards', JSON.stringify(isArr)),
    [isArr]
  );

  const handleDeleteCard = idCardForDel => {
    const modifiedIsArr = isArr.filter(card => card.idFrontend !== idCardForDel);
    setIsArr(modifiedIsArr);
  };



  const MobileRoutes = () => (
    <Routes>

      <Route path="/" element={<SharedLayout />}>
        <Route
          index
          element={<Home info={isArr} handleDeleteCard={handleDeleteCard} />}
        />
        <Route path="newCard" element={<NewCard info={isArr} />} />
        <Route path="newCard/:id" element={<NewCard info={isArr} />} />
        <Route
          path="statistics"
          element={<ExpensesStatistics info={isArr} />}
        />
        <Route path="currency" element={<Currency />} />
        <Route path="currency/:name" element={<NewCoin origin="/currency" />} />
        <Route
          path="currency/newCoin"
          element={<NewCoin origin="/currency" />}
        />
      </Route>
    </Routes>
  );

  const DesktopRoutes = () => (
    <Routes>
      <Route
        path="/"
        element={
          <AllinOne
            info={isArr}
            handleDeleteCard={handleDeleteCard}
            origin="/all"
          />
        }
      />

    </Routes>
  );

  return (
    <>
      <Suspense fallback={<FallBackSpinner />}>
        {isMobile ? <MobileRoutes /> : <DesktopRoutes />}
      </Suspense>
    </>
  );
};

export default MoneyGuardApp;


