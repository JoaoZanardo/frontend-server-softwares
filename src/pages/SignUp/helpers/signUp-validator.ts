import { UserDto } from "../../../types/dto";

export const signUpValidator = ({ name, email, password, passwordConfirmation }: UserDto): void | string => {
    const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if (!name) return 'Type a valid name';
    if (!email || !regex.test(email)) return 'Type a valid email';
    if (!password) return 'Type a valid password';
    if (!passwordConfirmation) return 'Type a valid passsword confirmation';
    if (password !== passwordConfirmation) return 'The password do not match';
}