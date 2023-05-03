import { fieldsValidation } from "."
import { PlaylistInput } from "../types";
import { InvalidInputError } from "../types/errors";

type ValidatePlaylistFieldsParam = {
    name: string; 
    genre: string;
    music: string; 
    musics: string[];
}

export const validatePlaylistFields = (body: ValidatePlaylistFieldsParam)
: InvalidInputError | void => {
    const { name, genre, music, musics } = body;
    const field = fieldsValidation({name, genre, music}, ['name', 'genre', 'music']);
    if (!field) return;
    let message = '';
    if (field === PlaylistInput.NAME) message = 'Digite um nome válido' ;
    if (field === PlaylistInput.GENRE) message = 'Digite um gênero válido';
    if (field === PlaylistInput.MUSIC) {
        if (musics.length) return;
        message = 'Digite pelo menos uma música';
    }
    return {
        message,
        input: field as PlaylistInput
    }
}