import { BrowserRouter } from 'react-router-dom';
import MoneyGuardApp from './MoneyGuardApp';

const App = () => {
  return (
    <>
      <BrowserRouter basename="/Money-Guard">
        <MoneyGuardApp />
      </BrowserRouter>
    </>
  );
};
export default App;
