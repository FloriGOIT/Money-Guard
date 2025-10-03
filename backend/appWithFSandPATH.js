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
  res.send("Server is up and workoking!");
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
     //definesc noul animal, aduc lista exitenta, populez lista existenta, o salvez pe cea noua
  const newAnimal = { id: nanoid(), ...req.body };
  const currentList = await fs.readFile(infoLocation, "utf-8");
    const parseCurrentList = JSON.parse(currentList);
    const isDupicated = parseCurrentList.findIndex(el => el.animal === newAnimal.animal);
    if(isDupicated === -1){parseCurrentList.push(newAnimal);
    }
    else {
      parseCurrentList.splice(isDupicated, 1, newAnimal); 
    }
        await fs.writeFile(infoLocation, JSON.stringify(parseCurrentList, null, 2), { encoding: "utf-8" });
  res.status(200).json({ "message": "New animal was added in the list."})
  }
  catch(error){res.json({ "message": "Please recheck your request, the appending failed." });}

})

app.delete("/animals/:name", async (req, res) => {
  //identific animalul din site; aduc lista curenta si sterg animalul; salvez noua lista
  try {
    const identifiedAnimal = req.params.name;
  const currentList = await fs.readFile(infoLocation, "utf-8");
  const parseCurrentList = JSON.parse(currentList);
  const indexAnimal = parseCurrentList.findIndex(el => el.animal === identifiedAnimal);
  if (indexAnimal === -1) { res.json({ "message": "No item found with this name" }) }
  else {
    parseCurrentList.splice(indexAnimal, 1);
    await fs.writeFile(infoLocation, JSON.stringify(parseCurrentList, null, 2), {encoding:"utf-8"})
    res.json({ "message": "Item was deleted." })
  }
  }
  catch(error){res.json({ "message": "Please recheck your request and try again." })}

})

app.listen(PORT, () => {
  console.log("Server is running on port 5000 -path and fs - exercise.");
});

/*
app.post("/animals", async (req, res) => {
  try {
    const newItem = { id: nanoid(), ...req.body };
    const listAnimals = await fs.readFile(infoLocation, "utf-8");
    const parsedInfo = JSON.parse(listAnimals);
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
*/