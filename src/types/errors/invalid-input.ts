import { InputUser } from "..";
import { InputPlaylist } from "../playlist-input";

export type InvalidInputError = {
    message: string;
    input: InputPlaylist | InputUser
}