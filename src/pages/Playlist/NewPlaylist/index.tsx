import { ReactElement, useContext, useState } from "react";
import { InputChangeEvent, PlaylistInput, Playlist } from "../../../types";
import Api from "../../../hooks/useApi";
import { AuthContext } from "../../../contexts/Auth";
import { useNavigate } from "react-router-dom";
import { validatePlaylistFields } from "../../../helpers";
import { InvalidInputError } from "../../../types/errors";

export const NewPlaylistPage = (): ReactElement => {
    const [name, setName] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const [music, setMusic] = useState<string>('');
    const [musics, setMusics] = useState<string[]>([]);
    const [error, setError] = useState<InvalidInputError | null>(null);

    const auth = useContext(AuthContext);
    const navigate = useNavigate();;

    const handleCreatePlaylist = async () => {
        if (!musics.length && name && genre && music) {
            musics.push(music);
            setMusics(musics);
        }

        const fieldsError = validatePlaylistFields({ music, genre, musics, name });
        if (fieldsError) {
            setError(fieldsError);
            return
        }

        const {status, data} = await Api.createPlaylist({
            name, genre, musics
        }, auth.token);
        if (status !== 201 ) {
            setError(data.name);
            return;
        }
        resetStatesValues();
        const success = auth.setPlaylistInfo(data.playlist as Playlist);
        if (!success) return;
        return navigate('/playlists/one');
    }
    
    const resetStatesValues = () => {
        setName('');
        setGenre('');
        setMusic('');
        setMusics([]);
        setError(null);
    }

    const handleInputName = (event: InputChangeEvent) => {
        setName(event.target.value);
    }
    
    const handleInputGenre = (event: InputChangeEvent) => {
        setGenre(event.target.value);  
    }
    
    const handleInputMusic = (event: InputChangeEvent) => {
        setMusic(event.target.value);
    }

    const handleAddMusicButton = () => {
        musics.push(music);
        setMusic('');
        setMusics(musics);
    }

    const handleRemoveMusicButton = (musicName: string) => {
        setMusics(musics.filter(music => music !== musicName));
    }

    return (
        <>
            <h1>Cadastro de Playlist</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>Nome da Playlist:</label>
                <input type="text" name="playlist-name" 
                onChange={handleInputName} value={name}/>
                {!!error && error.input === PlaylistInput.NAME && (
                    <p className="error">{error.message}</p>
                )}

                <label >Gênero:</label>
                <input type="text" name="playlist-genre"
                onChange={handleInputGenre} value={genre}/>
                {!!error && error.input === PlaylistInput.GENRE && (
                    <p className="error">{error.message}</p>
                )}

                <div id="playlist-musics">
                    <label >Música:</label>
                    <input type="text" id="playlist-music-0" name="playlist-music[]"
                    onChange={handleInputMusic} value={music}/>
                    {!!error && error.input === PlaylistInput.MUSIC && (
                    <p className="error">{error.message}</p>
                )}
                </div>


                {!!musics.length && 
                    <ul>
                        {musics.map((music, index) => (
                            <li key={index}>
                                {music}
                                <div className="remove" onClick={() => handleRemoveMusicButton(music)}>
                                    <img src='../../src/assets/x-mark.png'></img>
                                </div>
                            </li>
                        ))}
                    </ul>
                }

                <div className="buttons">
                    {!!music.length && <button type="button" 
                    id="add-music" onClick={handleAddMusicButton}>Adicionar outra música</button>}

                    <button className="submit" onClick={handleCreatePlaylist}>Salvar</button>
                </div>
            </form>
        </>
    )
}