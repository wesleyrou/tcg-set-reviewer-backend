const axios = require('axios');


//TEMPORARY WORKING PROTOTYPE CODE FOR KALDHEIM!!!!!!!!!!!!!!

//additionalQueryParams in request.body typically "+is:booster&order=color"

//for strixhaven academy

const getCardsFromScryfall = (setCode, setID, additionalQueryParams) => { 
  return axios.get(`https://api.scryfall.com/cards/search?q=set:${setCode}${additionalQueryParams}`, {
    headers: { 'Origin': 'X-Requested-With' } // may be able to remove this later
  })
  .then(res => {

    //TEMPORARY WORKING FIX FOR PREVIEW SEASON WHEN THERE ARENT TWO PAGES OF SPOILERS YET
    if(!res.data.has_more) {
      return formatCards(res.data.data, setID);
    }


      return axios.get(`https://api.scryfall.com/cards/search?q=set:${setCode}${additionalQueryParams}&page=2`)
      .then(secondRes => {        
        
        const dataOne = res.data.data
        const dataTwo = secondRes.data.data        
        
        console.log([...dataOne,...dataTwo])
        return formatCards([...dataOne,...dataTwo], setID);
      })
      .catch(err => console.log(err.message))
    })
    .catch(error => {
      console.log('error', error.message);
    });
};


const formatCards = (cardData, setID) => {  
  // console.log(cardData[0])
  return cardData.map(card => {
    // set_id INTEGER references sets(id),
    // card_name TEXT NOT NULL,
    // cost TEXT,
    // card_type TEXT,
    // color TEXT, -- colors TEXT = "WUBRG" --- Leave empty for colorless
    // rarity TEXT,
    // image_url TEXT NOT NULL

    // Dual Faced Card edge case
    let cardObject = {};

    if (card.card_faces) {
      const front = card.card_faces[0];
      const back = card.card_faces[1];
      cardObject = {
        set_id: setID,
        scryfall_id: card.id,
        card_name: card.name,
        lang: card.lang,
        cost: `${front.mana_cost ? front.mana_cost : null},${back.mana_cost ? back.mana_cost : null}`,
        card_type: `${front.type_line},${back.type_line}`,
        color: card.colors ? card.colors.toString() : `${front.colors.toString()},${back.colors.toString()}`,
        rarity: card.rarity,
        image_url: card.image_uris ? card.image_uris.normal : `${front.image_uris.normal},${back.image_uris.normal}`
      };
    }
    // Regular card case
    else {
      cardObject = {
        set_id: setID,
        scryfall_id: card.id,
        card_name: card.name,
        cost: card.mana_cost,
        card_type: card.type_line,
        lang: card.lang,
        color: card.colors ? card.colors.toString() : '',
        rarity: card.rarity,
        image_url: card.image_uris.normal
      };
    }
    return cardObject;
    // image options = small, normal, large, png, art_crop, border_crop
  });
};

// sends card data to card table
const postCards = (db, cardSet) => {
  return db
    .insert(cardSet)
    .into('cards')
    .returning('*')
    .then((row) => row[0]);
};

const getCards = (db, set_id) => {
  return db('cards')
    .where({ set_id: set_id, lang: 'en' })
    .orderBy('id')
    .then(rows => rows);
};

module.exports = {
  getCardsFromScryfall,
  getCards,
  postCards,
  formatCards
};