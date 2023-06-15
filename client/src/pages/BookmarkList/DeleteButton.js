import React, { useState } from "react";
import DeleteModal from './DeleteModal';
import { Box } from '@mui/material'
import "./Button.css"
import BookmarkIcon from '@mui/icons-material/Bookmark';



export default function DeleteButton({ accommodation, email, setLoading }){
    const [modalOpen, setModalOpen] = useState(false);


    return(
        <>
        {modalOpen && <DeleteModal setModalOpen={setModalOpen} setLoading={setLoading} email={email} accommodation={accommodation} />}

        <button className='delete-btn' onClick={() => setModalOpen(true)}>
            Remove Bookmark
        </button>

        </>
    )
}