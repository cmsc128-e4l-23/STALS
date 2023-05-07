import React, { useState } from "react";
import DeleteModal from './DeleteModal';

export default function DeleteButton({ accommodation, setLoading }){
    const [modalOpen, setModalOpen] = useState(false);


    return(
        <>
        <button onClick={() => setModalOpen(true)}>
            Delete
        </button>

        {modalOpen && <DeleteModal setModalOpen={setModalOpen} setLoading={setLoading} accommodation={accommodation} />}
        </>
    )
}