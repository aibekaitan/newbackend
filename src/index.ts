import express from 'express'
const app = express()
const port = 3000
const db = {
    courses:[
        {id: 1, title: 'front-end'},
        {id: 2, title: 'back-end'},
        {id: 3, title: 'automation qa'},
        {id: 4, title: 'devops'}
    ]
}

const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

app.get('/courses', (req, res) => {
    let foundCourses = db.courses
    if(req.query.title){
        foundCourses = foundCourses
            .filter(c => c.title.indexOf(req.query.title as string) > -1)
    }



    res.json(foundCourses)
})
app.get('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(c => c.id === +req.params.id);
    if(!foundCourse){
        res.sendStatus(404)
        return ;
    }


    res.json(foundCourse)
})
app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(c => c.id !== +req.params.id);
    res.sendStatus(204)
})
app.post('/courses', (req, res) =>{
    if(!req.body.title){
        res.sendStatus(400)
        return;
    }
    const createdCourse = {
        id: +(new Date()),
        title: req.body.title
    };
    db.courses.push(createdCourse)
    res.status(201).json(createdCourse)

})

app.put('/courses/:id', (req, res) => {
    if(!req.body.title){
        res.sendStatus(400)
        return ;
    }

    const foundCourse = db.courses.find(c => c.id === +req.params.id);
    if(!foundCourse){
        res.sendStatus(404)
        return;
    }
    foundCourse.title = req.body.title

    res.sendStatus(204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

