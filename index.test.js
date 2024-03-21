const { sequelize } = require('./db');
const { Band, Musician, Song } = require('./index')

describe('Band, Musician, and Song Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        const newBand = await Band.create({ name: 'Linkin Park', genre: 'Rock' });
        expect(newBand.name).toBe('Linkin Park');
    })

    test('can create a Musician', async () => {
        //test creating a musician
        const testMusician = await Musician.create({name: 'Josh Vietti', instrument: 'violin'})
        expect(testMusician.name).toBe('Josh Vietti');
    })

    test('can create a Song', async () => {
        //test creating a song
        const testSong = await Song.create({title: 'Under Pressure', year: 2014, length: 9.2})
        expect(testSong.title).toBe('Under Pressure');
    })

    test('can update a Band', async () => {
        // TODO - test updating a band
        const newBand = await Band.create({ name: 'Metallica', genre: 'Metal' });
        await newBand.update({ genre: 'Rock' });
        const updatedBand = await Band.findByPk(newBand.id);
        expect(updatedBand.genre).toBe('Rock');
    })

    test('can update a Musician', async () => {
        // TODO - test updating a musician
        let testMusician = await Musician.create({name: 'Josh Vietti', instrument: 'violin'})
        await Musician.update({name: 'Lindsey Stirling'}, {where: {name: 'Josh Vietti'}});
        testMusician = await Musician.findOne({where: { instrument: 'violin'}});
        expect(testMusician.name).toBe('Lindsey Stirling');
    })

    test('can update a Song', async () => {
        //test updating a song
        let testSong = await Song.create({title: 'Under Pressure', year: 2014, length: 9.2});
        await Song.update({title: 'City of Stars', year: 2015, length:6.17 }, {where: {year: 2014}});
        testSong = await Song.findOne({where: { year: 2015}});
        expect(testSong.title).toBe('City of Stars');
    })

    test('can delete a Band', async () => {
        // TODO - test deleting a band
        const newBand = await Band.create({ name: 'AC/DC', genre: 'Rock' });
        await newBand.destroy();
        const deletedBand = await Band.findByPk(newBand.id);
        expect(deletedBand).toBeNull();
    })

    test('can delete a Musician', async () => {
        // TODO - test deleting a musician
        const testMusician = await Musician.create({name: 'Josh Vietti', instrument: 'violin'})
        await Musician.destroy({where: {name: 'Josh Vietti'}});
        deletedMusician = await Musician.findOne({where: { name: 'Josh Vietti'}});
        expect(deletedMusician).toBeNull();
    })

    test('can delete a Song', async () => {
        //test deleting a song
        const testSong = await Song.create({title: 'Under Pressure', year: 2014, length: 9.2});
        await Song.destroy({where: {title: "Under Pressure"}});
        const deletedSong = await Song.findOne({ where: { title: 'Under Pressure' } });
        expect(deletedSong).toBeNull();
    })
    test('can add a Musician to a Band', async () => {
        //testing association between Musician and Band
        let bands = await Band.findAll();
        if (bands.length === 0)
        {
            const newBand = await Band.create({ name: 'AC/DC', genre: 'Rock' });
            const newBand1 = await Band.create({ name: 'ATL', genre: 'Alternative' });
        }

        bands = await Band.findAll();
        const testMusician = await Musician.create({name: 'Josh Vietti', instrument: 'violin'})

        await bands[0].addMusician(testMusician);
        const Musicians = await bands[0].getMusicians();

        expect(Musicians.length).toBe(1);
    })
    test('can add a Song to a Band', async () => {
        //testing association between Song and Band
        const newBand = await Band.create({ name: 'AC/DC', genre: 'Rock' });
        const newBand1 = await Band.create({ name: 'ATL', genre: 'Alternative' });
        let bands = await Band.findAll();

        const testSong = await Song.create({title: 'Under Pressure', year: 2014, length: 9.2});
        const testSong1 = await Song.create({title: 'City of Stars', year: 2015, length: 6.17});

        await bands[0].addSong(testSong);
        await bands[0].addSong(testSong1);

        const songList = await bands[0].getSongs();
        
        expect(songList).toHaveLength(2);
    })
})