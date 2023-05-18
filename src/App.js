import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import TableComponent from './components/TableComponent';
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' exact element={<LoginPage />} />
        <Route path='/main' element={<TableComponent />} />
      </Routes>
    </div>
  );
}

export default App;
