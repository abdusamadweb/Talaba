import React from 'react';
import './UniCard.scss'
import overlay from '../../../assets/images/overlay.png'

const UniCard = ({ logo, name, city, img, desc }) => {
    return (
        <div className='uni-card'>
            <div className="head row align-center r1">
                <div className="head__img">
                    <img src={logo} alt="univercity-logo"/>
                </div>
                <div>
                    <span className='head__name'>{name}</span>
                    <span className='head__city'>{ city }</span>
                </div>
            </div>
            <div className="body">
                <img className="body__overlay" src={overlay} alt='overlay'/>
                <img className='img' src={img} alt="image"/>
                <p className="body__desc">{ desc }</p>
            </div>
        </div>
    );
};

export default UniCard;