import React, { useState, useEffect } from "react";
import DeleteButton from "../ListAccomm/DeleteButton";
import '../ListAccomm/index.css' 

export default function List({email}){
    const [accomms, setAccomms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API +'getUserBookmarks', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email: email})
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
            setAccomms(data.bookmarks)
            }
        });
        const temp = []
        accomms.map((id) => {
            console.log(id)
            fetch(process.env.REACT_APP_API +'getAccommFullDetails',{
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({_id: id})
            }).then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.success){
                let newBookmark = data.accommodation
                temp.push(newBookmark);
                setLoading(false)
                }
            });
            
        })
        setBookmarks(temp)
        console.log(temp)
        
    }, [email, loading])

 

    return(
        <div>  
        {accomms.length > 0 ?
                <div>
                    <h2>Bookmarked Acommodations:</h2>
                    {
                        bookmarks.map(
                            (accomm) => {
                                return(
                                    <ul>{
                                    
                                        <li>
                                            <div id='li-container'>
                                                <h3 id='accomm-name'>{accomm.name}</h3>
                                                <DeleteButton accommodation={accomm} email={email} setLoading={setLoading} />
                                            </div>
                                        </li>
                                    }   
                                    </ul>
                                )
                                    
                                    
                                
                            }
                        )
                    }
                   
                </div>
                 : <div>No Bookmarked accommodations found</div>
            }
        </div>
    )
}