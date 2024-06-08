const mongoose = require("mongoose");

const connectDb = async() =>{
   await mongoose.connect(process.env.connection_database,{
    dbName: process.env.DB_NAME,
   })
   .then(()=>console.log("database connected"))
   .catch((e)=>console.log("databse connection is failed", e.messages))
}


//  const connectDb = async () => {
//     await mongoose
//       .connect(process.env.connection_database, {
//         dbName: process.env.DB_NAME,
//       })
//       .then(() => console.log("database connected"))
//       .catch((e) => {
//         console.log("Database connection failed: ", e.message);
        
//         // Handling common errors
//         switch (e.message) {
//           case "failed to connect to server [address] on first connect":
//             console.error("Network error: Unable to reach the server.");
//             break;
//           case "Authentication failed":
//             console.error("Authentication error: Invalid credentials.");
//             break;
//           case "Invalid connection string":
//             console.error("Configuration error: The connection string is invalid.");
//             break;
//           case "Server selection timed out after 30000 ms":
//             console.error("Timeout error: The server selection process timed out.");
//             break;
//           case "getaddrinfo ENOTFOUND [hostname]":
//           case "getaddrinfo EAI_AGAIN [hostname]":
//             console.error("DNS error: Unable to resolve hostname.");
//             break;
//           case "SSL connection failed":
//             console.error("SSL error: Issues with SSL connection.");
//             break;
//           case "ns not found":
//             console.error("Database error: The specified database could not be found.");
//             break;
//           default:
//             console.error("An unknown error occurred:", e);
//         }
//       });
//   };
  
  module.exports = connectDb;