import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/Auth/SignUp';
import NotFound  from './pages/NotFound';
import { PlaylistsPage } from './pages/Playlist/AllPlaylistsPage';
import { RequireAuth } from './contexts/Auth';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Auth/Login';
import { Header } from './components/Header';
import { NewPlaylistPage } from './pages/Playlist/NewPlaylist';
import { EditPlaylistPage } from './pages/Playlist/EditPage';
import { IndividualPlaylistPage } from './pages/Playlist/IndividualPlaylist';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header><HomePage/></Header>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<LoginPage/>} />
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
        {/* <Route path="/dashboard" element={} /> */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  )
}

export default App
