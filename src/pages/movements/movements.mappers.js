export const mapMovementListFromApiToViewModel = movementList => {
    return movementList.map(movement => 
        mapMovementsFromApiToViewModel(movement));
};

const mapMovementsFromApiToViewModel = movement => {
    return {
        ...movement,
        amount: `${movement.amount} €`,
        balance: `${movement.balance} €`,
        realTransaction: new Date (movement.realTransaction).toLocaleDateString(),
        transaction: new Date (movement.transaction).toLocaleDateString(),
    };
};