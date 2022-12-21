
export const userCancelsTransferText = "La transferencia no se ha realizado. Cancelada por el usuario";
export const APICancelsTransferText = "La transferencia no se ha realizado.";
export const transferSuccessText = "Transferencia realizada con éxito";

export const transactionSummaryText = transfer => {
    return `Por favor, revise si todos los datos son correctos, 
    ¿desea ejecutar la transacción?\n
    Resumen de la transferencia bancaria:\n
    Cuenta de origen: ${transfer.nameAccount}\n
    IBAN de destino: ${transfer.iban}\n
    Beneficiario: ${transfer.name}\n
    Importe (EUR): ${transfer.amount}€\n
    Concepto: ${transfer.concept}\n
    Observaciones: ${transfer.notes}\n
    Fecha de ejecución: ${transfer.transferDate}\n
    Email Beneficiario: ${transfer.email}\n
    `;
};

export const insufficientFundsText = (funds, amount) => {
    return `Los fondos de la cuenta de origen son insuficientes!\n
            Disponible: ${funds}€\n
            Transferencia: ${amount}€\n
            La transferencia no se ha podido ejecutar.`;
};