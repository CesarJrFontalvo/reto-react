import React from 'react'
import { Table } from 'react-bootstrap'
import DetailModal from './DetailModal'

const TableFilter = ({filtro}) => {
  return (
    <div style={{margingBottom: '100px'}} className=' p-5'>
          <Table className='tabla mb-5 bg-secondary' bordered hover size="sm"  >
                        <thead>
                            <tr>
                                <th><h5>Bandera</h5></th>
                                <th><h5>País</h5></th>
                                <th><h5>Continente</h5></th>
                                <th><h5>Detalles</h5></th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtro.map((pais, index) => (
                                <tr key={index} className='m-3'>
                                    <td> <img src={pais.flag} alt="Bandera" width="100" height="100" /></td>
                                    <td> <h5>{pais.name}</h5></td>
                                    <td> <h5>{pais.region}</h5></td>
                                    <td>
                                        <DetailModal pais={pais} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
    </div>
  )
}

export default TableFilter