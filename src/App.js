import { useState } from 'react';
import './App.css';
import FormExpense from './Components/Expenses/index';
import FormIncomes from './Components/Incomes';
import Menu from './Components/Menu';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewTransactions from './Components/ViewTransactions';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Register from './Components/Login/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './Components/NotFoundPage/NotFoundPage';


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<FormExpense/>} />
        <Route path="/incomes" element={<FormIncomes />} />
        <Route path="/viewTransactions" element={<ViewTransactions />}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
