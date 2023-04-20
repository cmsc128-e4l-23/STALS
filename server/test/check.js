import easytest from "./easytest.js";
import testdata from "./testdata.js";

// PRACTICALLY A PLAYGROUND FOR NEEDLE FUNCTIONS
const usertest = testdata.additionalUsers[0];
await easytest.registerTest(usertest);
await easytest.loginTest(usertest);
await easytest.loginCheckTest(usertest);