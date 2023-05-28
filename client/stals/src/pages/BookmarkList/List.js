import React, { useState, useEffect } from "react";
import DeleteButton from "../ListAccomm/DeleteButton";
import '../ListAccomm/index.css' 






export default function List({email}){
    const [accomms, setAccomms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookmarks, setbookmarks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/getUserBookmarks', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email: email})
        })
        .then(res => res.json())
        .then(data => {
            setAccomms(data.bookmarks)
            setLoading(false)   
        });
        
    }, [])

    useEffect(()=>{
        if(!loading){
            accomms.map((id) => {
                fetch('http://localhost:3001/getAccommFullDetails',{
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({_id: id})
                }).then(res => res.json())
                .then(data => {
                    console.log("print this "+data.accommodation.name)
                    const newBookmark = data.accommodation
                    setbookmarks((prevBookmarks) => [...prevBookmarks, newBookmark]);
                });
            })
        }
       
    },[email,loading]);
    
 

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
                                                {console.log("this is the accom "+accomm)}
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