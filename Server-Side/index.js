const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const events = [];


function sortEventsByDateTime(eventsArray) {
    return eventsArray.sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA.getTime() - dateB.getTime();
    });
}

function validateEventData(data) {
    if (!data.title || !data.title.trim()) {
        return 'Title is required';
    }
    if (!data.date) {
        return 'Date is required';
    }
    if (!data.time) {
        return 'Time is required';
    }
    return null;
}

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

app.get('/events', (req, res) => {
    try {
        const sortedEvents = sortEventsByDateTime([...events]);
        res.status(200).json(sortedEvents);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }

})

app.post('/event', (req, res) => {
    try {
        const { id, title, date, time, note, archived, crateAt } = req.body;

        const validationError = validateEventData(req.body);
        if (validationError) {
            return res.status(400).json({ error: validateError });
        }

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
        const eventIndex = events.find(event => event.id === id);
        if (eventIndex === -1) {
            return res.status(404).json({ error: 'event Not found' })
        }

        const deleteEvent = events.splice(eventIndex, 1)[0];

        res.status(200).json({ message: 'Event deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Failed to deleted event' })
    }
});

app.put('/event/:id', (req, res) => {
    const { id } = req.params;
    const { archived } = req.body;
    try {
        const event = events.find(event => event.id === id);
        if (!event) {
            return res.status(404).json({ error: 'event not found' });
        }
        event.archived = archived;
        event.upDateAt = new Date().toISOString();
        console.log(`Archived event: ${event.title}`);
        res.status(200).json(event);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Failed to update event' });
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
