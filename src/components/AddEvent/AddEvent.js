import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const AddEvent = () =>
{
    const { register, handleSubmit, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const onSubmit = data =>
    {
        const eventData = {
            title: data.title,
            date: data.date,
            description: data.description,
            imageURL: imageURL
        }

        const url = `https://intense-wildwood-12307.herokuapp.com/addEvent`;

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
            .then(res => console.log('server side', res));
    };
    const handleImageUpload = event =>
    {
        const imageData = new FormData();
        imageData.set('key', '6f945276fc99b3c8bd42c807bdf9df6d');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(response =>
            {
                setImageURL(response.data.data.display_url);
            })
            .catch(error =>
            {
                console.log(error);
            });
    }

    return (
        <div>
            <h1>Add Event</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="title" placeholder="Event title" ref={register({ required: true })} />
                <br />
                {errors.title && <span style={{ color: 'red' }}>This field is required</span>}
                <br />
                <input name="date" type="date" ref={register({ required: true })} />
                <br />
                {errors.date && <span style={{ color: 'red' }}>This field is required</span>}
                <br />
                <input name="description" defaultValue="none" placeholder="Event description" ref={register({ required: true })} />
                <br />
                {errors.description && <span style={{ color: 'red' }}>This field is required</span>}
                <br />
                <input type="file" onChange={handleImageUpload} />
                <br /><br />
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddEvent;