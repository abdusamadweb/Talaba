import React from 'react'
import './News.scss'
import arrow from "../../assets/images/arrow-icon.svg";
import {useNavigate} from "react-router-dom";
import GetFileDef from "../../components/get-file/GetFileDef.jsx";
import NewsCard from "../../components/cards/news/NewsCard.jsx";

const News = () => {

    const navigate = useNavigate()


    return (
        <div className="news page">
            <div className="container">
                <div className="news__back">
                    <button className="btn" onClick={() => navigate(-1)}>
                        <img src={arrow} alt="icon"/>
                    </button>
                    <span className="txt">Ortga</span>
                </div>
                <div className="news__body">
                    <h3 className="title">{'Nmadr boladi kankret'}</h3>
                    <GetFileDef className='img' id={1} />
                    <p className="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab animi dolore nobis nostrum. At corporis cupiditate eos eveniet facere facilis magnam odio officia, perferendis vel. Deleniti dolore nesciunt quibusdam vitae!</p>
                </div>
                <div className="news__footer">
                    <h4 className="title">Mavzuga oid yangliklar</h4>
                    <div className="list">
                        <NewsCard
                            txt={1}
                            desc={1}
                            img={1}
                        />
                        <NewsCard
                            txt={1}
                            desc={1}
                            img={1}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;