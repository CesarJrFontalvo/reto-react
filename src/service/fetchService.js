export const getAllUsers = async () => {
    
    let response = await fetch('https://covid-api.mmediagroup.fr/v1/cases?country=Colombia');
    console.log('Response:', response);
    console.log('Status:', response.status);
    console.log('OK?', response.ok);

    // We return the json
    return response.json()
}