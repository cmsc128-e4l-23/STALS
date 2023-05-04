import { React } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'
import "./Button.css"

const iconStyle = {
  marginLeft:'10px',
};

// function to handle post archiving in the backend
const archiveAccom = (id) =>{};

const ArchiveBtn = ({accomodationId}) => (
  <button className='archive-btn' onClick={archiveAccom(accomodationId)}> Archive
    <span style={iconStyle}>
      <FontAwesomeIcon icon={faArchive}/>
    </span>
  </button>
);

export default ArchiveBtn;