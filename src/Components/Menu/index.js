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
      <Navbar className='menu'>
        <div className='img__profile'>
          <NavLink className='routes' to='/profile'>
            <img id='user__avatar' 
            className='routes' to='/profile'
            src='https://cdn1.iconfinder.com/data/icons/vibrancie-action/30/action_081-account-user-profile-avatar-512.png' 
            alt='Bootstrap 5'/>
          </NavLink>
        </div>
        <Navbar.Brand  as='h1' id='title__app'> <NavLink className='route__title' to='/dashboard'>Orange Tracker</NavLink></Navbar.Brand>
      <Nav>
        <NavLink className='routes' to='/dashboard'>Dashboard</NavLink> 
        <NavLink className='routes' to='/expenses'>Expenses</NavLink> 
        <NavLink className='routes' to='/incomes'>Incomes</NavLink> 
        <NavLink className='routes' to='/viewTransactions'>View Transactions</NavLink> 
        <NavLink className='routes' to='/' onClick={logout}>Sing Out</NavLink> 
      </Nav>
      </Navbar>
  </div>
  )
}

export default Menu
