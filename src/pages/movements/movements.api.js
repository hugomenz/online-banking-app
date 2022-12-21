import Axios from 'axios';

const url = `${process.env.BASE_API_URL}/movements`;

export const getMovementsList = accountId => Axios.get(url, {params: {accountId}}).then(response =>{
        return response.data;
});