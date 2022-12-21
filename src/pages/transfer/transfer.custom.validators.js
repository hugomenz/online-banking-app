

export const dayValidator = ({ value }) => {
    const parseValue = !!value ? parseInt(value) : '';
    const succeeded = (!value) || ( parseValue > 0 ) && ( parseValue <= 31 );

    return {
        succeeded,
        message: succeeded
            ? ''
            : 'Introduce un número que sea correcto',
        type: '',
    };
};

export const monthValidator = ({ value }) => {
    const parseValue = !!value ? parseInt(value) : '';
    const succeeded = (!value) || (( parseValue > 0 ) && ( parseValue <= 12 ));

    return {
        succeeded,
        message: succeeded
            ? ''
            : 'Introduce un número que sea correcto',
        type: '',
    };
};

export const yearValidator = ({ value }) => {
    const parseValue = !!value ? parseInt(value) : '';
    const succeeded = (!value) || ( parseValue > 2021 ) && ( parseValue < 2100 );

    return {
        succeeded,
        message: succeeded
            ? ''
            : 'Introduce un número que sea correcto',
        type: '',
    };
};