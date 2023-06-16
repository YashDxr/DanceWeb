const express = require('express');
const path = require('path');
const app = express();
var mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://0.0.0.0:27017/contactDance', {useNewUrlParser: true})
const port = 8000;

//MONGOOSE SCHEMA
var contactSchema = new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    gender:String
});
var Contact = mongoose.model('Contact' , contactSchema);





//EXPRESS
app.use('/static' , express.static('static'));
app.use(express.urlencoded());



//PUG
app.set('view-engine' , 'pug' );
app.set('views' , path.join(__dirname , 'views'));



//ENDPOINT
app.get('/', (req,res)=>{
    // const con = "This is content";
    const params = { };    //'title': "Using Endpoint" , 'content': con
    res.status(200).render('home.pug' , params);
});
app.get('/contact', (req,res)=>{
    // const con = "This is content";
    const params = {  }    //'title': "Using Endpoint" , 'content': con;
    res.status(200).render('contact.pug' , params);
});
app.post('/contact', (req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("Item Saved in db")
    }).catch(()=>{
        res.status(400).send("Item Could not be saved")
    }); 
    // res.status(200).render('contact.pug');
})





//SERVER START
app.listen(port , ()=>{
    console.log(`Server Running on port ${port}`);
})