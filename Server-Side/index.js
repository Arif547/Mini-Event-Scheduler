const express = require('express')
const app = express()
const cors = require('cors');
const port = 3000

app.use(cors());
app.use(express.json());


// const events = [
//     { title: 'Facilis qui non enim', date: '2025-07-20', time: '16:53', note: 'Animi exercitatione' },
//     { title: 'React Workshop', date: '2025-07-22', time: '10:00', note: 'Advanced hooks and routing' }
// ];
const events = [];

function categorizeEvent(title, notes) {
    const text = `${title}`.toLowerCase();

    console.log(text)

    // work keyword
    const workKeyWords = ['meeting', 'project', 'client', 'work', 'office', 'conference', 'presentation', 'deadline'];

    // Personal keywords
    const personalKeywords = ['birthday', 'family', 'friend', 'vacation', 'dinner', 'movie', 'party', 'wedding'];

    if (workKeyWords.some(keyword => text.includes(keyword))) {
        return 'Work';

    }

    if (personalKeywords.some(keyword => text.includes(keyword))) {
        return 'Personal'
    }

    return 'Other'

}

app.get('/', (req, res) => {
    res.send('Event server Create')
})

app.get('/event', (req, res) => {
    res.json(events);
})
// app.post('/event', (req, res) => {
//     const event = req.body;
//     events.push(event);
//     res.status(201).json(event);
// })

app.post('/event', (req, res) => {
    try {
        const { id, title, date, time, note, archived, crateAt } = req.body;

        const newEvent = {
            id,
            title: title.trim(),
            date,
            time,
            note,
            category: categorizeEvent(title),
            archived,
            crateAt
        };
        events.push(newEvent);

        res.status(201).json(newEvent);


    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Failed to create event' });
    }
})

app.delete('/event/:id', (req, res) => {
    const { id } = req.params;
    try {
        const eventIndex = events.findIndex(event => event.id === id);
        if (eventIndex === -1) {
            return res.status(404).json({ error: 'event Not found' })
        }

        const deleteEvent = events.splice(eventIndex, 1)[0];

        res.status(200).json({ message: 'Event deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Failed to deleted event' })
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
