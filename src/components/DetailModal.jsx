import React, { useState } from 'react'
import { Button, Container, Modal } from 'react-bootstrap'

const DetailModal = ({ pais }) => {
    const [show, setShow] = useState(false);
    const [modalList, setModalList] = useState({})
    const handleClose = () => setShow(false);

    const handleShow = () => {
        setShow(true);
        setModalList(pais)
    }
    return (
        <div>
            <Button
                variant="primary"
                onClick={() => handleShow()}
            >Ver deatalles
            </Button>{' '}

                <Modal show={show}
                    size="lg"
                    // scrollable
                    
                    onHide={handleClose} >
                 
                    <Modal.Body className=" bg-secondary text-dark ">
                        <img src={modalList.flag} alt={modalList.name} className="img-modal" />
                        <div className="data-modal">
                            <h1>{modalList.name}</h1>
                            <h3>Capital: {modalList.capital}</h3>
                            <h3>Población: {modalList.population}</h3>
                            <h3>Continente: {modalList.region}</h3>
                            <h3>Área: {modalList.area}</h3>

                        </div>
                        <Button variant="primary text-dark" onClick={handleClose} >Cerrar</Button>{' '}
                    </Modal.Body>
                </Modal>
          
        </div>
    )
}

export default DetailModal