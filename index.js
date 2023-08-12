var express = require('express');
var path = require('path');
const axios = require('axios');
const mongoose = require('mongoose');
var app = express();
const IpData = require('./models/data');
require('dotenv').config();

const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.DB_URI || "mongodb+srv://luftadeneme:r9FdD7HZfLPTPRxN@cluster0.popqsho.mongodb.net/ipControlData?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });




app.get('/', async function (req, res) {
  try {
    const clientIP = req.ip;  // veya req.headers['x-forwarded-for']
    const response = await axios.get(`http://ip-api.com/json/${clientIP}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query`);
    const locationData = response.data;

    //console.log(locationData);

    const existingIpData = await IpData.findOne({ query: clientIP });
    if (existingIpData) return;

    const ipData = new IpData(locationData);
    await ipData.save();

    res.render('index', { title: 'Welcome!' });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});


app.listen(process.env.PORT || port, function () {
  console.log('Listening on port ' + port);
});

