const http = require("http");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

    const uri = "mongodb+srv://ganesh:ganesh@coviddatabase.hhn4g.mongodb.net/Covidvacdatabase?retryWrites=true&w=majority";
    
    mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    });
    mongoose.connection.on('connected',()=>{
        
    });
    
    
    const covidschema = mongoose.Schema({
    
    id: Number,
    name:String,
    price:Number,
    year:Number,
    inmarket:Boolean,
    effectiveness:Number,
    
    });
    
    const covidsdata =mongoose.model('COVIDVACDATA',covidschema);
    
    

    
const server = http.createServer((req, res) => {
    
    
    
    
    if (req.url === '/') {
    
    
        // read public.html file from public folder
        fs.readFile(path.join(__dirname, '/', 'index.html'),
                    (err, content) => {
                                    
                                    if (err) throw err;
                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.end(content);
                        }
              );
     }

    else if (req.url === '/about') {


        // read the about.html file public folder
        fs.readFile(
            path.join(__dirname, '/', 'about.html'),
                    (err, content) => {
                                    
                                    if (err) throw err;
                                    res.writeHead(200, { 'Content-Type': 'text/html' });
                                    res.end(content);
                        }
              );
     }
    else if (req.url==='/api')
    {
       
        res.setHeader('Access-Control-Allow-Origin', '*');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        // Please note the content-type here is application/json
        

        
       
        covidsdata.find({

        }


        ).then(data=>{
            res.setHeader('Content-Type', 'application/json','utf-8');
            res.end(JSON.stringify(data));
        })
        
       
        
    }
    
    else{
        res.end("<h1> 404 nothing is here</h1>");
    }

   
});

const PORT= process.env.PORT || 5959;

server.listen(PORT,()=> console.log(`Great our server is running on port ${PORT} `));