
//mergeSort adapted from http://blog.benoitvallon.com/sorting-algorithms-in-javascript/the-merge-sort-algorithm/

const mergeSort = (array, sortBy, direction) => {

    return mergeSortTopDown(array)

    function mergeSortTopDown(array) {
        if (array.length < 2) {
            return array;
        }

        let middle = Math.floor(array.length / 2);
        let left = array.slice(0, middle);
        let right = array.slice(middle);

        return mergeTopDown(mergeSortTopDown(left), mergeSortTopDown(right));
    }

    function mergeTopDown(left, right) {
        let array = [];

        while (left.length && right.length) {
            if (direction === 'asc') {
                if (left[0][sortBy] <= right[0][sortBy]) {
                    array.push(left.shift());
                } else {
                    array.push(right.shift());
                }
            } else {
                if (left[0][sortBy] >= right[0][sortBy]) {
                    array.push(left.shift());
                } else {
                    array.push(right.shift());
                }
            }
        }
        return array.concat(left.slice()).concat(right.slice());
    }

}

//insertionSort adapted from http://blog.benoitvallon.com/sorting-algorithms-in-javascript/the-insertion-sort-algorithm/


const insertionSort = (array, sortBy, direction) => {

    for (let i = 0; i < array.length; i++) {
        let temp = array[i];
        let j = i - 1;

        if (direction === 'asc') {
            while (j >= 0 && array[j][sortBy] > temp[sortBy]) {
                array[j + 1] = array[j];
                j--;
            }
        } else {
            while (j >= 0 && array[j][sortBy] < temp[sortBy]) {
                array[j + 1] = array[j];
                j--;
            }
        }
        array[j + 1] = temp;
    }

    return array;
}


const hybridSort = (array, sortBy, direction) => {

    const lowerThreshold = 500

    return mergeSortTopDown(array)

    function mergeSortTopDown(array) {

        if (array.length <= lowerThreshold) {
            return insertionSort(array, sortBy, direction)
        }

        let middle = Math.floor(array.length / 2);
        let left = array.slice(0, middle);
        let right = array.slice(middle);


        return mergeTopDown(mergeSortTopDown(left), mergeSortTopDown(right));
    }

    function mergeTopDown(left, right) {
        let array = [];

        while (left.length && right.length) {
            if (direction === 'asc') {
                if (left[0][sortBy] <= right[0][sortBy]) {
                    array.push(left.shift());
                } else {
                    array.push(right.shift());
                }
            } else {
                if (left[0][sortBy] >= right[0][sortBy]) {
                    array.push(left.shift());
                } else {
                    array.push(right.shift());
                }
            }
        }
        return array.concat(left.slice()).concat(right.slice());
    }

}

module.exports = {
    mergeSort,
    insertionSort,
    hybridSort
}