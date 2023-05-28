import React, { useState } from "react";
import DeleteModal from './DeleteModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import "./Button.css"



export default function DeleteButton({ accommodation, email, setLoading }){
    const [modalOpen, setModalOpen] = useState(false);


    return(
        <>
        {modalOpen && <DeleteModal setModalOpen={setModalOpen} setLoading={setLoading} email={email} accommodation={accommodation} />}

        <button className='delete-btn' onClick={() => setModalOpen(true)}>
            Delete
            <span className='btn-icon'>
                <FontAwesomeIcon icon={faTrash}/>
            </span>
        </button>

        </>
    )
}