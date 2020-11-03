const axios = require('axios');

const getSet = (setID) => {
  return axios.get(`https://api.scryfall.com/cards/search?q=set:${setID}&order=color`, {
    headers: { 'Origin': 'X-Requested-With' } // may be able to remove this later
  })
    .then(res => {
      // console.log(res.data.data);
      console.log(formatCards(res.data.data));
      return formatCards(res.data.data);
    });
};

const formatCards = (cardData) => {
  return cardData.map(card => {
    // set_id INTEGER references sets(id),
    // card_name TEXT NOT NULL,
    // cost TEXT,
    // card_type TEXT,
    // color TEXT, -- colors TEXT = "WUBRG" --- Leave empty for colorless
    // rarity TEXT,
    // image_url TEXT NOT NULL

    return (card.colors || card.image_uris === undefined)
      ? () => {
        console.log(card.name);
        return {
          set_id: 0,
          card_name: card.name,
          cost: card.mana_cost,
          card_type: card.type_line,
          rarity: card.rarity,
        };
      }
      :
      {
        set_id: 0,
        card_name: card.name,
        cost: card.mana_cost,
        card_type: card.type_line,
        color: card.colors.join(''),
        rarity: card.rarity,
        image_url: card.image_uris.small
      };
    // image options = small, normal, large, png, art_crop, border_crop
  });
};

// sends card data to card table

getSet('znr');