import React from 'react';

const Event = (props) =>
{
    const { event } = props
    const deleteEvent = id =>
    {
        fetch(`https://intense-wildwood-12307.herokuapp.com/event/${ id }`, {
            method: 'delete',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => props.fetchEvents())
            .then(error => console.log(error))
    }
    return (

        <div className="col text-center">
            <img src={event.imageURL} alt="" className="card-img-top" />
            <h5>{event.title}</h5>
            <button onClick={() => deleteEvent(event._id)} className="btn btn-outline-danger btn-sm">Delete</button>
        </div>
    );
};

export default Event;