//isme 2 fun   ->1 hash krne k liye
//             -> compare krne bcrypt krne k liye


// const bcrypt = require("bcrypt");
const bcrypt = require("bcryptjs");

exports.hashPassword = async (password) =>{
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword
    }
    catch(error){
        console.log(error);
    }
}

exports.comparePassword = async (password, hashedPassword)=>{
    return bcrypt.compare(password, hashedPassword);
};