import React, { useState, useEffect } from "react";
import DeleteButton from "./DeleteButton";
import ArchiveButton from "./ArchiveButton";
import UnarchiveButton from "./UnarchiveButton";






export default function List({email}){
    const [accomms, setAccomms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/getOwnerAccomms', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email: email})
        })
        .then(res => res.json())
        .then(data => {
            setAccomms(data.accommodations)
            setLoading(false)
        });
    }, [email, loading])


    return(
        <div>  
        {accomms.length > 0 ?
                <div>
                    Active Acommodations:
                    {
                        accomms.map(
                            (accomm) => {
                                return(
                                    <>{
                                        accomm.archived === false &&
                                    
                                        <li>
                                            {accomm.name}
                                            <ArchiveButton accommodation={accomm} setLoading={setLoading} />
                                            <DeleteButton accommodation={accomm} setLoading={setLoading} />
                                        </li>
                                    }   
                                    </>
                                )
                                    
                                    
                                
                            }
                        )
                    }
                    <br />
                    Archived Acommodations:
                    {
                        accomms.map(
                            (accomm) => {
                            return(<>{
                                accomm.archived === true &&
                                <li>
                                    {accomm.name}
                                    <UnarchiveButton accommodation={accomm} setLoading={setLoading} />
                                    <DeleteButton accommodation={accomm} setLoading={setLoading} />
                                </li>
                            }</>)   
                            }
                        )
                    }
                </div>
                 : <div>No Accommodations found</div>
            }
        </div>
    )
}