// const mongoose = require('mongoose');



// const connectDb = async() =>{
//       try {
//         await mongoose.connect(process.env.MONGO_URI,{
//             useNewUrlParser:true,
//             useUnifiedTopology:true
//         });
//         console.log('database connection successfully')
//       } catch (error) {
//         console.error('error connecting to database', error.message);
//         process.exit(1);
//       }
// }

// module.exports= connectDb;




const mongoose = require('mongoose');

const connectDb = async() =>{
      try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('database connection successfully');
      } catch (error) {
        console.error('error connecting to database', error.message);
        process.exit(1);
      }
}

module.exports= connectDb;
