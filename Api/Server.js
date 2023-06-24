require('dotenv').config();
const { handelSCRL, GSCRL, PPOST, GCATEPOST, DPOST,GMPOST,GCATEPTS,GSCRH } = require("./Handel/Main")
const express = require("express")
const app = express()
const bodyParser = require('body-parser');

const multer = require('multer');
const upload = multer();
const cors = require("cors");

const cr = {  
  origin: [process.env.ORGIN_ALLOW],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200
};
 
app.use(cors(cr))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


 
app.post(process.env.PSCRL, upload.single("image"), handelSCRL)

app.get(process.env.GSCRL, GSCRL)

app.post(process.env.PPOST, upload.single("image"), PPOST)
  
app.get(process.env.GCATEPOST, GCATEPOST)

app.delete(process.env.DCATEPOST, DPOST)

app.get(process.env.MPOST,GMPOST)

app.get(process.env.GCATEPTS,GCATEPTS)

app.post(process.env.GSCRH,GSCRH)

app.listen(process.env.API_PORT,process.env.API_IP, () => {
  console.log("yes serrver is start");
}) 