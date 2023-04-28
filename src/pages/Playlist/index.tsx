import { useContext, useEffect, useState } from 'react';
import './style.css';
import { AuthContext } from '../../contexts/Auth';
import Api from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import { Playlist } from '../../types/playlist';

export const PlaylistsPage = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const auth = useContext(AuthContext);

    useEffect(() => {
        let ignore = false;
        if (!ignore) loadPlaylists();
        return () => {ignore = true}
    }, []);

    const navigate = useNavigate();

    const loadPlaylists = async () => {
        const { status, data} = await Api.getAllPlaylistsFromUser(auth.token);
        if (status !== 200) return navigate('/login');
        setPlaylists(data.playlists);
    }

    const handleDeletePlaylist  = async (playlistId: string) => {
        const deleteResponse = await Api.deletePlaylist(auth.token, playlistId);
        const getAllResponse = await Api.getAllPlaylistsFromUser(auth.token);
        if (deleteResponse.status !== 200 || getAllResponse.status !== 200) return;
        setPlaylists(getAllResponse.data.playlists);
    }

    const handleEditPlaylist = (playlist: Playlist) => {
        const success = auth.setPlaylistInfo(playlist);
        if (!success) return;
        navigate('/playlists/edit');
    }

    const handleGetIndividualPlaylist = (playlist: Playlist) => {
        const success = auth.setPlaylistInfo(playlist);
        if (!success) return;
        navigate('/playlists/one');
    }

    return (
        <>
            <h1 className='playlists-title'>Playlists</h1>
            <div className="playlist-container">
                {playlists.map((playlist, index) => (
                <div className="playlist" key={index}>
                    <div className="playlist-props" onClick={() => handleGetIndividualPlaylist(playlist)}>
                        <h2 className="playlist-name">{playlist.name}</h2>
                        <p className="playlist-genre">{playlist.genre}</p>
                        <ul className="playlist-musics">
                            <li key={'music-0'}>{playlist.musics[0]}</li>
                            <li key={'music-1'}>{playlist.musics[1]}</li>
                            <li key={'music-2'}>{playlist.musics[2]}</li>
                        </ul>
                    </div>
                    <div className="playlist-actions ">
                        <button className="edit-btn" 
                        onClick={() => handleEditPlaylist(playlist)}>Edit</button>
                        <button className="delete-btn"
                        onClick={() => handleDeletePlaylist(playlist.id)}>Delete</button>
                    </div>
                </div>
                ))}
            </div>   
        </>
    )
}