import React, { useEffect, useState } from 'react'
import { getCountries } from '../helpers/getCountries';
import TableRegisters from './TableRegisters';
import AddCategory from './AddCategory';
import { Buscador } from '../helpers/buscador';
import Pagination from './Pagination';
import TableFilter from './TableFilter';


const ListCountry = () => {
    // BUSCARDOR
    const [categories, setCategories] = useState([]);

    const onAddCategory = (newCategory) => {
        if (categories.includes(newCategory)) return;

        setCategories([newCategory])
    }

    const [filtro, setFiltro] = useState([]);
    const searchByFilter = async () => {
        const resp = await Buscador(categories);
        setFiltro(resp);
    }

    // TRAER DATOS DE LA API------------------------------------
    const [registros, setRegistro] = useState([]);

    const getData = async () => {
        const resp = await getCountries()
        setRegistro(resp)
    }


    // PAGINACION---------------------------------------------
    const [currentPage, setCurrentPage] = useState(0)
    const pageRegistro = () => {
        return registros.slice(currentPage, currentPage + 20);
    };

    useEffect(() => {

        if (categories.length === 0) {
            getData();

        } else {
            searchByFilter(categories);
        }
    }, [categories])

    return (
        <div className='container centrar '>

            <div className="sticky-top">
                <AddCategory
                    // onNewCategory={(value) => onAddCategory(value)}
                    onNewCategory={onAddCategory}

                />
                <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>


            {
                (categories.length < 1) ?

                    <TableRegisters type={pageRegistro} />
                    :
                    <TableFilter filtro={filtro} />
            }


        </div>
    )
}

export default ListCountry
