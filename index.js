const { CardSet } = require('./CardSet')

const vals = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const suits = ['club', 'heart', 'spade', 'diamond']

let i = 3000


const randomVals = new Array(i).fill(null).map(val => {
    return val = vals[Math.floor(Math.random() * vals.length)]
})
const randomSuits = new Array(i).fill(null).map(val => {
    return val = suits[Math.floor(Math.random() * suits.length)]
})

const cards = new CardSet(randomVals, randomSuits, 'low')


// console.log(cards.benchmark('merge', 'value', 'asc'))
// console.log(cards.benchmark('insertion', 'value', 'asc'))
// console.log(cards.getCards());
console.log(cards.sortCards('value', 'asc', 'suit', 'desc'))

