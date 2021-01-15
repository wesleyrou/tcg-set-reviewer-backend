const getAllReviewsOfSet = (db, setId) => {
    return db('card_reviews')
    .join('cards','card_reviews.card_id','cards.id')
    .join('reviews','card_reviews.review_id','reviews.id')
    .join('users','reviews.user_id','users.id')
    .select('cards.card_name','card_reviews.card_id','users.username','card_reviews.rating')
    // .select('*')
    .where({'cards.set_id':setId})
    .orderBy('card_id')
}

module.exports = {
    getAllReviewsOfSet,    
}