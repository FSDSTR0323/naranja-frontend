import React from 'react'
import Menu from '../Menu'
import '../Dashboard/Dashboard.css'
import LinesChart from './Chart/Chart'
import History from './History/History'

const Dashboard = () => {


  return (
    <>
      <Menu/>
      <div className='dashboard__container'>
      <h1>All transactions</h1>
      <div className='history__container'>
          <History/>
        </div>
        <div className='chart__container'><LinesChart/></div>
        <div className='amount__container'>
          <div className='total__incomes'>
            <h2>Total Incomes</h2>
            {/* <p>{dollar} {totalIncome()}</p> */}
          </div>

          <div className='total__expenses'>
            <h2>Total Expenses</h2>
            {/* <p>{dollar} {totalExpense()}</p> */}
          </div>

          <div className='total__balance'>
            <h2>Total Balance</h2>
            {/* <p>{dollar} {totalBalance()}</p> */}
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Dashboard
