
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"}
];

app.get("/", (req,res)=>{
    res.send("Hello World");
});

app.get("/api/courses", (req,res)=>{
    res.send(courses);
});

app.post("/api/courses", (req,res)=>{
if (!req.body.name || req.body.name.length < 3) {
    return res.status(400).send("Name required and must be minimum of 3 characters")
}

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
    // console.log(course)
});


app.get("/api/courses/:id", (req,res)=>{
    const _course = courses.find(course => course.id === parseInt(req.params.id));
    if (!_course) {
       return res.status(404).send("The requested course is not available");

    }else return res.send(_course); 
});

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`App listening to port ${port}....`);
});