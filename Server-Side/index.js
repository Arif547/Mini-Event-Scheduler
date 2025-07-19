const express = require('express')
const app = express()
const cors = require('cors');
const port = 3000

app.use(cors());
app.use(express.json());


const events = [
    { title: 'Facilis qui non enim', date: '2025-07-20', time: '16:53', note: 'Animi exercitatione' },
    { title: 'React Workshop', date: '2025-07-22', time: '10:00', note: 'Advanced hooks and routing' }
];

app.get('/', (req, res) => {
    res.send('Event server Create')
})

app.get('/event', (req, res) => {
    res.json(events);
})
app.post('/event', (req, res) => {
    const event = req.body;
    events.push(event);
    res.status(201).json(event);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
