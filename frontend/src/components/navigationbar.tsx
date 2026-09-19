import '../styles/navigationbar.css'
import { Link } from 'react-router-dom'

export default function Navigationbar(){

  return (
    <>
      <div className="nav-container">
        <div className="title">
          SaSeBok
        </div>
        
        <div className="routes">
          <Link to="/">Home</Link>
          <Link to="/people">People</Link>
          <Link to="/chapters">Chapters</Link>
          <Link to="/explore">Explore</Link>

          

        </div>

        <Link to="/myprofile" className="profile-link">
          <div className='Myprofile'>
            My Profile
          </div>
        </Link>

      </div>
    </>
  )
}