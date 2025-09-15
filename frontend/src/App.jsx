import { BrowserRouter } from 'react-router-dom';
import MoneyGuardApp from '../src/components/MoneyGuardApp';

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
