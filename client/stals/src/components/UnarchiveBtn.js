import { React } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'
import "./Button.css"

const iconStyle = {
  marginLeft:'10px',
};

// function to handle post unarchiving in the backend
const unarchiveAccom = (id) =>{};

const UnarchiveBtn = ({accomodationId}) => (
  <button className='unarchive-btn' onClick={unarchiveAccom(accomodationId)}> Unarchive
    <span style={iconStyle}>
      <FontAwesomeIcon icon={faArchive}/>
    </span>
  </button>
);

export default UnarchiveBtn;