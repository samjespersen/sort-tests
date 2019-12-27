const { mergeSort, insertionSort, hybridSort } = require('./sort')
const { performance } = require('perf_hooks');


class CardSet {

    constructor(valueArray, suitArray, aceValue) {
        this.aceValue = aceValue === 'high' ? '14' : '1';
        this.valueArray = valueArray;
        this.suitArray = suitArray;
        this.startArray = this.numberFaceSwap(this.valueArray, 'number');
        this.sortedArray = this.startArray;

    }

    getCards() {
        return this.numberFaceSwap(this.startArray, 'face');
    }

    getCard(i) {
        return this.numberFaceSwap(this.startArray, 'face')[i];
    }

    getSortedCards() {
        return this.numberFaceSwap(this.sortedArray, 'face');
    }

    getSortedCard(i) {
        return this.numberFaceSwap(this.sortedArray, 'face')[i];
    }

    benchmark(algo) {
        const t1 = performance.now()
        if (algo === 'merge') {
            this.sortedArray = mergeSort(this.sortedArray, arguments[1], arguments[2])
        } else if (algo === 'insertion') {
            this.sortedArray = insertionSort(this.sortedArray, arguments[1], arguments[2])
        } else {
            this.sortedArray = hybridSort(this.sortedArray, arguments[1], arguments[2])
        }
        return (performance.now() - t1)
        // return this.sortedArray;
    }

    sortCards() {

        //validation

        if (arguments.length === 0 || arguments.length % 2 !== 0) {
            throw new Error("Please enter parameters in pairs, e.g. 'sortBy, direction, sortBy, direction'. ")
        }

        [...arguments].forEach((arg, i) => {
            if (i % 2 === 0) {
                if (arg !== 'value' && arg !== 'suit') {
                    throw new Error("Please specify to sort by either 'value' or 'suit'.")
                }
            } else {
                if (arg !== 'asc' && arg !== 'desc') {
                    throw new Error("Please specify the sort direction as either 'asc' or 'desc'.")
                }
            }
        })

        //sorting

        for (let i = 0; i < arguments.length; i += 2) {

            this.sortedArray = hybridSort(this.sortedArray, arguments[i], arguments[i + 1])
        }

        return this.numberFaceSwap(this.sortedArray, 'face');
    }

    numberFaceSwap(arr, swapTo) {
        const valueLookup = {
            'J': 11,
            'Q': 12,
            'K': 13,
            'A': Number(this.aceValue)
        }
        const faceLookup = {
            11: 'J',
            12: 'Q',
            13: 'K',
            [this.aceValue]: 'A'
        }

        if (swapTo === 'number') {
            return arr.map((val, i) => {
                return { value: isNaN(val) ? valueLookup[val] : Number(val), suit: this.suitArray[i] }
            });
        } else {
            return arr.map((val, i) => {
                return { value: val.value > 10 || val.value == this.aceValue ? faceLookup[val.value] : val.value, suit: val.suit }
            })
        }
    }
}

module.exports = {
    CardSet
}