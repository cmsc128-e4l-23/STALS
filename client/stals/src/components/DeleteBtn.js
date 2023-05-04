import { React } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import "./Button.css"

const iconStyle = {
  marginLeft:'10px',
};

// function to handle post deletion in the backend
const deleteAccom = (id) =>{
};

const DeleteBtn = ({accomodationId}) => (
  <button className='delete-btn' onClick={deleteAccom(accomodationId)}> Delete
    <span style={iconStyle}>
      <FontAwesomeIcon icon={faTrash}/>
    </span>
  </button>
);

export default DeleteBtn;