const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const fs = require("fs").promises;
const path = require("path");
const PORT = 5000;
const { nanoid } = require("nanoid");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cookieParser());

const APIcall =
  "https://pixabay.com/api/?key=42799638-b50871d8c9a958480a9d6ba7c&q=london&image_type=photo&pretty=true&per_page=4";
/*
//new Promise(()=>{})
const fetchData = new Promise((resolve, reject) => {
  fetch(APIcall).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      reject("Network issues when fetching data.");
    }
  }).then(data => resolve(data))
   .catch(error=>reject(error))
});
fetchData.then(data => { const info = data.hits.map(el => ({ id: el.id, type: el.type, likes: el.likes })); console.log("Selected info:", info) })
  .catch(error => console.log("Error !!!"))
         .finally(()=>console.log("I did it!!"))


//try catch
const fetchdata = async () => {
  try {
    const getData = await fetch(APIcall);
    if (getData.ok) {
      const prelucratedData = await getData.json();
      const selection = prelucratedData.hits.map(el => ({ id: el.id, type: el.type, likes: el.likes })); console.log(selection)
    }
    else{throw Error("Error parsing data!")}
   }
  catch (error) {console.log("Erroring:", error)}
  finally{console.log("Go go dolls!")}
}
fetchdata()
*/

 
app.get("/", (req, res) => {
  res.send("Server is up and wrolling!");
});

const infoLocation = path.join(__dirname, "data.json");

app.get("/animals", async (req, res) => {
  try {
    const listAnimals = await fs.readFile(infoLocation, "utf-8");
    console.log("Items listed successfully.");
    res.json(JSON.parse(listAnimals));
  } catch (error) {
    console.log("Error when trying to list the animals", error);
    res.json({
      message:
        "There has been an error when listing the information. Please recheck!",
    });
  }
});

app.post("/animals", async (req, res) => {
  try {
    const newItem = { id: nanoid(), ...req.body };
    console.log(newItem);
    const listAnimals = await fs.readFile(infoLocation, "utf-8");
    console.log(listAnimals);
    const parsedInfo = JSON.parse(listAnimals);
    console.log("parsedInfo", parsedInfo);
    parsedInfo.push(newItem);
    await fs.writeFile(infoLocation, JSON.stringify(parsedInfo, null, 2), {
      encoding: "utf-8",
    });
    res.json({ message: "New item was added." });
  } catch (error) {
    console.log("Issue when appending new animal", error);
    res.json({ message: "Please recheck your request, the appending failed." });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port 5000 -path and fs - exercise.");
});
