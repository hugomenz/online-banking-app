import { onUpdateField, onSubmitForm, onSetError, onSetFormErrors, onSetValues, } from '../../common/helpers';
import { formValidation } from './account.validations';
import { history } from '../../core/router';
import { getAccount, updateAccount, insertAccount } from './account.api';
import { mapAccountFromApiToViewModel, mapAccountFromViewModelToApi, } from './account.mappers';

const params = history.getParams(); // obtenemos la url

// edicion de una cuenta:  http://localhost:1234/pages/account/account.html?id=1
// creacion de una cuenta: http://localhost:1234/pages/account/account.html
// podemos diferenciar si hay url de cuenta o de añadir una nueva
const isEditMode = Boolean(params.id); 

if (isEditMode){
    getAccount(params.id).then(apiAccount => {
        //console.log("desde getAccount isEditMode", apiAccount);
        account = mapAccountFromApiToViewModel(apiAccount);
        onSetValues(account);
    });
}


let account = {
    id: '',
    type: '',
    alias: '',
};

onUpdateField('type', event => {
    const value = event.target.value;
    account = {
        ...account,
        type: value,
    };

    formValidation.validateField('type', account.type).then(result => {
        onSetError('type', result);
    });
});

onUpdateField('alias', event => {
    const value = event.target.value;
    account = {
        ...account,
        alias: value,
    };

    formValidation.validateField('alias', account.alias).then(result => {
        onSetError('alias', result);
    });
});

const onSave = () => {
    const apiAccount = mapAccountFromViewModelToApi(account);
    return isEditMode ? updateAccount(apiAccount) : insertAccount(apiAccount);
};

onSubmitForm('save-button', () => {
    formValidation.validateForm(account).then(result => {
        onSetFormErrors(result);
        if (result.succeeded) {
            onSave().then(apiAccount => {
                history.back();
            });
        }
    });
});

////// 
// 1. Hemos entrado en nueva cuenta
// 2. hemos recogido los valores
// 3. cuando le damos al boton guardar se ejecuta onSubmitForm
// 4. valida los datos, esta bien, entoncesr ejecutas guardar
// 5. devuelve los datos
// 6. con el onSave lo que hacemos es coger los datos correctos por el probla de alias y name
// 7. es modo edicion, actualiza, no es modo edicion >> nueva cuenta >> hace un post