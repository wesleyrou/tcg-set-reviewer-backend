const axios = require('axios');

const getSetId = (db, code) => {
  return db
    .from('sets')
    .where('code', code)
    .then((row) => row[0].id);
};

const getAllSets = (db) => {
  return db
    .from('sets')
    .returning('*');
};

const postSet = (db, setObject) => {
  return db
    .insert(setObject)
    .into('sets')
    .returning('*')
    .then((row) => row[0]);
};

const seedAllSetCodesFromScryfall = (db) => {
  return axios.get('https://api.scryfall.com/sets', {
    headers: { 'Origin': 'X-Requested-With' } // may be able to remove this later
  })
    .then(res => {
      const allSetCodes = res.data.data.map(setData => {
        return {
          code: setData.code,
          set_name: setData.name,
          set_type: setData.set_type,
          release_date: setData.released_at
        };
      }).reverse();
      postSet(db, allSetCodes);

      return {
        message: `${allSetCodes.length} sets posted`
      };

    })
    .catch(err => err)
};

const postNewSetsFromScryfall = (db) => {
  return axios.get('https://api.scryfall.com/sets', {
    headers: { 'Origin': 'X-Requested-With' } // may be able to remove this later
  })
    .then(res => {
      let allSetCodes = res.data.data.map(setData => {
        return {
          code: setData.code,
          set_name: setData.name,
          set_type: setData.set_type,
          release_date: setData.released_at
        };
      });

      getAllSets(db)
        .then(sets => {
          const lengthDiff = allSetCodes.length - sets.length;
          if (lengthDiff !== 0) {
            allSetCodes.splice(lengthDiff, allSetCodes.length);
            console.log('HELLO', allSetCodes.length);
            allSetCodes.reverse();
            postSet(db, allSetCodes);
          }

          return {
            message: `${allSetCodes.length} sets posted`
          };
        });
    });
};

module.exports = {
  getSetId,
  getAllSets,
  postSet,
  seedAllSetCodesFromScryfall,
  postNewSetsFromScryfall
};