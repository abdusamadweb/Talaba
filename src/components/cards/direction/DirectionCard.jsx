import React from 'react';
import './Direction.scss'

const DirectionCard = ({ img, txt }) => {
    return (
        <div className='direction-card'>
            <span className='img'>
                <img src={img} alt="direction-img"/>
            </span>
            <span className='txt'>{txt}</span>
        </div>
    );
};

export default DirectionCard;