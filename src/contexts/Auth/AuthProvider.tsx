import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import Api from "../../hooks/useApi";
import { LoginProps } from "../../types";
import { UserDto } from "../../types/dto";
import { Playlist } from "../../types/playlist";
import { LocalStorage } from "../../helpers/local-storage";
import { env } from "../../config/env";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [token, setToken] = useState<string>('');

    const localStorage = new LocalStorage();
    const { localStorageKeyItem } = env
    
    useEffect(() => {
        console.log('AUTH CONTEXT');
        const validateToken = async () => {
            const dataStorage = localStorage.getItem(localStorageKeyItem);
            if (dataStorage) {
                const { status } = await Api.getUser(JSON.parse(dataStorage).value);
                if (status !== 200) return logout();
                setUserToken(localStorageKeyItem, JSON.parse(dataStorage).value);
                const timeout = setTimeout(() => {
                    logout();
                }, 1000 * 60 * 60);
                return () => clearTimeout(timeout);
            }
        }
        validateToken();
    }, [token]);

    const setPlaylistInfo = (playlist: Playlist): boolean => {
        const { name, genre, musics } = playlist;
        if (!name || !genre || !musics || !musics.length) return false;
        setPlaylist(playlist);
        return true;
    }

    const signup = async (body: UserDto): Promise<boolean> => {
        const {data, status} = await Api.signup({ ...body });
        if (status !== 200) return false;
        setUserToken(localStorageKeyItem, data.accessToken, 1000 * 60 * 1);
        return true;
    }

    const login = async (body: LoginProps): Promise<boolean> => {
        const {status, data} = await Api.login({ ...body });
        if (status !== 200) return false;
        setUserToken(localStorageKeyItem, data.accessToken, 1000 * 60);
        return true;
    }

    const logout = (): void => {
        setToken('');
        localStorage.deleteItem(localStorageKeyItem);
    }

    const setUserToken = (key: string, item: string, ttl?: number) => {
        setToken(item);
        localStorage.setItem(key, item, ttl);
    }

   return (
    <AuthContext.Provider value={{ token, playlist, setPlaylistInfo, login, signup, logout }}>
        {children}
    </AuthContext.Provider>
   )
}
