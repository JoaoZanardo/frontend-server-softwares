import axios, { AxiosInstance } from 'axios';
import { PlaylistDto, UserDto } from '../types/dto';
import { LoginProps } from '../types';
import { Playlist } from '../types/playlist';

export type HttpResponse = {
    status: number;
    data: any;
}

class Api {
    private instace: AxiosInstance;
    constructor(provider = axios) {
        this.instace = provider.create({
            baseURL: 'http://localhost:3000/api'
        });
    }

    async signup(data: UserDto): Promise<HttpResponse> {
        try {
            const res = await this.instace.post('/signup', data, {
                validateStatus: () => true,
                headers: {
                    Accept: "application/json"
                }
            });
            return {
                status: res.status,
                data: res.data
            }
        } catch (error) {
            const response = (<any>error).response;
            return {
                status: response?.status || 500,
                data: response.data
            };       
        }
    }

    async login(data: LoginProps): Promise<HttpResponse> {
        try {
            const res = await this.instace.post('/signin', data, {
                validateStatus: () => true,
                headers: {
                    Accept: "application/json"
                }
            });

            return {
                status: res.status,
                data: res.data
            }
        } catch (error) {
            const response = (<any>error).response;
            return {
                status: response?.status || 500,
                data: response.data
            };       
        }
    }
    
    async getAllPlaylistsFromUser(token: string): Promise<HttpResponse> {
        try {
            const res = await this.instace.get('/playlists/me', {
                headers: {
                    Authorization: token
                }
            });

            return {
                data: res.data,
                status: res.status
            }
        } catch (error) {
            const response = (<any>error).response;
            return {
                status: response?.status || 500,
                data: response.data
            };  
        }
    }

    async deletePlaylist(token: string, playlistId: string): Promise<HttpResponse> {
        try {
            const res = await this.instace.delete(`/playlists/${playlistId}`, {
                headers: {
                    Authorization: token
                }
            });

            return {
                data: res.data,
                status: res.status
            }
        } catch (error) {
            const response = (<any>error).response;
            return {
                status: response?.status || 500,
                data: response.data
            };  
        }
    }

    async createPlaylist(data: PlaylistDto, token: string): Promise<HttpResponse> {
        try {
            const res = await this.instace.post(`/playlists`, data, {
                headers: {
                    Authorization: token
                }
            });

            return {
                data: res.data,
                status: res.status
            }
        } catch (error) {
            const response = (<any>error).response;
            return {
                status: response?.status || 500,
                data: response.data
            };  
        }
    }

    async editPlaylist(
        id: string, data: Omit<Playlist, 'creator' | 'id'>, token: string
        ): Promise<HttpResponse> {
        try {
            const res = await this.instace.put(`/playlists/${id}`, data, {
                headers: {
                    Authorization: token
                }
            });

            return {
                data: res.data,
                status: res.status
            }
        } catch (error) {
            const response = (<any>error).response;
            console.log('ERRO', {response})
            return {
                status: response?.status || 500,
                data: response.data
            };  
        }
    }
}

export default new Api();