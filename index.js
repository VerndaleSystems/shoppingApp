import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shoppingapp-694b6-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")


onValue(shoppingListInDB, function(snapshot) {
    let dbArray = Object.values(snapshot.val())
    clearShoppingListEl(shoppingListEl)
    for (let i = 0; i < dbArray.length; i++)
    addItemToShoppingList(shoppingListEl, dbArray[i])
})


addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    clearFormField(inputFieldEl)
})


function addItemToShoppingList(shoppingList, inputValue){
    shoppingList.innerHTML += `<li>${inputValue}</li>`
}


function clearShoppingListEl(list) {
    list.innerHTML = ""
}


function clearFormField(formField){
    //clear string form fields
    formField.value = ""
}