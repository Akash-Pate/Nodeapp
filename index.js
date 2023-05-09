const express = require("express");
const con = require("./config");
const bodyParser = require('body-parser')
const app = express();

const port = 4000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('connection'));

app.get("/", (req, resp) => {
    con.query("select * from personal", (err, result) => {
        if (err) {
            resp.send("error")
        } else {
            resp.send(result);
        }
    });
});


app.post('/my-endpoint', (req, res) => {
    const data = req.body;
    con.query('INSERT INTO personal set ? ', data, (error, results, fields) => {
        if (error) throw error;
        res.send('Data saved to database!');
    });
});

app.put("/:id", (req, resp) => {
    const data = [req.body.name, req.body.birth_date, req.body.phone, req.body.city, req.params.id];
    con.query('UPDATE personal SET name = ?, birth_date = ?, phone = ?, city = ? where id = ?', data, (error, results, fields) => {
        if (error) throw error;
        resp.send(results);
    });
});

app.delete("/:id",(req,resp)=>{
    con.query('DELETE from personal WHERE id ='+req.params.id,(error, results, fields)=> {
        if (error) throw error;
        resp.send(results);
    }) 
})



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});