import React from 'react';

const YouTube = ({ url }) => {

    const getVideoId = (youtubeUrl) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
        const match = youtubeUrl.match(regExp)
        return (match && match[2].length === 11) ? match[2] : null
    }

    const videoId = getVideoId(url)

    if (!videoId) return <div>Not a valid YouTube link</div>


    return (
        <div className='iframe'>
            <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                title="YouTube video"
            />
        </div>
    );
};

export default YouTube;