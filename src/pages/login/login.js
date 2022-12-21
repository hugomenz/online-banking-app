import {
  onUpdateField,
  onSubmitForm,
  onSetError,
  onSetFormErrors,
} from '../../common/helpers';
import { isValidLogin } from './login.api';
import { formValidation } from './login.validations';
import { history, routes } from '../../core/router';

let login = {
  user: '',
  password: '',
};

onUpdateField('user', (event) => {
  const value = event.target.value;

  login = {
    ...login,
    user: value,
  };

  formValidation.validateField('user', login.user).then((result) => {
    onSetError('user', result);
  });
});

onUpdateField('password', (event) => {
  const value = event.target.value;

  login = {
    ...login,
    password: value,
  };

  formValidation.validateField('user', login.user).then((result) => {
    onSetError('password', result);
  });
});

// navigate to next site if credentials OK
const onNavigate = (isValid) => {
  if (isValid) {
    history.push(routes.accountList);
  } else {
    alert(
      `Usuario y/o contraseña no validos. Try with: email: admin@email.com pass: test`
    );
  }
};

onSubmitForm('login-button', () => {
  // from login validations check if inputs are valid
  formValidation.validateForm(login).then((result) => {
    onSetFormErrors(result);
    if (result.succeeded) {
      // check from the server if credentials are OK
      isValidLogin(login).then((isValid) => {
        onNavigate(isValid); // true / false
      });
    }
  });
});
