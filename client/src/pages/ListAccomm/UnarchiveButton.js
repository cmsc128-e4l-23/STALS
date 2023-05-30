import React, { useState } from "react";
import UnarchiveModal from './UnarchiveModal.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'
import "./Button.css"

export default function UnarchiveButton({ accommodation, setLoading }){
    const [modalOpen, setModalOpen] = useState(false);

    return(
        <>
        {modalOpen && <UnarchiveModal modalOpen={modalOpen} setModalOpen={setModalOpen} setLoading={setLoading} accommodation={accommodation} />}

        <button className='unarchive-btn' onClick={() => setModalOpen(true)}>
            Unarchive
            <span className='btn-icon'>
                <FontAwesomeIcon icon={faArchive}/>
            </span>
        </button>

        </>
    )
}