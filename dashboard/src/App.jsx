import {HashRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Analytics from './pages/Analytics'
import Login from './pages/Login'
import Risk from './pages/Risk'

export default function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/analytics" element={<Analytics/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/RISK" element={<Risk/>}/>
      </Routes>
    </Router>
  )
}