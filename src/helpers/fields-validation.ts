export const fieldsValidation = (body: any, fields: string[]): string | void => {
    for (const field of fields) {
        if (!body[field]) return field;
    }
}