const { Band } = require('./models/Band')
const { Musician } = require('./models/Musician')
const { Song } = require("./models/Song")
// Define associations here
Musician.belongsTo(Band);
Band.hasMany(Musician);

Band.belongsToMany(Song, {through: "Band-Song"});
Song.belongsToMany(Band, {through: "Band-Song"});


module.exports = {
    Band,
    Musician,
    Song
};
