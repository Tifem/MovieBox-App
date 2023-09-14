import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
  return (
    <footer style={{marginTop: '7rem', height: 'auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
    <div style={{display: 'flex', width: '40%', alignItems: 'center', justifyContent: 'space-around', marginBottom: '1rem'}}>
        
        <InstagramIcon/>
        <TwitterIcon/>
        <YouTubeIcon/>
        
    </div>
    <div style={{display: 'flex', width: '50%', alignItems: 'center', justifyContent: 'space-around', marginBottom: '1rem'}}>
      <p>Condition Use</p>
      <p>Privacy & Policy</p>
      <p>Press Room</p>
    </div>
    <p> © 2021 <span style={{color: 'gray'}}>MovieBox Discovery App</span> by <span style={{color: 'gray'}}>Boluwatife Janet</span></p>
    </footer>
  )
}

export default Footer