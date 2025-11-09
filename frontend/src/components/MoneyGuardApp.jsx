import { lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import FallBackSpinner from './FallBackSpinner';

const AllinOne = lazy(() => import('./TabletDesktopDesign/AllinOne'));//desktop
const SharedLayout = lazy(() => import('./SharedLayout'));
const Home = lazy(() => import('../pages/Home'));
const NewCard = lazy(() => import('../pages/NewCard'));
const Currency = lazy(() => import('../pages/Currency'));
const ExpensesStatistics = lazy(() => import('../pages/ExpensesStatistics'));
const NewCoin = lazy(() => import('./NewCoin'));

const useIsMobile = (breakPoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakPoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakPoint);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakPoint]);

  return isMobile;
};//as putea intelege mai bine

function usePreviousWindowWidth(value) {
  const prevIsMobileState = useRef();
  useEffect(() => { prevIsMobileState.current = value }, [value]);
  return prevIsMobileState.current
}

const MoneyGuardApp = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const prevIsMobileState = usePreviousWindowWidth(isMobile);
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


  useEffect(()=>{if(prevIsMobileState !== isMobile){navigate("/")}},[isMobile,prevIsMobileState,navigate])



  useEffect(
    () => localStorage.setItem('listCards', JSON.stringify(isArr)),
    [isArr]
  );

  const handleDeleteCard = idCardForDel => {
    const modifiedIsArr = isArr.filter(card => card.idFrontend !== idCardForDel);
    setIsArr(modifiedIsArr);
  };
  const handleInfoAllCards = list => setIsArr(list)


  const MobileRoutes = () => (
    <Routes>

      <Route path="/" element={<SharedLayout />}>
        <Route
          index
          element={<Home info={isArr} handleDeleteCard={handleDeleteCard} />}
        />
        <Route path="newCard" element={<NewCard info={isArr} handleInfoAllCards={handleInfoAllCards} />} />
        <Route path="newCard/:id" element={<NewCard info={isArr} handleInfoAllCards={handleInfoAllCards}/>} />
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
            handleInfoAllCards={handleInfoAllCards}
            handleDeleteCard={handleDeleteCard}
            origin="/all"//as putea intelege mai bine
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


