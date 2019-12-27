const { CardSet } = require('./CardSet')
const fs = require('fs');


const vals = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const suits = ['club', 'heart', 'spade', 'diamond']

let end = 10002

let output = 'items\tmerge\tinsertion\thybrid\n'

for (let i = 2; i < end; i += 10) {

    let insert = 0
    let merge = 0

    console.log(i);
    const randomVals = new Array(i).fill(null).map(val => {
        return val = vals[Math.floor(Math.random() * vals.length)]
    })
    const randomSuits = new Array(i).fill(null).map(val => {
        return val = suits[Math.floor(Math.random() * suits.length)]
    })

    //auto generate arrays to sort

    const mergeCards = new CardSet(randomVals, randomSuits, 'low')
    const insertCards = new CardSet(randomVals, randomSuits, 'low')
    const hybridCards = new CardSet(randomVals, randomSuits, 'low')

    
    insert = insertCards.benchmark('insertion', 'value', 'asc')
    merge = mergeCards.benchmark('merge', 'value', 'asc')
    hybrid = hybridCards.benchmark('hybrid', 'value', 'asc')
    
    console.log('merge ' + merge)
    console.log('insert ' + insert)
    console.log('hybrid ' + hybrid)
    console.log('****************************************')
    
    output += `${i}\t${merge}\t${insert}\t${hybrid}\n`
}
    
    fs.writeFile('data.txt', output, (err) => {
        if (err) throw err;
        console.log('done!');
    })