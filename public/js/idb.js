let db;

const request = indexedDB.open('budget_tracker', 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new_deposit', { autoIncrement: true });
};

request.onsuccess = function(event) {
    db = event.target.result;
    
    if (navigator.onLine) {
        uploadDeposit();
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
};

// this function will be used if the fetch function's catch methods are executed
function saveDeposit(deposit) {
    const transaction = db.transaction(['new_deposit'], 'readwrite');
    const depositObjectStore = transaction.objectStore('new_deposit');
    depositObjectStore.add(deposit);
};