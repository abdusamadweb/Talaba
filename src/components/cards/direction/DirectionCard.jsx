import React from 'react';
import './Direction.scss'

const DirectionCard = ({ id, img, txt }) => {
    return (
        <li className='direction-card'>
            <span className='img'>
                <img src={img} alt="direction-img"/>
            </span>
            <span className='txt'>{txt}</span>
        </li>
    );
};

export default DirectionCard;