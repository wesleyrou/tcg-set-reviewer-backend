const axios = require('axios');

const getSetId = (db, code) => {
  return db
    .from('sets')
    .where('code', code)
    .then((row) => row[0]);
};

const postSet = (db, setObject) => {
  return db
    .insert(setObject)
    .into('sets')
    .returning('*')
    .then((row) => row[0]);
};

const postAllSetCodesFromScryfall = (db) => {
  return axios.get('https://api.scryfall.com/sets', {
    headers: { 'Origin': 'X-Requested-With' } // may be able to remove this later
  })
    .then(res => {
      const allSetCodes = res.data.data.map(setData => {
        return {
          code: setData.code,
          set_name: setData.name,
          release_date: setData.released_at
        };
      });

      console.log(allSetCodes);

      allSetCodes.forEach(setObject => {
        postSet(db, setObject);
      });

      return {
        message: `${allSetCodes.length} sets posted`
      };

    });
};

module.exports = {
  getSetId,
  postSet,
  postAllSetCodesFromScryfall
};