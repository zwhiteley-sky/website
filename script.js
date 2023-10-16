import { add_list_item, del_list_item } from "./todo.js";

document.getElementById("btn").onclick = function() {
    let itemText = document.getElementById("todoinput").value
    document.getElementById("todoinput").value = ""
    console.log(itemText)
}