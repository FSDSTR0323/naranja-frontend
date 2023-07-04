import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../Menu/Menu.css'
import { NavLink } from 'react-router-dom';

    // Logout
    const logout = () => {
      localStorage.removeItem('token')
  }

const Menu = () => {

  return (
  
  <div className='menu__container'>
        <div className='img__profile'>
          <NavLink className='routes' to='/profile'>
            <img id='user__avatar' 
            className='routes' to='/profile'
            src='https://cdn1.iconfinder.com/data/icons/vibrancie-action/30/action_081-account-user-profile-avatar-512.png' 
            alt='Bootstrap 5'/>
          </NavLink>
        </div>
        <div id='title__app'>
          <h3> <NavLink className='route__title' to='/dashboard'>Orange Tracker</NavLink></h3>
        </div>
        <div id='routes__menu'>
          <NavLink className='routes' to='/dashboard'>Dashboard</NavLink> 
          <NavLink className='routes' to='/expenses'>Expenses</NavLink> 
          <NavLink className='routes' to='/incomes'>Incomes</NavLink> 
          <NavLink className='routes' to='/viewTransactions'>View Transactions</NavLink> 
          <NavLink id='sign__out' className='routes' to='/' onClick={logout}>Sign Out</NavLink> 
        </div>
   

  </div>
  )
}

export default Menu
