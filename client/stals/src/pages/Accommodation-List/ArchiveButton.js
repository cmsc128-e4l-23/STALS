import React, { useState } from "react";
import ArchiveModal from './ArchiveModal.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'
import "./Button.css"

export default function ArchiveButton({ accommodation, setLoading }){
    const [modalOpen, setModalOpen] = useState(false);


    return(
        <>
        <button className='archive-btn' onClick={() => setModalOpen(true)}> 
            Archive
            <span style={iconStyle}>
                <FontAwesomeIcon icon={faArchive}/>
            </span>
        </button>

        {modalOpen && <ArchiveModal setModalOpen={setModalOpen} setLoading={setLoading} accommodation={accommodation} />}
        </>
    )
}