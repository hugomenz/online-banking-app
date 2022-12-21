import { getAccountList } from './account-list.api';
import { addAccountRows } from './account-list.helpers';
import { mapAccountListFromApiToViewModel } from './account-list.mappers';
import { onUpdateField } from '../../common/helpers';
import { history } from '../../core/router';


// como tenemos que transformar los datos que nos devuelve el servidor 
// lo vamos a hacer en un fichero .mappers.js
getAccountList().then(accountList => {
    const viewModelAccountList = mapAccountListFromApiToViewModel(accountList)
    addAccountRows( viewModelAccountList );

    viewModelAccountList.forEach(account => {
        // cuando cambia el valor del select ve a la pagina
        // mirando en el archivo account-list.helpers.js en getOptions tenemos las siguientes lineas: 
        // transferOption.textContent = 'Transferencias';
        // transferOption.value = routes.transfer(id);
        // movementOption.textContent = 'Movimientos';
        // movementOption.value = routes.movements(id);
        onUpdateField(`select-${account.id}`, (event) => {
            const route = event.target.value;
            history.push(route);
        });
    });
});
// ahora que esta finalizado nos centramos en la pagina de cuenta. >> account/account.js