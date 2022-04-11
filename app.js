const express = require('express')
const path = require('path');
const cors = require('cors')
const app = express()
const port = 3000
const freteRouter = require('./src/routes/frete')

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index")
})

app.use("/", freteRouter)

app.listen(process.env.PORT || port, () => {
  console.log(`Server is at http://localhost:${port}`)
})


