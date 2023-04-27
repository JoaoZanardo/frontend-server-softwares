import { LoginProps } from "../../../types";

export const loginValidator = ({ email, password }: LoginProps): string | void => {
    if (!email) return 'Type a valid email';
    if (!password) return 'Type a valid password';
}