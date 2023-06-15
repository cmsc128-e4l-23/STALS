import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './PageNotFound'

export default function PageNotFound() {
    let navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate('/home');
        }, 3000)
    })

    return (
        <div id="page-not-found">
            <h1>PAGE NOT FOUND</h1> <br/>
            <p>Redirecting to homepage...</p>
        </div>
    )
}