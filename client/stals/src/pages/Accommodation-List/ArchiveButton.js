import React, { useState } from "react";
import ArchiveModal from './ArchiveModal.js';

export default function ArchiveButton({ accommodation, setLoading }){
    const [modalOpen, setModalOpen] = useState(false);


    return(
        <>
        <button onClick={() => setModalOpen(true)}>
            Archive
        </button>

        {modalOpen && <ArchiveModal setModalOpen={setModalOpen} setLoading={setLoading} accommodation={accommodation} />}
        </>
    )
}