import axios from "axios";
import { url } from "./url";


export const getCountries = async () => {
    const resp = await axios.get(url)
        .then(response => (
            response.data
        ))
        .catch(error => {
            console.log(error);
        })

    return resp
}