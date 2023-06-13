const express = require("express");
const con = require("./config");
const bodyParser = require('body-parser')
const app = express();

const port = 4000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('connection'));

app.get("/test", (req, resp) => {
    try {
        con.query(`SELECT * FROM test`, (err, result) => {
            if (err) {
                resp.status(500).send("Error retrieving test");
            } else {
                resp.status(200).send(result);
            }
        });
    } catch (err) {
        resp.status(500).send("Error retrieving test");
    }
});
  
app.post("/", (req, res) => {
    try {
        const data = req.body;
        con.query(`INSERT INTO test SET ?`, data, (error, results, fields) => {
            if (error) {
                throw error;
            } else {
                res.status(200).send(results);
            }
        });
    } catch (err) {
        res.status(500).send("Error saving data to database");
    }
});
  
app.put("/:id", (req, resp) => {
    try {
        const data = [
            req.body.name,
            req.params.id,
        ];
        con.query(
            `UPDATE test SET name = ?  WHERE id = ?`,
            data,(error, results, fields) => {
                if (error) {
                    throw error;
                } else {
                    resp.status(200).send(results);
                }
                // console.log("Received PUT request at /:id");
                // console.log("Request body:", req.body);
            }
        );  
    } catch (err) {
        resp.status(500).send("Error updating test");
    }
});

app.delete("/:id", (req, resp) => {
    try {
        con.query(
            `DELETE FROM test WHERE id = ` + req.params.id,
            (error, results, fields) => {
                if (error) {
                    throw error;
                } else {
                    resp.status(200).send(results);
                }
            }
        );
    } catch (err) {
        resp.status(500).send("Error deleting test");
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});