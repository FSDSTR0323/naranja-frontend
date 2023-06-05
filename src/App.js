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


function App() {
  const [active, setActive] = useState(0)

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />
      case 2:
        return <FormExpense />
      case 3:
        return <FormIncomes />
      case 4: 
        return <ViewTransactions />
      default: 
        return <Dashboard />
    }
  }

  return (
    <div className="App">
      <Menu active={active}  setActive={setActive}/> 
      {displayData()}
      <div login__container> 
      <Register />
      <Login />
      </div>
      
    </div>
  );
}

export default App;
