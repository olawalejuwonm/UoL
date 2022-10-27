function recLinSearch(array, n, x) {
    if (n<0) {
        return false;
    } else if (array[n] == x) {
        return true;
    } else {
        return recLinSearch(array, n-1, x);
    }
}
    
function LinSearch(array, x) {
    var n = array.length;
    return recLinSearch(array, n-1, x);
} 






function swap(array, i, j) {
    var x = array[j];
    array[j] = array[i];
    array[i] = x;
    return array;
}

function sort(array, r) {
    if (r < 1) {
        return array;
    }
    for (var j = 0; j < r; j++) {
        if (array[j+1] < array[j]){
            swap(array, j, j+1);
        }
    }
    return sort(array, r-1);
}

function bubbleSort(array) {
    var n = array.length;
    return sort(array, n-1);
}














function swap(array, i, j) {
    var x = array[j];
    array[j] = array[i];
    array[i] = x;
    return array;
}

function sort(array, r) {
    if (r < 1) {
        return array;
    }
    sort(array, r-1);
    var j = r;
    while ((array[r] < array[j-1]) && (j > 1)) {
        swap(array, j, j-1)
        j--;
    }
    return array;
}

function insertionSort(array) {
    var n = array.length;
    return sort(array, n-1);
}