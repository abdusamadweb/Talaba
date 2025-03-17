import React from 'react';
import './UniCard.scss'
import overlay from '../../../assets/images/overlay.png'

const UniCard = ({ i }) => {

    return (
        <li className='uni-card'>
            <div className="head row align-center r1">
                <div className="head__img">
                    <img src={i.logo} alt="univercity-logo"/>
                </div>
                <div>
                    <span className='head__name'>{i.name}</span>
                    <span className='head__city'>{ i.address }</span>
                </div>
            </div>
            <div className="body">
                <img className="body__overlay" src={overlay} alt='overlay'/>
                <img className='img' src={i.img} alt="image"/>
                <p className="body__desc">{ i.desc }</p>
            </div>
        </li>
    );
};

export default UniCard;