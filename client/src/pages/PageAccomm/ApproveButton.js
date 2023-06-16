import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import "../ListAccomm/Button.css"
import ApproveModal from "./ApproveModal";



export default function ApproveButton({ accommodation, setLoading }){
    const [modalOpen, setModalOpen] = useState(false);


    return(
        <>
        {modalOpen && <ApproveModal modalOpen={modalOpen} setModalOpen={setModalOpen} accommodation={accommodation} setLoading={setLoading} />}

        <button className='delete-btn' onClick={() => setModalOpen(true)}>
            Approve
            <span className='btn-icon'>
                <FontAwesomeIcon icon={faCheck}/>
            </span>
        </button>

        </>
    )
}