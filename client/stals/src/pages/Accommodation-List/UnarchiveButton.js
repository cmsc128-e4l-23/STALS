import React, { useState } from "react";
import UnarchiveModal from './UnarchiveModal.js';

export default function UnarchiveButton({ accommodation, setLoading }){
    const [modalOpen, setModalOpen] = useState(false);

    return(
        <>
        <button onClick={() => setModalOpen(true)}>
            Unarchive
        </button>

        {modalOpen && <UnarchiveModal setModalOpen={setModalOpen} setLoading={setLoading} accommodation={accommodation} />}
        </>
    )
}