const addAccomm = async (req, res) => {
    res.send("I am adding accommodation");
}

const archiveAccomm = async (req, res) => {
    res.send("I am archiving accommodation");
}

const deleteAccomm = async (req, res) => {
    res.send("I am delete accommodation");
}

const searchAccomm = async (req, res) => {
    res.send("I am searching accommodation");
}

const generateRep = async (req, res) => {
    res.send("I am generating report");
}

export default {
    addAccomm,
    archiveAccomm,
    deleteAccomm,
    searchAccomm,
    generateRep
}