import { createContext } from 'react';
import { UserDto } from '../../types/dto';
import { LoginProps } from '../../types';
import { Playlist } from '../../types/playlist';

export type AuthContextType = {
    token: string;
    playlist: Playlist | null;
    setPlaylistInfo: (data: Playlist) => boolean;
    signup: (body: UserDto) => Promise<Boolean>;
    login: (body: LoginProps) => Promise<Boolean>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);