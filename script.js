
const array = [];
const arraySize = 30; //size of the array

function generateRandomArray() {
    array.length = 0;
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 100) + 10); // Random values between 10 and 110
    }
}

function displayArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = ''; 

    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement('div');
        bar.classList.add('array-bar');
        bar.style.height = `${array[i]}px`;
        bar.style.width = `${100 / arraySize}%`;
        container.appendChild(bar);
    }
}

// Merge Sort logic with visualization
async function mergeSort(arr, l, r) {
    if (l >= r) return;

    const m = l + Math.floor((r - l) / 2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
}

async function merge(arr, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;
    const left = arr.slice(l, m + 1);
    const right = arr.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2) {
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;
        }
        await visualizeArrayUpdate(arr, k);
        k++;
    }

    while (i < n1) {
        arr[k] = left[i];
        await visualizeArrayUpdate(arr, k);
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = right[j];
        await visualizeArrayUpdate(arr, k);
        j++;
        k++;
    }
}

async function visualizeArrayUpdate(arr, index) {
    displayArray();
    const bars = document.getElementsByClassName('array-bar');
    bars[index].style.backgroundColor = 'red'; // Highlight the current element being sorted
    await new Promise(resolve => setTimeout(resolve, 200)); // Slow down to visualize
    bars[index].style.backgroundColor = '#6eb0d9'; // Restore the color after sorting
}

// Start sorting and visualization
async function startMergeSort() {
    await mergeSort(array, 0, array.length - 1);
}

// Initialize
generateRandomArray();
displayArray();

