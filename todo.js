// This function is asynchronous -- to use it, make sure that all parent
// functions are marked async (just prepend async before function) and 
// use the await keyword -- here is an example:
//
// ```
// document.getElementById("my-element").onclick = async function() {
//     let items = await get_list_items();
//     console.log(items);
// }
// ```
export async function get_list_items() {
    const response = await fetch("http://127.0.0.1:8080/items");
    return await response.json();
}

export function add_list_item(item) {
    return fetch("http://127.0.0.1:8080/items", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ item })
    });
}

export function del_list_item(item) {
    return fetch("http://127.0.0.1:8080/items", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ item })
    });
}