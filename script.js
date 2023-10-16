import { get_list_items, add_list_item, del_list_item } from "./todo.js";

const ol = document.getElementById("todo-items");

// Add an item to the <ol>
function add_todo_item(item) {
    // Create an <li> and set its content to the todo item
    const item_element = document.createElement("li");
    item_element.textContent = item;

    // Add the element to the <ol> (right now, it only really
    // exists virtually in JavaScript)
    ol.appendChild(item_element);

    // Add an event listener to change the colour to red
    // (so users know they are deleting the element)
    item_element.addEventListener("mouseover", () => {
        item_element.style.color = "red";
        item_element.style.textDecoration = "line-through";
    });

    // Reverse the colour change
    item_element.addEventListener("mouseleave", () => {
        item_element.style.removeProperty("color");
        item_element.style.removeProperty("text-decoration");
    });

    // Add an event listener so users can delete elements
    item_element.addEventListener("click", async () => {
        // Delete the item from the server
        await del_list_item(item);

        // Remove the element from the <ol>
        ol.removeChild(item_element);
    });
}

// Returns an array of strings
const initial_items = await get_list_items();

for (const item of initial_items) {
    add_todo_item(item);
}

document.getElementById("btn").addEventListener("click", async function(ev) {
    let item_text = document.getElementById("todoinput").value;
    document.getElementById("todoinput").value = "";
    await add_list_item(item_text);
    add_todo_item(item_text);
});

