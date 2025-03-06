import React from 'react';
import './NewsCard.scss'
import {Link} from "react-router";
import arrow from '../../../assets/images/arrow-link-icon.svg'

const NewsCard = ({ img, txt, desc }) => {
    return (
        <div className='news-card'>
            <img className='news-card__img' src={img} alt="news-img"/>
            <div className="body">
                <span className='body__txt'>{ txt }</span>
                <p className="body__desc">{ desc }</p>
                <Link className='body__btn' to='/news/'>
                    <span>Batafsil</span>
                    <img src={arrow} alt="arrow"/>
                </Link>
            </div>
        </div>
    );
};

export default NewsCard;