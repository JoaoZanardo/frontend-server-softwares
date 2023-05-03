import { fieldsValidation } from ".";
import { UserInput } from "../types";
import { UserDto } from "../types/dto";
import { InvalidInputError } from "../types/errors";

type ValidateSignUpFieldsParam = UserDto;

export const validateSignUpFields = (body: ValidateSignUpFieldsParam): InvalidInputError | void => {
    let field = fieldsValidation(body, ['name', 'email', 'password', 'passwordConfirmation']);
    if (!field) return;
    let message = '';
    if (field === UserInput.NAME) message = 'Digite um nome válido';
    if (field === UserInput.EMAIL) message = 'Digite um email válido';
    if (field === UserInput.PASSWORD) message = 'Digite uma senha válida';
    if (field === UserInput.PASSWORDCONFIRMATION) message = 'Confirme sua senha';
    return {
        message,
        input: field as UserInput
    }
}