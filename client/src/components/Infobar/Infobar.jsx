import React from 'react'
import './Infobar.css'
import onlineIcon from './onlineIcon.png'
import closeIcon from './closeIcon.png'

function Infobar(props) {
  return (
    <div className='infoBar'>
        <div className="leftInnerContainer">
            <img src={onlineIcon} alt="icon" className="onlineIcon" />
            <h3>{props.room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/">
                <img src={closeIcon} alt="close" />
            </a>
        </div>

    </div>
  )
}

export default Infobar