import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { oneRegisterUrl, url } from '../helpers/url';
import { useForm } from '../hooks/UseForm';
import { Button, Table, Modal, Container, Navbar, Form, FormControl } from 'react-bootstrap';
import swal from 'sweetalert2';


const ListCountry = () => {
    // BUSCARDOR
    const [filtro, setFiltro] = useState([]);
    const [formValues, handleInputChange] = useForm({
        searchText: ''

    });
    const { searchText } = formValues;

    const handleSearch = (e) => {
        e.preventDefault();
        Buscador(searchText);
    }


    const Buscador = async (searchText) => {
        const input = searchText;
        let filtrar = oneRegisterUrl + input;

        try {
            const resp = await fetch(filtrar);
            const data = await resp.json();
            setFiltro(data);
        } catch (error) {
            swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="">Why do I have this issue?</a>'
            })
        }

    };

    // TRAER DATOS DE LA API------------------------------------
    const [registros, setRegistro] = useState([]);
    const getData = () => {
        axios.get(url)
            .then(response => {
                setRegistro(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }
    // MODAL ---------------------------------------------------------
    const [show, setShow] = useState(false);
    const [modalList, setModalList] = useState({})

    const handleClose = () => setShow(false);

    const handleShow = (name) => {
        setShow(true);
        setModalList(registros.find(registro => registro.name === name))
        // console.log(registros.find(registro => registro.name === name))
    }

    // PAGINACION---------------------------------------------
    const [currentPage, setCurrentPage] = useState(0)
    const pageRegistro = () => {
        return registros.slice(currentPage, currentPage + 20);
    };

    const nextPage = () => {
        setCurrentPage(currentPage + 20);
    };

    const prevPage = () => {
        if (currentPage > 0)
            setCurrentPage(currentPage - 20);
    };

    useEffect(() => {
        if (searchText === '') {
            getData();

        } else {
            Buscador(searchText);
        }
    }, [searchText])

    // console.log(registros)
    return (
        <div className='container centrar'>
            <Navbar bg="light" expand="lg" className="sticky-top">
                <Container fluid>
                    <Navbar.Brand href="#">Buscar por país</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">

                        <Form className="d-flex " onSubmit={handleSearch}>
                            <FormControl
                                type="search"
                                placeholder="Buscar"
                                className="me-2"
                                aria-label="Search"
                                name="searchText"
                                value={searchText}
                                onChange={handleInputChange}
                            />

                            <Button className="btn btn-danger me-2 d-flex buttonPage "
                                onClick={prevPage}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                </svg>&nbsp; Página anterior
                            </Button>

                            <Button className="btb btn-primary buttonPage"
                                onClick={nextPage}
                            >
                                Página siguiente &nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                </svg>
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <h1 className="mt-4">Lista de países</h1>

            {
                (!searchText) ?
                    (
                        <Table className='tabla' bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th><h5>Bandera</h5></th>
                                    <th><h5>País</h5></th>
                                    <th><h5>Continente</h5></th>
                                    <th><h5>Detalles</h5></th>
                                </tr>
                            </thead>

                            <tbody>
                                {pageRegistro().map((item, index) => (
                                    <tr key={index} className='m-3'>
                                        <td> <img src={item.flag} alt="Bandera" width="100" height="100" /></td>
                                        <td> <h5>{item.name}</h5></td>
                                        <td> <h5>{item.region}</h5></td>
                                        <td>
                                            <Button
                                                variant="info"
                                                onClick={() => handleShow(item.name)}
                                            >Ver deatalles
                                            </Button>{' '}
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>

                    ) :

                    <Table className='tabla' bordered hover size="sm">
                        <thead>
                            <tr>
                                <th><h5>Bandera</h5></th>
                                <th><h5>País</h5></th>
                                <th><h5>Continente</h5></th>
                                <th><h5>Detalles</h5></th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtro.map((item, index) => (
                                <tr key={index} className='m-3'>
                                    <td> <img src={item.flag} alt="Bandera" width="100" height="100" /></td>
                                    <td> <h5>{item.name}</h5></td>
                                    <td> <h5>{item.region}</h5></td>
                                    <td>
                                        <Button
                                            variant="info"
                                            onClick={() => handleShow(item.name)}
                                        >Ver deatalles
                                        </Button>{' '}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
            }

            {/* Modal detalles de los países*/}

            <Container className=" container centrar" >
                <Modal show={show}
                    size="lg"
                    scrollable
                    className="container-modal"
                    onHide={handleClose} >
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className="modal-content ">
                        <img src={modalList.flag} alt="" className="img-modal" />
                        <div className="data-modal">
                            <h1>{modalList.name}</h1>
                            <h3>Capital: {modalList.capital}</h3>
                            <h3>Población: {modalList.population}</h3>
                            <h3>Continente: {modalList.region}</h3>
                            <h3>Área: {modalList.area}</h3>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleClose} >Cerrar</Button>{' '}
                    </Modal.Footer>
                </Modal>
            </Container>

        </div>
    )
}

export default ListCountry
