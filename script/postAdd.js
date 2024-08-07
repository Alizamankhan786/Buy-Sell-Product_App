import { checkUserStatus } from "../config.js";

let userData = null;

async function userDataObject(){
    const obj = await checkUserStatus();
    userData = obj;
    console.log(`App.js Function` , userData);
    
};

userDataObject();