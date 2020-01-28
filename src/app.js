const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT||3000;
const hbs = require('hbs');
const geoCoding = require('./utils/gecode');
const forecast = require('./utils/forecast');

//Define paths for express config
const requiredPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');


//setup handelbar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(requiredPath));

app.get('',(req,res) => {
res.render('index',{
  title:"Weather",
  name : "Revati Vekhande"
});
})

app.get('/about', (req,res)=>
{
res.render('about', {
  title : "About ",
  name : "Revati Vekhande"
});
})

app.get('/help', (req,res)=>
{
res.render('help', {
  title : "Help",
  message : "Happy to help!!!!",
  name : "Revati Vekhande"
});
})

app.get('/weather', (req,res) =>
{

if(!req.query.location)
  {
    return res.send({
      error : "Please send mandatory field location"
    })
  }
  const location = req.query.location;
    geoCoding(location, (error , data) =>
    {
        if(error)
        {
         return  res.send({
            error
          });
        }
  
        forecast( data.latitude,data.longitude, (error, forecastData) => {
            if(error)
            {
           return res.send({
                error
              });
            }
            res.send({
              location,
              forecast : forecastData
            })
        
    })
    });

 

}); 

app.get('/help/*',(req,res) =>
{
res.render('error', {
  title : '404',
  message:'Help article not found',
  name : "Revati Vekhande"
})
});

app.get('*', (req,res) =>
{

  res.render('error',{
    title : '404',
  message:'Page Not Found',
  name : "Revati Vekhande" 
})

});

app.listen(port, ()=>
{
    console.log('Server is up on port 3000');

});