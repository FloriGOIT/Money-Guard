const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const fs = require("fs").promises;
const path = require("path");
const PORT = 5000;
const {nanoid} = require("nanoid")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cookieParser());



/*
const isTestSuccesfull = false;

const promiseTest = new Promise((resolve, reject) => {
  if (isTestSuccesfull) {
    resolve("Test was successfully");
  } else {
    reject("Test failed.");
  }
});
// varianta 1 then/catch
//promiseTest
//  .then((result) => console.log(result))
//  .catch((error) => console.log(error))
//  .finally(() => console.info("Test done!"));

// varianta 2 try/catch

const runTest = async () => {
  try {
    const result = await promiseTest;
    console.log(result);
  } catch (error) {
    console.log(error);
        }
        finally{console.log("Test finished.")}
};
runTest();
*/

app.get("/", (req, res) => {
  res.send("Server is up and wrolling!");
});

const infoLocation = path.join(__dirname, "data.json");

app.get("/animals", async (req, res) => {
  try {
    const listAnimals = await fs.readFile(infoLocation, "utf-8");
    console.log("Items listed successfully.")
    res.json(JSON.parse(listAnimals));
  } catch (error) {
          console.log("Error when trying to list the animals", error);
          res.json({message:"There has been an error when listing the information. Please recheck!"})
  }
});

app.post("/animals",async (req, res) => {
        try {
                const newItem = { id: nanoid(), ...req.body }  
        console.log(newItem)                
                const listAnimals = await fs.readFile(infoLocation, "utf-8");
                console.log(listAnimals)
                const parsedInfo = JSON.parse(listAnimals);
                console.log("parsedInfo",parsedInfo)
             parsedInfo.push(newItem);
                await fs.writeFile(infoLocation, JSON.stringify(parsedInfo,null,2),{encoding:'utf-8'})
                res.json({message: "New item was added."})
         }
        catch (error) {
                console.log("Issue when appending new animal", error);
                res.json({message:"Please recheck your request, the appending failed."})
        }
})

app.listen(PORT, () => {
  console.log("Server is running on port 5000 -path and fs - exercise.");
});
