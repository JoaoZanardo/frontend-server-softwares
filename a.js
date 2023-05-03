const fieldsValidation = (body, fields) => {
    for (const field of fields) {
        if (!body[field]) return field;
    }
}

console.log(fieldsValidation({ name: 'joao', email: 'asd', password: 'af' }, ['name', 'email', 'password']));