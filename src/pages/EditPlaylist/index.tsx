import { ReactElement, useContext, useEffect, useState } from "react";
import './style.css';
import { InputChangeEvent } from "../../types";
import Api from "../../hooks/useApi";
import { AuthContext } from "../../contexts/Auth";
import { useNavigate } from "react-router-dom";

export const EditPlaylistPage = (): ReactElement => {
    const auth = useContext(AuthContext);
    const playlist = auth.playlist!;

    const navigate = useNavigate();

    const [name, setName] = useState<string>(auth.playlist!.name);
    const [genre, setGenre] = useState<string>(auth.playlist!.genre);
    const [music, setMusic] = useState<string>('');
    const [musics, setMusics] = useState<string[]>(auth.playlist!.musics);
    const [editError, setEditError] = useState<string>('');

    useEffect(() => {
        if (!playlist) return;
    }, []);

    const handleEditPlaylist = async () => {
        if (!musics.length && name && genre && music) {
            musics.push(music);
            setMusics(musics);
        }

        const {status, data} = await Api.editPlaylist(auth.playlist!.id, {
            name, genre, musics
        }, auth.token);
        if (status !== 200 ) {
            setEditError(data.name);
            return;
        }
        resetStatesValues();
        return navigate('/playlists');
    }
    
    const resetStatesValues = () => {
        setName('');
        setGenre('');
        setMusic('');
        setMusics([]);
        setEditError('');
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
            <h1>Editar Playlist</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>Nome da Playlist:</label>
                <input type="text" name="playlist-name" 
                onChange={handleInputName} value={name}/>

                <label >Gênero:</label>
                <input type="text" name="playlist-genre"
                onChange={handleInputGenre} value={genre}/>

                <div id="playlist-musics">
                    <label >Música:</label>
                    <input type="text" id="playlist-music-0" name="playlist-music[]"
                    onChange={handleInputMusic} value={music}/>
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

                    <button className="submit" onClick={handleEditPlaylist}>Salvar</button>
                </div>

                <h2>{editError}</h2>
            </form>
        </>
    )
}