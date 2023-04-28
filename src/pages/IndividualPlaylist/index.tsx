import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/Auth';
import Api from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import './style.css';

export const IndividualPlaylistPage = () => {
    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.playlist) return;
    })

    const handleDeletePlaylist  = async () => {
        const {status} = await Api.deletePlaylist(auth.token, auth.playlist!.id);
        if (status !== 200) return;
        navigate('/playlists');
    }

    const handleEditPlaylist = () => {
        navigate('/playlists/edit');
    }
    

    return (
        <>
            <div className="individual-playlist">
                <h1>{auth.playlist?.name}</h1>
                <p className="individual-playlist-genre">{auth.playlist?.genre}</p>
                <ul className="individual-playlist-musics">
                    {auth.playlist?.musics.map((music, index) => (
                        <li key={index}>{music}</li>
                    ))}
                </ul>
                <div className="individual-playlist-buttons">
                    <button className="individual-playlist-button-edit"
                    onClick={handleEditPlaylist}>Editar</button>
                    <button className="individual-playlist-button-delete"
                    onClick={handleDeletePlaylist}>Deletar</button>
                </div>
            </div>
        </>
    )
}