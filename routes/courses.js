
const express = require('express');
const router = express.Router();


const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
    { id: 4, name: 'course4' },

]

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    let course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with the given ID was not found');
    } else {
        res.send(course);
    }
});


//http://localhost:3000/api/courses/2/hola
// app.get('/api/courses/:id/:name', (req, res) => {
//     res.send(req.params);
// req.query son los query parameters ?sortBy=Name
// });

//curl -d '{"name":"course101"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/courses
router.post('/', (req, res) => {

    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//curl -d '{"name":"renombrando curso 1"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/api/courses/1
router.put('/:id', (req, res) => {
    let course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course with the given ID was not found');
    }

    // const result = validateCourse(req.body);    
    //se puede desestructurar el objeto result en sus propiedades
    const { error } = validateCourse(req.body);

    // if (result.error) {
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    course.name = req.body.name;
    res.send(course);

});



router.delete('/:id', (req, res) => {
    let course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found');
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

});
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

module.exports = router;