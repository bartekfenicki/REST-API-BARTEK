import mongoose from "mongoose";


export async function connect() {
    try{
        if(!process.env.DBHOST){
            throw new Error('DBHOST is not defined');
        }
        await mongoose.connect(process.env.DBHOST);
        if(mongoose.connection.db){
            await mongoose.connection.db.admin().command({ping: 1});
            console.log("Connected to the database");
        }else {
            throw new Error("Could not connect to the database");
        }
    }
    catch(e){
        console.log("error connecting to the database " + e);
    }
};

export async function disconnect() {
    try{
        await mongoose.disconnect();
        console.log("Disconnected from the database");
    }
    catch(e){
        console.log("error disconnecting from the database " + e);
    }
};
export async function testConnection(){
    try{
        await connect();
        await disconnect();
        console.log("Connection test successful");
    }
    catch(e){
        console.log("Connection test failed " + e);
    }   
}