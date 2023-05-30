import React, { useState } from "react";
import DeleteModal from './DeleteModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import "/../Button.css"
import {BookmarkIcon} from '@mui/icons-material';



export default function DeleteButton({ accommodation, email, setLoading }){
    const [modalOpen, setModalOpen] = useState(false);


    return(
        <>
        {modalOpen && <DeleteModal setModalOpen={setModalOpen} setLoading={setLoading} email={email} accommodation={accommodation} />}

        <button className='delete-btn' onClick={() => setModalOpen(true)}>
            Delete
            <span className='btn-icon'>
                <BookmarkIcon id={accommodation._id} />
            </span>
        </button>

        </>
    )
}