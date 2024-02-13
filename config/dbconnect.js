const mongoose = require('mongoose');

const connectDb = async () => {
     try{
          const conn = await mongoose.connect(process.env.MONGODB_URI);
          console.log(`connected to database ${conn.connection.host}`);
     }catch(err){
          console.log('Failed to connect');
     }
}

module.exports = connectDb;