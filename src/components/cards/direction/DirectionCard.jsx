import React from 'react'
import './Direction.scss'

const images = import.meta.glob('../../../assets/images/direction/*.svg', { eager: true, import: 'default' })

const flags = Object.keys(images).reduce((acc, path) => {
    const key = path.split('/').pop().split('.')[0] // dir1, dir2, ...
    acc[key] = images[path]
    return acc
}, {})

const DirectionCard = ({ id, flag, txt }) => {
    return (
        <li className='direction-card'>
            <span className='img'>
                <img src={flags[flag]} alt="direction-img"/>
            </span>
            <span className='txt'>{txt}</span>
        </li>
    );
};

export default DirectionCard;