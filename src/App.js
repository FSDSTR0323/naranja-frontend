import './App.css';
import FormExpense from './Components/Expenses/index';
import FormIncomes from './Components/Incomes/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewTransactions from './Components/ViewTransactions/index';
import Dashboard from './Components/Dashboard/index';
import Login from './Components/Security/Login';
import Register from './Components/Security/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './Components/NotFoundPage/NotFoundPage';


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<FormExpense/>} />
        <Route path="/incomes" element={<FormIncomes/>} />
        <Route path="/viewTransactions" element={<ViewTransactions/>}/>
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  </>
  
  );
}

export default App;
