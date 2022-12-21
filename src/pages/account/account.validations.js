import { Validators, createFormValidation } from "@lemoncode/fonk";

// changing the error messages language
const validationSchema = {
    field: {
        type: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
        ], 
        alias: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
        ], 
    },
};

export const formValidation = createFormValidation(validationSchema);