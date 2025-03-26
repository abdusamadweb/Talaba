import React from 'react';
import {Carousel, Empty, Skeleton} from "antd";
import NewsCard from "../../components/cards/news/NewsCard.jsx";
import newsimg from "../../assets/images/news-test.png";
import uimg from "../../assets/images/test.jpg";
import {$resp} from "../../api/apiResp.js";
import {useQuery} from "@tanstack/react-query";
import UniCard from "../../components/cards/univercity/UniCard.jsx";

const fetchNews = async (params) => {
    const { data } = await $resp.get('/news/all', { params })
    return data
}

const HomeNews = () => {

    // fetch data
    const { data, isLoading } = useQuery({
        queryKey: ['news'],
        queryFn: () => fetchNews({ page: 1, size: 20 }),
        keepPreviousData: true
    })
    console.log(data)


    return (
        <div className="home-news">
            <h2 className="home-news__title">So’ngi yangliklar</h2>
            <div className="home-news__slider">
                {
                    isLoading ? <div className='p1 pb3'>
                            <Skeleton active/> <br/>
                            <Skeleton active/> <br/>
                            <Skeleton active/>
                        </div>
                        :
                        <Carousel arrows infinite autoplay autoplaySpeed={5000}>
                            {
                                data?.data.length ?
                                    data?.data.map((i, index) => (
                                        <NewsCard
                                            key={index}
                                            img={i?.attachments?.[0].id}
                                            txt={i?.title}
                                            desc={i?.desc}
                                        />
                                    ))
                                    : <Empty description={false}/>
                            }
                        </Carousel>
                }
            </div>
        </div>
    );
};

export default HomeNews;