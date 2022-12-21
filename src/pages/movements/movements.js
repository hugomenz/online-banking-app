
import { addMovementRows } from './movements.helpers';
import { getMovementsList } from './movements.api';
import { history } from '../../core/router/history';
import { getAccount } from '../account/account.api';
import { mapAccountFromApiToViewModel as mapAccNameFromApiToVm } from '../account/account.mappers';
import { mapAccountFromApiToViewModel as mapAccValuesFromApiToVm } from '../account-list/account-list.mappers';
import { mapMovementListFromApiToViewModel } from './movements.mappers';

const params = history.getParams(); 
const isAllMovements =  Boolean(params.id); 

if (isAllMovements) {
    getAccount(params.id).then(apiAccount => {
        let account = mapAccNameFromApiToVm(mapAccValuesFromApiToVm(apiAccount));
        document.getElementById('balance').innerText = account.balance;
        document.getElementById('alias').innerText = account.alias;
        document.getElementById('iban').innerText = account.iban;
    })
}

getMovementsList(params.id).then(apiMovementList => {
    let movementList = mapMovementListFromApiToViewModel(apiMovementList);
    console.log(movementList)
    addMovementRows( movementList );
});