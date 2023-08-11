const mongoose = require('mongoose');

const ipDataSchema = new mongoose.Schema({
    status: String,
    continent: String,
    continentCode: String,
    country: String,
    countryCode: String,
    region: String,
    regionName: String,
    city: String,
    district: String,
    zip: String,
    lat: Number,
    lon: Number,
    timezone: String,
    offset: Number,
    currency: String,
    isp: String,
    org: String,
    as: String,
    asname: String,
    reverse: String,
    mobile: Boolean,
    proxy: Boolean,
    hosting: Boolean,
    query: String
});

const IpData = mongoose.model('IpData', ipDataSchema);

module.exports = IpData;