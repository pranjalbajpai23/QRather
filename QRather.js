import express from 'express';
import qr from 'qr-image';
import fs from 'fs' 
import bodyParser from "body-parser"
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
const port = 3000

import { fileURLToPath } from 'url';
import { dirname } from 'path';

app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.get("/",function(req,res){
    res.sendFile(__dirname+"/public/index.html")
})

app.post("/",function(req,res){
    var URL=req.body.link;
    //var type=req.body.option;
    var type="png"
    // console.log(type);
    var qr_svg = qr.image(URL,type);
    qr_svg.pipe(fs.createWriteStream('public/'+'qr_image.'+type));
    res.sendFile(__dirname+"/public/qr.html");
    

})
app.listen(port,function(){
    console.log("server started at port 3000 sucessfully!");
})