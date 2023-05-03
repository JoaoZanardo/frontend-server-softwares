import { fieldsValidation } from ".";
import { UserInput, LoginProps } from "../types";
import { InvalidInputError } from "../types/errors";

export const validateLoginFields = (body: LoginProps): InvalidInputError | void => {
    const field = fieldsValidation(body, ['email', 'password']);
    if (!field) return;
    let message = '';
    if (field === UserInput.EMAIL) message = 'Digite um email válido';
    if (field === UserInput.PASSWORD) message = 'Digite uma senha válida';
    return {
        message,
        input: field as UserInput
    }
}