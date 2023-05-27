import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Body from "./Body";


export default function Home() {
    // extract search parameter from the URL
    const [email, setEmail] = useState('')
    const [isLoggedIn, setLoggedIn] = useState(false)

    const [searchInput] = useSearchParams();
    let data = searchInput.get("search")===null ? "" : searchInput.get("search");

    useEffect(() => {
        fetch('http://localhost:3001/checkifloggedin', {
        method: 'POST',
        credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setLoggedIn(data.isLoggedIn);
            if(isLoggedIn){
                setEmail(data.email)
            }
        })
    }, [isLoggedIn]);

    return(
        <>
            <Body isLoggedIn= {isLoggedIn} email={email} data={data} />
        </>
    );
}
