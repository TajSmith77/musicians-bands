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
        expect('NO TEST').toBe('EXPECTED VALUE HERE');
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
        expect('NO TEST').toBe('EXPECTED VALUE HERE');
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
        expect('NO TEST').toBe('EXPECTED VALUE HERE');
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
})