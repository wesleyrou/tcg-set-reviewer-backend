
const getCardReviews = (db, review_id) => {
  return db
    .from('card_reviews')
    .where({review_id: review_id})
    .orderBy('card_id')
    .returning('*')
}

const updateCardReviews = (db, cardReviews, currentReview) => {
  let posted = 0;
  let updated = 0;
  return getCardReviews(db, currentReview.id)
    .then(reviews => {
        for(let i = 0; i < cardReviews.length; i++) {
            let currentCard = cardReviews[i]
            const cardReviewToUpdate = reviews.find(cardReview => cardReview.card_id === currentCard.card_id)
            
            if(!cardReviewToUpdate) {
                postCardReview(db, currentCard)
                .then(() => posted++)
                .catch(error => error)
            }
            else if(cardReviewToUpdate.rating !== currentCard.rating){
                currentCard.id = cardReviewToUpdate.id
                updateCardReview(db, currentCard)
                .then(() => updated++)
                .catch(error => error)
            }            
        }        
    })
    .then(() => {
        return `Posted: ${posted}, updated: ${updated}`
    })
    .catch(err => error)
};

const postCardReview = (db, cardReview) => {
    return db('card_reviews')
    .insert(cardReview)
    .returning('*')    
}

const updateCardReview = (db, cardReview) => {
    console.log('UPDATINGGGGGGG',cardReview)
    return db('card_reviews')
    .update({rating: cardReview.rating})
    .where({id: cardReview.id})        
}

module.exports = {
    updateCardReviews,
    getCardReviews,
}