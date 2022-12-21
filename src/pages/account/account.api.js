
import Axios from 'axios';

// necesitamos insertar una nueva cuenta
// - Al hacer click sobre la cuenta, vemos las direcciones url:
//      http://localhost:1234/pages/account/account.html?id=1
//      http://localhost:1234/pages/account/account.html?id=2
//      http://localhost:1234/pages/account/account.html?id=3

// Obtener los datos actuales.
// actualizar la cuenta.

const url = `${process.env.BASE_API_URL}/account`;

// para hacer un post lo hacemos en la direccion 
export const insertAccount = account => Axios.post(`${url}/${account.id}`, account).then(response => {
    return response.data;
});

export const getAccount = id => Axios.get(`${url}/${id}`).then(response => {
    return response.data;
});

export const updateAccount = account => Axios.put(`${url}/${account.id}`, account).then(response => {
    return response.data;
});