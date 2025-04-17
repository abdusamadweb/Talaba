import React from 'react';
import './NewsCard.scss'
import {Link} from "react-router-dom"
import arrow from '../../../assets/images/arrow-link-icon.svg'
import GetFileDef from "../../get-file/GetFileDef.jsx";

const NewsCard = ({ i }) => {
    return (
        <div className='news-card'>
            <GetFileDef className='news-card__img' id={i?.attachments?.[0].id} odiy />
            <div className="body">
                <span className='body__txt'>{ i?.title }</span>
                <p className="body__desc">{ i?.desc }</p>
                <Link className='body__btn' to={`/news/${i?.id}`}>
                    <span>Batafsil</span>
                    <img src={arrow} alt="arrow"/>
                </Link>
            </div>
        </div>
    );
};

export default NewsCard;