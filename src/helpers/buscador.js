import swal from "sweetalert2";
import { oneRegisterUrl } from "./url";

export const Buscador = async (categories) => {
    const input = categories;
    let filtrar = oneRegisterUrl + input;

    try {
        const resp = await fetch(filtrar);
        const data = await resp.json();
        return data
    } catch (error) {
        console.log(error)
        // swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: 'Something went wrong!',
        //     footer: '<a href="">Why do I have this issue?</a>'
        // })
    }

};