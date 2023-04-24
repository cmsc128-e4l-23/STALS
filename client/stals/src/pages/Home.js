import React from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Body from "../components/Body";


export default function Home() {
    // extract search parameter from the URL
    const [searchInput] = useSearchParams();
    let data = searchInput.get("search");

    return(
        <>
        <Header />
        <Body data={data} />
        </>
    );
}