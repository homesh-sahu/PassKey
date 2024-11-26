import express from "express";
import 'dotenv/config';
import { Collection, MongoClient } from "mongodb";
import bodyParser from "body-parser";
import cors from 'cors';

const connectionString = "mongodb://localhost:27017/";
const client = new MongoClient(connectionString);
const dbname = "passkey"

const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

client.connect();

// Fetching all the passwords
app.get("/",async (req, res) => {
    const db = client.db(dbname);
    const collection = db.collection("passwords");
    const data = await collection.find({}).toArray();
    res.json(data);
})

// Inserting a new password
app.post("/",async (req, res) => {
    const data = req.body;
    const db = client.db(dbname);
    const collection = db.collection("passwords");
    await collection.insertOne(data);
    res.send({ success:true });
})

// Deleting a password
app.delete("/",async (req, res) => {
    const data = req.body;
    const db = client.db(dbname);
    const collection = db.collection("passwords");
    await collection.deleteOne(data);
    res.send({ success:true });
})



app.listen(port,()=>{
    console.log("Server Initialised");
})