import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import '../Menu/style.css'



const Menu = ({active, setActive}) => {

  const handleExpenseClick = () => {
    setActive(true);
  };

  return (
    
   <>
   
   <div className='d-flexMenu'>
   <Navbar className='menu' bg='light' variant='light' expand="sm" fixed="top">
    <Container>
      <Navbar.Brand>Orange Tracker</Navbar.Brand>
      <Nav className='me-auto'>
          <Nav.Link id='1' className={active === 1 ? 'active': ''} onClick={() => setActive(1)} >Dashboard</Nav.Link> 
          <Nav.Link id='2' className={active === 2 ? 'active': ''} onClick={() => setActive(2)}>Expenses</Nav.Link>
          <Nav.Link id='3' className={active === 3 ? 'active': ''} onClick={() => setActive(3)} >Incomes</Nav.Link>
          <Nav.Link id='4' className={active === 4 ? 'active': ''} onClick={() => setActive(4)}>View Transactions</Nav.Link>
      </Nav>
    </Container>
   </Navbar>
   </div>
   </>
  )
}

export default Menu
