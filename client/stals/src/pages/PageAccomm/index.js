import React from "react";
import { useSearchParams } from "react-router-dom";
import Header from "components/Header";
import AccommBody from "./AccommBody";


export default function AccommodationPage() {
    // extract search parameter from the URL
    const [searchInput] = useSearchParams();
    let data = searchInput.get("id")===null ? "" : searchInput.get("id");
    // let id = props.location.state.id;

    return(
        <>
        <Header />
        <AccommBody data={data} />
        </>
    );
}
