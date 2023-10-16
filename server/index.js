const express = require("express");
const cors = require("cors");
const app = express();

const port = 8080;

let todo_items = [];

app.use(express.json());

// Allow all requests (insecure but it is a todo app).
app.use(cors());

app.get("/items", (_, res) => {
    res.send(todo_items);
});

app.post("/items", (req, res) => {
    todo_items.push(req.body.item);
    res.status(204).send();
});

app.delete("/items", (req, res) => {
   const idx = todo_items.indexOf(req.body.item);

   if (idx !== -1) {
        todo_items.splice(idx, 1);
   }

   res.status(204).send();
})

app.listen(port);