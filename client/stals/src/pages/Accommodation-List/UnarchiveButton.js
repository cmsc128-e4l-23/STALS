import React, { useState } from "react";
import UnarchiveModal from './UnarchiveModal.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'
import "./Button.css"

export default function UnarchiveButton({ accommodation, setLoading }){
    const [modalOpen, setModalOpen] = useState(false);

    return(
        <>
        <button className='unarchive-btn' onClick={() => setModalOpen(true)}>
            Unarchive
            <span style={iconStyle}>
                <FontAwesomeIcon icon={faArchive}/>
            </span>
        </button>

        {modalOpen && <UnarchiveModal setModalOpen={setModalOpen} setLoading={setLoading} accommodation={accommodation} />}
        </>
    )
}