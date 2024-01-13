import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
    if (snapshot.exists()){
        let dbArray = Object.entries(snapshot.val())

        clearShoppingListEl(shoppingListEl)

        for (let i = 0; i < dbArray.length; i++){
            addItemToShoppingList(shoppingListEl, dbArray[i])
        }
    } else {
        shoppingListEl.innerHTML = "Your shopping list is empty"
    }
    
})


addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    clearFormField(inputFieldEl)
})


function addItemToShoppingList(listEl, item){
    let itemID = item[0]
    let itemValue = item[1]
    //let dbLocationName = listEl.id
    
    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener('click', function(){
        let exactLocationInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationInDB)
    })

    listEl.append(newEl)
}


function clearShoppingListEl(list) {
    list.innerHTML = ""
}


function clearFormField(formField){
    //clear string form fields
    formField.value = ""
}