import { Validators, createFormValidation } from "@lemoncode/fonk";

// changing the error messages language
const validationSchema = {
    field: {
        user: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
            {
                validator: Validators.email,
                message: 'Email no válido',
            }
        ], 
        password: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
        ], 
    },
};

export const formValidation = createFormValidation(validationSchema);