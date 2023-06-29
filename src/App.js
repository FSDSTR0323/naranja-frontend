import './App.css';
import FormExpense from './Components/Expenses/index';
import FormIncomes from './Components/Incomes/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewTransactions from './Components/ViewTransactions/index';
import Dashboard from './Components/Dashboard/index';
import Login from './Components/Security/Login';
import Profile from './Components/Profile/index'
import Register from './Components/Security/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFoundPage from './Components/NotFoundPage/NotFoundPage';
import PrivateRoute from './Components/PrivateRoute';
import HomeRoute from './Components/HomeRoute';


function App() {

  return (
    <div id='general__container'>
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<HomeRoute><Login/></HomeRoute>}index={true} />
        <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
        <Route path="/register" element={<HomeRoute><Register/></HomeRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
        <Route path="/expenses" element={<PrivateRoute><FormExpense/></PrivateRoute>} />
        <Route path="/incomes" element={<PrivateRoute><FormIncomes/></PrivateRoute>} />
        <Route path="/viewTransactions" element={<PrivateRoute><ViewTransactions/></PrivateRoute>}/>
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  </div>
  
  );
}

export default App;
