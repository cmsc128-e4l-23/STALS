import easytest from "./easytest.js";
import testdata from "./testdata.js";

// PRACTICALLY A PLAYGROUND FOR NEEDLE FUNCTIONS
// necessary data here
// const usertest = testdata.additionalUsers[0];
// // place your sequential callbacks here
// setTimeout(()=>easytest.registerTest(usertest),0)
// setTimeout(()=>easytest.loginTest(usertest),1000)
// setTimeout(()=>easytest.loginCheckTest(usertest),2000)

const validarchive =    {_id: "64426a0ebb6740748acbed9c"}
const invalidarchive =  {_id: "000000000000000000000000"}
const search = {searchString: "Laguna"}
// place your sequential callbacks here
setTimeout(()=>easytest.archiveAccommTest(invalidarchive),0)
//setTimeout(()=>easytest.unarchiveAccommTest(invalidarchive),1000)
//setTimeout(()=>easytest.searchAccommTest(search),2000)