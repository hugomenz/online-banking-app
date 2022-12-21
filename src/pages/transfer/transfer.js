import { setAccountOptions } from './transfer.helpers';
import { history, routes } from '../../core/router'
import { getAccountList } from '../account-list/account-list.api';
import { formValidation } from './transfer.validations' 
import { onUpdateField, onSubmitForm, onSetError, onSetFormErrors } from '../../common/helpers'
import { regTransfer } from './transfer.api'
import { getAccount } from '../account/account.api';

import { userCancelsTransferText, 
        transactionSummaryText, 
        insufficientFundsText, 
        APICancelsTransferText,
        transferSuccessText } 
from './transfer.messages'

const params = history.getParams();
const wasClickedTransferPage = !params.id

let accountBalance = 0;
let selectedAccountDataDropdwon = {}; 

let transfer = {
    idAccount: params.id,
    nameAccount: '',
    iban: '',
    name: '',
    amount: '',
    concept: '',
    notes: '',
    day: '',
    month: '',
    year: '',
    transferDate: '',
    email: '',
}

let today = new Date().toLocaleDateString();

// if transfer page was open clicking on "Transferencias" 
if (wasClickedTransferPage){
    getAccountList().then(accountList => {
        setAccountOptions(accountList, params.id);
        
        //get account id from <select id...> --> there is not info in the url
        let selectedAccountId = document.getElementById('select-account').value;
        selectedAccountDataDropdwon = accountList.filter(acc => acc.id == selectedAccountId)[0];
    });

// if transfer page was selected from an account, get account info too
}else{
    getAccountList().then(accountList => {
        setAccountOptions(accountList, params.id);

        // account data with id from url
        selectedAccountDataDropdwon = accountList.filter(acc => acc.id == params.id)[0];
    });
};

onUpdateField('select-account', (event) => {
    const value = event.target.value;
    
    // account data with id from event
    getAccountList().then(accountList => {
        selectedAccountDataDropdwon = accountList.filter(acc => acc.id == value)[0];
    });
});

onUpdateField('iban', (event) => {
    const value = event.target.value;

    transfer = {
        ...transfer,
        iban: value 
    };

    formValidation.validateField('iban', transfer.iban).then(result => {
        onSetError('iban', result);
    });
});

onUpdateField('name', (event) => {
    const value = event.target.value;

    transfer = {
        ...transfer,
        name: value 
    };

    formValidation.validateField('name', transfer.name).then(result => {
        onSetError('name', result);
    });
});

onUpdateField('amount', (event) => {
    const value = event.target.value;

    transfer = {
        ...transfer,
        amount: value 
    };

    formValidation.validateField('amount', transfer.amount).then(result => {
        onSetError('amount', result);
    });
});

onUpdateField('concept', (event) => {
    const value = event.target.value;

    transfer = {
        ...transfer,
        concept: value 
    };

    formValidation.validateField('concept', transfer.concept).then(result => {
        onSetError('concept', result);
    });
});

onUpdateField('notes', (event) => {
    const value = event.target.value;

    transfer = {
        ...transfer,
        notes: value 
    };

    formValidation.validateField('notes', transfer.notes).then(result => {
        onSetError('notes', result);
    });
});

// ##########################################################
// onSetError se modificó en el element.helpers
// si el id es day, month o year actua de una forma especial
// Asi soluciono el problema con el error del mensaje.
// #########################################################

onUpdateField('day', (event) => {
    const value = event.target.value;

    transfer = {
        ...transfer,
        day: value ,
        transferDate: `${transfer.day}/${transfer.month}/${transfer.year}`,
    };

    formValidation.validateField('day', transfer.day).then(result => {
        onSetError('day', result);
    });
});

onUpdateField('month', (event) => {
    const value = event.target.value;

    transfer = {
        ...transfer,
        month: value ,
        transferDate: `${transfer.day}/${transfer.month}/${transfer.year}`,
    };

    formValidation.validateField('month', transfer.month).then(result => {
        onSetError('month', result);
    });
});

onUpdateField('year', (event) => {
    const value = event.target.value;

    transfer = {
        ...transfer,
        year: value ,
        transferDate: `${transfer.day}/${transfer.month}/${transfer.year}`,
    };

    formValidation.validateField('year', transfer.year).then(result => {
        onSetError('year', result);
        //console.log(result);
    });
});

onUpdateField('email', (event) => {
    const value = event.target.value;

    transfer = {
        ...transfer,
        email: value 
    };

    formValidation.validateField('email', transfer.email).then(result => {
        onSetError('email', result);
    });
});

const onNavigate = (isValid) => {
    if (Boolean(isValid)){
        history.push(routes.accountList);
    }else {
        alert(APICancelsTransferText)
    }
};

onSubmitForm("transfer-button", () => {
    // si no he seleccionado nada
    getAccountList().then(accountList => {
        let selectedAccountId = document.getElementById('select-account').value;
        selectedAccountDataDropdwon = accountList.filter(acc => acc.id == selectedAccountId)[0];
    });

    // recover data from account included in the transfer data
    transfer = {
        ...transfer,
        nameAccount: selectedAccountDataDropdwon.name,
        idAccount: selectedAccountDataDropdwon.id,
    };
    // check balance
    accountBalance = selectedAccountDataDropdwon.balance;

    // if transaction date is empty, it will be today date.
    if (!transfer.transferDate) {
        transfer = {
            ...transfer,
            day: today.split("/")[0],
            month: today.split("/")[1],
            year: today.split("/")[2],
            transferDate: today,
        };
    };

    // my transfer object is bigger than the object for the fields validator 
    let transferValidation = {
        iban: transfer.iban,
        name: transfer.name,
        amount: transfer.amount,
        concept: transfer.concept,
        notes: transfer.notes,
        day: transfer.day,
        month: transfer.month,
        year: transfer.year,
        email: transfer.email,
    };

    formValidation.validateForm(transferValidation).then(result => {
        onSetFormErrors(result);
        
        if (result.succeeded){ 
            if (selectedAccountDataDropdwon.balance >= transfer.amount ){ // funds condition
                if (confirm(transactionSummaryText(transfer))) { //summary of the transaction
                    alert(transferSuccessText); // OK
                    regTransfer(transfer).then(isValid => {
                        onNavigate(isValid); // true / false
                    });
                } else {
                    alert(userCancelsTransferText); // NO OK
                };
            }else{
                alert(insufficientFundsText(accountBalance, transfer.amount));
            };
        };
    });
});