import React, { useEffect, useState } from 'react';
import Event from '../Event/Event';

const Home = () =>
{
    const [events, setEvents] = useState([])

    const fetchEvents = () =>
    {
        fetch(`https://intense-wildwood-12307.herokuapp.com/events`)
            .then(res => res.json())
            .then(data => setEvents(data))
    }

    useEffect(() =>
    {
        fetchEvents()
    }, [])
    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {
                    events.map(event => <Event key={event._id} event={event} fetchEvents={fetchEvents} />)
                }
            </div>
        </div>
    );
};

export default Home;