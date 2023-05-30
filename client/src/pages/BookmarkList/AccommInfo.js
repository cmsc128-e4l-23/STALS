import React, { useEffect, useState} from "react";

export default function AccommCard({ isLoggedIn, userType, bookmarks, email, accomm }) {
    const [trueaccomm, setAccomm] = useState(null);

    useEffect(() => {
        if (isLoggedIn) {
            fetch(process.env.REACT_APP_API + 'checkIfBookmarked', {
                method: 'POST',
                body: JSON.stringify({
                    user: email,
                    accomm: accomm._id   
                }),
                headers: {
                    'Content-Type': "application/json"
                }
            })
            .then(res => res.json())
            .then(body => {
                if(body.success){
                    setAccomm(accomm)
                }
            })
        }
    }, [])

    return (
        <>
        {trueaccomm.name}
        </>
    )
}
