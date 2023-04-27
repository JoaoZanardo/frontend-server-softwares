import { useState } from "react";
import { AuthContext } from "./AuthContext";
import Api from "../../hooks/useApi";
import { LoginProps } from "../../types";
import { UserDto } from "../../types/dto";
import { Playlist } from "../../types/playlist";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [token, setToken] = useState<string>('');
    const [playlist, setPlaylist] = useState<Playlist | null>(null);

    const setPlaylistInfo = (playlist: Playlist): boolean => {
        const { name, genre, musics } = playlist;
        if (!name || !genre || !musics || !musics.length) return false;
        setPlaylist(playlist);
        return true;
    }

    const signup = async (body: UserDto): Promise<boolean> => {
        const response = await Api.signup({ ...body });
        if (response.status !== 200) {
            // setError(response.data.name);
            return false;
        }
        setToken(response.data.accessToken);
        return true;
    }

    const login = async (body: LoginProps): Promise<boolean> => {
        const response = await Api.login({ ...body });
        if (response.status !== 200) {
            return false;
        }
        setToken(response.data.accessToken);
        console.log({token})
        setLocalStorage('authToken', token, 1000 * 60 * 1);
        return true;
    }

    const logout = (): void => {
        deleteLocalStorage('authToken');
        return setToken('');
    }

    const setLocalStorage = (key: string, token: string, ttl: number = 1000 * 60 * 60) => {
        const now = new Date()

        const item = {
            value: token,
            expiry: now.getTime() + ttl,
        }
        localStorage.setItem(key, JSON.stringify(item))
    }

    const deleteLocalStorage = (key: string) => {
        localStorage.removeItem(key);
    }
    
   return (
    <AuthContext.Provider value={{ token, playlist, setPlaylistInfo, login, signup, logout }}>
        {children}
    </AuthContext.Provider>
   )
}
