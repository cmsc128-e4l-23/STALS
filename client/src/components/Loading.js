import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function Loading(){
    return(
        <Box alignItems={"center"}>
            <CircularProgress />
        </Box>
    )
}