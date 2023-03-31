import { React } from "react";
import "./Filter.css"
import { IconButton } from '@mui/material';

export default function Filter() {

    // filters (temporary)
    const filters = [
        "filter1", "filter2", "filter3", "filter4", "filter5",
        "filter6", "filter7", "filter8", "filter9", "filter10",
        "filter11", "filter12", "filter13", "filter14", "filter15",
        "filter16", "filter17", "filter18", "filter19", "filter20",
    ];

    // choosing/clicking on a filter
    const addFilter = (filter) => {
        console.log(filter);
    }

    return (
        <div className="filter-outer">
            <div className="filter-div">
                {/* filter buttons */}
                {
                    filters.map((filter, index) => {
                        return <div className="filter-btn" key={index}>
                            <IconButton onClick={e => addFilter(filter)}>
                                filter
                            </IconButton>
                            </div>
                    })
                    
                }
            </div>
        </div>
    )
}