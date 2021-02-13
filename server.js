const { syncAndSeed,  models:{User, Place,Thing}} = require('./db');
const express = require('express');
const app = express();

app.use(require('method-override')('_method'));
app.use(express.urlencoded({ extended:false}));

app.get('/',async(req,res,next)=>{
    try{
        const [User,Place,Thing] = await Promise.all([

      })  
      console.log('Miao');
      res.send(`
          <html>
            <head>
              <title>List</title>
            </head>
            <body>
            <div>
            Hello World 
            <form>
            <select>
            <option>--Person--</option>

            </select>
            <select>
            <option>--Places--</option>
            </select>
            <select>
            <option>--Things--</option>
            </select>
            <button>count</button>    <button>date</button>    
            <button>Create Purchase</button>
            </form>
            </div>
            </body>
          </html>
          
      `)
    
    }
    catch(err){
      next(err)
    }
});

const init = async() =>{
    try{
       await syncAndSeed();
       const port = process.env.PORT || 3000;
       app.listen(port,()=>console.log(`Listening on port ${port}`));
      console.log('Hello again');
    }
    catch(error){
      console.log(error)
  
    }
  };
  
  init();