const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const dbPath = path.join(__dirname, "./data.db");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");
app.use(express.json());
app.use(cors());
let db = null;
const jwt = require("jsonwebtoken");

const connectDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(9000, () => {
      console.log("Server Running........");
    });
  } catch (e) {
    console.log(`Error:${e.message}`);
  }
};

connectDBAndServer();


const authenticateUser = (req, res, next) => {
  try {
    let jwtToken;
    const authHeader = req.headers["authorization"];
    if (authHeader !== undefined) {
      jwtToken = authHeader.split(" ")[1];
    }

    if (jwtToken === undefined) {
      res.status(401);
      res.send("Invalid JWT Token");
    } else {
      jwt.verify(jwtToken, "MY_ACCESS_TOKEN", async (error, payLoad) => {
        if (error) {
          res.status(401);
          res.send("Invalid JWT Token");
        } else {
          const { email } = payLoad;
          req.email = email;
          next();
        }
      });
    }
  } catch (e) {
    res.status(500);
    res.send("Server Error");
  }
};

// create new user or add user 
app.post("/login", async (req, res) => {
  const { username } = req.body;
  try {
    const userQuery = `SELECT * FROM USER WHERE name='${username}';`;
    const userDb = await db.get(userQuery);
    if (userDb === undefined) {
      let score=0;
      const addUserQuery = `INSERT INTO USER (name,score) 
            VALUES (
               '${username}',
                ${score}
            )
            ;`;
      await db.run(addUserQuery);
      const payLoad = { username };
      const jwtToken = await jwt.sign(payLoad, "MY_ACCESS_TOKEN");
      res.status(200);
      res.json({ jwtToken });
    } else {
        const payLoad = { username };
        const jwtToken = await jwt.sign(payLoad, "MY_ACCESS_TOKEN");
        res.status(200);
        res.json({ jwtToken });
    }
  } catch (e) {
    res.status(500);
    res.json("Server Error");
  }
});

//get leaderboard details
app.get("/leaderboard/:username", authenticateUser,async (req, res) =>{
  try{
    const { username } = req.params;
    
    const topThreeQuery=`SELECT * from USER ORDER BY score DESC LIMIT 3;`;
    const topThreeData=await db.all(topThreeQuery);

    const userDataQuery=`SELECT * from USER  where name='${username}';`;
    const userData=await db.get(userDataQuery);

    topThreeData.push(userData)

    res.status(200);
    res.send(topThreeData);
  }catch (e) {
    res.status(500);
    res.send("Server Error");
  }
})

// add points 
app.get("/addpoint/:username",authenticateUser,async (req, res)=>{
  try{
    const { username } = req.params;
    const updateQuery=`UPDATE USER SET score = score + 1 WHERE name='${username}';`;
    await db.run(updateQuery);
    res.status(200);
    res.send("Point Added");
  }
  catch (e) {
    res.status(500);
    res.send("Server Error");
  }
})