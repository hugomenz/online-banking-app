// en el cliente los dato server/src/data.json
/**
 * Account {
 * id:string,
 * type: string,
 * name:srting --> en este caso hemos estado usando alias en lugar de name
 * }
 */
// este map lo usamos porque en el backend lo llamaron de una forma y nosotros en el front de otra
export const mapAccountFromApiToViewModel = account => {
    return {
        ...account,
        alias: account.name,
    };
};

export const mapAccountFromViewModelToApi = account => {

    return {
        ...account,
        name: account.alias,
    };
};