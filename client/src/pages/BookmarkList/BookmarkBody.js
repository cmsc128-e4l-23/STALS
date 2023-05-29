import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import DeleteButton from './DeleteButton';

export default function BookmarkBody({ bookmark_id, email, setLoading }){
    const [accommData, setAccommData] = useState(null);

    useEffect(() => {
        fetch(process.env.REACT_APP_API +'getAccommFullDetails', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({_id: bookmark_id})
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setAccommData(data.accommodation)  
                console.log(data.accommodation)
            }
        });
        
    }, [])

    return(
            <>
            {accommData &&
            <li>
                <div id='li-container'>
                    <h3 id='accomm-name'>{accommData.name}</h3>
                    <DeleteButton accommodation={accommData} email={email} setLoading={setLoading} />
                </div>
            </li>
            }
            </>
    )
}