const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;

const path = "todo_db.txt";
const port = 8080;

class TodoItems {
    constructor(items) {
        this.items = items ?? [];
    }

    static async load(path) {
        try {
            const data = JSON.parse(await fs.readFile(path));
            if (Array.isArray(data)) return new TodoItems(data);
            else return null;
        } catch { return null; }
    }

    async save(path) {
        try {
            await fs.writeFile(path, JSON.stringify(this.items));
            return true;
        } catch (e) { 
            console.error(e)
            return false; 
        }
    }

    get_items() {
        return this.items;
    }

    add_item(item) {
        this.items.push(item);
    }

    del_item(item) {
        const idx = this.items.indexOf(item);

        if (idx === -1) return false;

        this.items.splice(idx, 1);
        return true;
    }
}

main();

async function main() {
    const todo_items = (await (TodoItems.load(path))) ?? new TodoItems();
    const app = express();

    app.use(express.json());

    // Allow all requests (insecure but it is a todo app).
    app.use(cors());

    app.get("/items", (_, res) => {
        res.send(todo_items.get_items());
    });

    app.post("/items", (req, res) => {
        todo_items.add_item(req.body.item);
        todo_items.save(path);
        res.status(204).send();
    });

    app.delete("/items", (req, res) => {
    todo_items.del_item(req.body.item);
    todo_items.save(path);
    res.status(204).send();
    });

    app.listen(port);
}