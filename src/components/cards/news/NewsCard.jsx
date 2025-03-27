import React from 'react';
import './NewsCard.scss'
import {Link} from "react-router-dom"
import arrow from '../../../assets/images/arrow-link-icon.svg'
import GetFileDef from "../../get-file/GetFileDef.jsx";

const NewsCard = ({ id, img, txt, desc }) => {
    return (
        <div className='news-card'>
            <GetFileDef className='news-card__img' id={img} />
            <div className="body">
                <span className='body__txt'>{ txt }</span>
                <p className="body__desc">{ desc }</p>
                <Link className='body__btn' to={`/news/${id}`}>
                    <span>Batafsil</span>
                    <img src={arrow} alt="arrow"/>
                </Link>
            </div>
        </div>
    );
};

export default NewsCard;