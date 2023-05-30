import './AccommBody.css'
import React, { useState, useRef, useLayoutEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Description({description}){
    const [descOpen, setDescOpen] = useState(false)
    const [seeMore, setSeeMore] = React.useState(false);

    const ref = useRef();

    useLayoutEffect(() => {
        if (ref.current.clientHeight < ref.current.scrollHeight) {
          setSeeMore(true);
        }
      }, [ref]);

    return(
        <>
            <div className="accomm-description">
                <h1>Description</h1>
                <p ref={ref}>{description}</p>
            </div>
            {
            seeMore === true ? 
            <div>
                <button className="see-all-button" onClick={() => {setDescOpen(true)}}>See More</button>
                <Dialog
                    open={descOpen}
                    onClose={() => {setDescOpen(false)}}
                    aria-labelledby="description-dialog-title"
                    aria-describedby="Description-dialog-description"
                >
                    <DialogTitle id="Description-dialog-title">
                        {"Description"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="Description-dialog-description">
                            {description}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
            : console.log(seeMore)
            }
        </>
    )
}