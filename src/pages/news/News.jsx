import React from 'react'
import './News.scss'
import arrow from "../../assets/images/arrow-icon.svg";
import {useNavigate, useParams} from "react-router-dom";
import GetFileDef from "../../components/get-file/GetFileDef.jsx";
import NewsCard from "../../components/cards/news/NewsCard.jsx";
import {$resp} from "../../api/apiResp.js";
import {useQuery} from "@tanstack/react-query";
import {Empty, Skeleton} from "antd";
import UniCard from "../../components/cards/univercity/UniCard.jsx";

const fetchNews = async (id) => {
    const { data } = await $resp.get(`/news/get/${id}`)
    return data
}

const fetchNewsOther = async (params) => {
    const { data } = await $resp.get('/news/all', { params })
    return data
}

const News = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    // fetch data
    const { data, isLoading } = useQuery({
        queryKey: ['news', id],
        queryFn: () => fetchNews(id),
        keepPreviousData: true
    })

    // fetch news other
    const { data: other, isLoading: otherLoading } = useQuery({
        queryKey: ['news-others', id],
        queryFn: () => fetchNewsOther({ page: 1, size: 20, with_out_id: id }),
        keepPreviousData: true
    })


    return (
        <div className="news page">
            <div className="container">
                <div className="news__back">
                    <button className="btn" onClick={() => navigate(-1)}>
                        <img src={arrow} alt="icon"/>
                    </button>
                    <span className="txt">Ortga</span>
                </div>
                {
                    isLoading ? <div className='p1 pb3'>
                            <Skeleton active/> <br/>
                            <Skeleton active/> <br/>
                            <Skeleton active/>
                        </div>
                        :
                        <div className="news__body">
                            <h3 className="title">{ data?.data?.title }</h3>
                            <GetFileDef className='img' id={data?.data?.photo_ids?.[0].id}/>
                            <p className="desc">{ data?.data?.desc }</p>
                        </div>
                }
                <div className="news__footer">
                    <h4 className="title">Mavzuga oid yangliklar</h4>
                    <ul className="list">
                        {
                            otherLoading ? <div className='p1 pb3'>
                                    <Skeleton active/> <br/>
                                    <Skeleton active/> <br/>
                                    <Skeleton active/>
                                </div>
                                :
                                other?.data.length ?
                                    other?.data.map((i, index) => (
                                        <NewsCard
                                            key={index}
                                            id={i?.id}
                                            txt={1}
                                            desc={1}
                                            img={1}
                                        />
                                    ))
                                    : <Empty description={false}/>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default News;