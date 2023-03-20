import React, { useState } from 'react'
import { Button, Container, Navbar } from 'react-bootstrap';

const AddCategory = ({ onNewCategory }) => {

  const [inputValue, setInputValue] = useState('')

  const onInputChange = ({ target }) => {
    setInputValue(target.value)
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim().length <= 1) return;

    // setCategories(categories => [inputValue, ...categories])
    onNewCategory(inputValue.trim())
    // setInputValue('')
  }



  return (
    <Navbar bg="light" expand="lg" className="sticky-top">
      <Container fluid>
        <Navbar.Brand href="#">Buscar por país</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">

          <form className='row ' onSubmit={(event) => onSubmit(event)}>
            <div className="col">
              <input
                className='form-control'
                type='text'
                placeholder='Nombre del país'
                value={inputValue}
                onChange={onInputChange}
              />
            </div>

            <div className="col">
              <Button variant="primary" type="button" onClick={onSubmit} >Buscar</Button>
            </div>


          </form>
        </Navbar.Collapse>
      </Container>
    </Navbar>




  )
}

export default AddCategory