import React, { useEffect, useState } from 'react';
// import { config } from 'dotenv';
import NavBar from "./NavBar";

const NasaPhoto = () => {

    // config({path: '../../config/config.env'})

    const [photoData, setPhotoData] = useState(null)
    const API_KEY = process.env.REACT_APP_NASA_KEY

    useEffect(() => {
        fetchPhoto()
        async function fetchPhoto() {
            const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
            const data = await res.json()
            setPhotoData(data)
        }
    }, []);

    if(!photoData) return <div/>
    return (
        <>
        <NavBar/>
        <div className='nasa-photo'>
            {photoData.media_type === "image" ? (
            <img 
                src={ photoData.url } 
                alt={ photoData.title } 
                className="photo" 
            />)
            :
            (
                <iframe 
                src={ photoData.url }
                title='space-video'
                // gesture='media' 
                frameBorder="0"
                allow="autoplay"

                allowFullScreen
                className="photo"
                />
            )}
            <div>
                <h1>{photoData.title}</h1>
                <p className="date">{photoData.date}</p>
                <p className="explanation">{photoData.explanation}</p>
            </div>
        </div>
        </>
    )
}

export default NasaPhoto
