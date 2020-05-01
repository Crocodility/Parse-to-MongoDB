const request = require('request')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/baza')
    .then(()=> console.log('started'))
    .catch(e => console.log(e))
mongoose.Promise = global.Promise

let object = {}
const json = 'https://www.shazam.com/shazam/v2/ru/UA/web/-/tracks/world-chart-world?pageSize=200&startFrom=0'
var schema = mongoose.Schema({
    song: String,
    source: String
})
var songnumber = mongoose.model('songnumber',schema)

request(json ,(error,response,html)=>{
    if(!error && response.statusCode == 200){
        const obj = JSON.parse(html);
        for(var i = 0; i < 51; i++){
        var songname = obj['chart'][i]['share']['subject']
        var source = obj['chart'][i]['share']['href']
        console.log(songname)
        var song = new songnumber({
            _id: new mongoose.Types.ObjectId(),
            song : songname,
            source : source,
        })
        console.log(song)
        song.save(function(err) {
            if (err) throw err;
            console.log('object successfully saved.');
        })
    }}
})