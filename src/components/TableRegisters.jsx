import React from 'react'
import { Button, Table } from 'react-bootstrap'

const TableRegisters = ({ type }) => {

    return (
        <div>
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
                    {type().map((item, index) => (
                        <tr key={index} className='m-3'>
                            <td> <img src={item.flag} alt="Bandera" width="100" height="100" /></td>
                            <td> <h5>{item.name}</h5></td>
                            <td> <h5>{item.region}</h5></td>
                            <td>
                                <Button
                                    variant="info"
                                // onClick={() => handleShow(item.name)}
                                >Ver deatalles
                                </Button>{' '}
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </div>
    )
}

export default TableRegisters