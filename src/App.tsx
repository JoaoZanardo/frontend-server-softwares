import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import NotFound  from './pages/NotFound';
import { PlaylistsPage } from './pages/Playlist';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Header } from './components/Header';
import { NewPlaylistPage } from './pages/NewPlaylist';
import { EditPlaylistPage } from './pages/EditPlaylist';
import { IndividualPlaylistPage } from './pages/IndividualPlaylist';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header><Home/></Header>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/playlists" element={
          <Header>
            <RequireAuth>
              <PlaylistsPage />
            </RequireAuth>
          </Header>
        } />
        <Route path="/playlists/one" element={
          <Header>
            <RequireAuth>
              <IndividualPlaylistPage />
            </RequireAuth>
          </Header>
        } />
        <Route path="/playlists/add" element={
          <Header>
            <RequireAuth>
              <NewPlaylistPage/>
            </RequireAuth>
          </Header>
        } />
        <Route path="/playlists/edit" element={
          <Header>
            <RequireAuth>
              <EditPlaylistPage/>
            </RequireAuth>
          </Header>
        } />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  )
}

export default App
