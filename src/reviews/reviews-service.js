const CardService = require('../cards/cards-service')

const getMatchingReviews = (user_id, set_id, db) => {    
    return db    
    .from('reviews')
    .returning('*')
    .where({user_id, set_id})    
}

const postReview = (newReview, db) => {
    return db
    .insert(newReview)
    .into('reviews')
    .returning('*')
    .then((row) => row[0])
}

const postNewCardReviews = (review, db) => {
    const {set_id, id} = review    
    const review_id = id

    return CardService.getCards(db, set_id)
    .then((cards) => {
        return cards.map(card => ({
                card_id: card.id,
                review_id,
                rating: null,
            })
        )
    })
    .then(cardReviews => {        
        return db
        .insert(cardReviews)
        .into('card_reviews')
        .returning('*')
    })
    .catch(err => err)
}

const getCardReviews = (review_id, db) => {    
    return db    
    .from('card_reviews')
    .where({ review_id })
    .returning('*')
}

module.exports = {
    getMatchingReviews,
    postReview,
    postNewCardReviews,
    getCardReviews,
  };