import { ReactElement } from 'react';
import './style.css';

export const Home = (): ReactElement => {
    return (
        <div className="hero">
            <h1>Frontend da <a href='https://github.com/JoaoZanardo?tab=repositories' target='_blank'>api de playlists</a></h1>
            <p>Frontend simples, com inúmeras funcionalidades.</p>
        </div>
    )
}