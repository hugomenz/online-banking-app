import { Validators, createFormValidation } from "@lemoncode/fonk";
import { iban } from '@lemoncode/fonk-iban-validator';
import { dayValidator, monthValidator, yearValidator } from "./transfer.custom.validators";

// changing the error messages language
const validationSchema = {
    field: {
        iban: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
            {
                validator: iban.validator,
                message: 'El campo debe tener un formato de IBAN correcto',
            },
        ], 
        name: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
        ], 
        amount: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
        ], 
        concept: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
        ], 
        notes: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
        ], 
        day: [
            {
                validator: dayValidator,
            },
        ], 
        month: [
            {
                validator: monthValidator,
            },
        ], 
        year: [
            {
                validator: yearValidator,
            },
        ], 
        email: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
            {
                validator: Validators.email,
                message: 'Email no válido',
            }
        ], 
    },
};

export const formValidation = createFormValidation(validationSchema);