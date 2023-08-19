const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const authRoutes = require("./routes/jwtAuth");
const dashboardRoutes = require("./routes/dashboard");
const projectRoutes = require("./routes/projects");
const taskRoutes = require("./routes/tasks");
const sheetsRoutes = require("./routes/sheets");
const drawImageRoutes = require("./routes/DrawOnImage");
const userProjectRoutes = require("./routes/userProjects");

const cors = require("cors");

const PORT = 5000;

//middleware

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes

//Register and login Routes
app.use("/auth", authRoutes);

//dashboard Routes
app.use("/dashboard", dashboardRoutes);

//Project Management Routes
app.use("/projects", projectRoutes);

//Task Management Routes
app.use("/projects", taskRoutes);

//Sheets Routes
app.use("/projects", sheetsRoutes);

//UserProjects Routes

//Draw on Image(Image upload to canvas) Routes
app.use("/draw-on-image", drawImageRoutes);

//Start the server
app.listen(PORT, () => {
  console.log(`Server started on port: http://localhost:${PORT}`);
});
