import React, {useState} from 'react';
import './Home.scss'
import {Button, Carousel, Empty, Input, Skeleton} from "antd";
import searchIcon from "../../assets/images/search-icon.svg";
import UniCard from "../../components/cards/univercity/UniCard.jsx";
import uimg from "../../assets/images/test.jpg";
import DirectionCard from "../../components/cards/direction/DirectionCard.jsx";
import dirimg from "../../assets/images/direction/dir-muhandislik.svg";
import NewsCard from "../../components/cards/news/NewsCard.jsx";
import newsimg from '../../assets/images/news-test.png'
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {$resp} from "../../api/apiResp.js";


const fetchUniversity = async (params) => {
    const { data } = await $resp.get('/university/all', { params })
    return data
}
const fetchDirections = async () => {
    const { data } = await $resp.get('/main-direction/all')
    return data
}

const Home = () => {

    const navigate = useNavigate()

    const [size, setSize] = useState(10)

    // fetch data
    const { data, isLoading } = useQuery({
        queryKey: ['universityData', size],
        queryFn: () => fetchUniversity({ page: 1, size }),
        keepPreviousData: true
    })

    const { data: directions } = useQuery({
        queryKey: ['directions', size],
        queryFn: () => fetchDirections(),
        keepPreviousData: true
    })


    return (
        <div className='home page'>
            <div className="container">
                <div className="home__head">
                    <div className="titles">
                        <h2 className="titles__title">Talaba Portal bilan</h2>
                        <p className='titles__desc'>o’zingiz hohlagan OTMni toping!</p>
                    </div>
                    <div className='search-filter' onClick={() => navigate('/search')}>
                        <Input
                            size="large"
                            prefix={<img src={searchIcon} alt='icon'></img>}
                            placeholder="OTM yoki ta’lim yo’nalishlarini qidiring..."
                        />
                    </div>
                </div>
                <div className="university">
                    <ul className="university-list">
                        {
                            isLoading ? <div className='p1 pb3'>
                                    <Skeleton active/> <br/>
                                    <Skeleton active/> <br/>
                                    <Skeleton active/>
                                </div>
                                :
                                data?.data.length ?
                                    data?.data.map((i, index) => (
                                        <UniCard key={index} i={i}/>
                                    ))
                                    : <Empty description={false}/>
                        }
                    </ul>
                    {
                        data?.data.length > 9 &&
                        <Button
                            className='university__btn'
                            loading={isLoading}
                            size='large'
                            onClick={() => setSize(+size + 10)}
                        >
                            KO’PROQ UNIVERSITETLAR
                        </Button>
                    }
                </div>
                <div className="apply">
                    <h2 className="apply__title">1 millon nafar universitet talabalariga qo’shiling</h2>
                    <button className='apply__btn' onClick={() => navigate('/search')}>Hujjat topshirish</button>
                </div>
                <div className="direction">
                    <h2 className='direction__title'>Yo’nalishlar</h2>
                    <ul className='direction__list'>
                        {
                            directions?.length ?
                                directions?.map((i, index) => (
                                    <DirectionCard
                                        key={index}
                                        img={dirimg}
                                        txt={i.name}
                                        id={i.id}
                                    />
                                ))
                                : <Empty description={false} />
                        }
                    </ul>
                </div>
                <div className="news">
                    <h2 className="news__title">So’ngi yangliklar</h2>
                    <div className="news__slider">
                        <Carousel arrows infinite autoplay autoplaySpeed={5000}>
                            <NewsCard
                                img={newsimg}
                                txt='Chet tili imtihoni uchun ruxsatnomalar taqdim etildi.'
                                desc='Chet tili (turk tili)ni bilish darajasini
                                aniqlash bo‘yicha bo‘lib o‘tadigan.....'
                            />
                            <NewsCard
                                img={uimg}
                                txt='Chet tili imtihoni uchun ruxsatnomalar taqdim etildi.'
                                desc='Chet tili (turk tili)ni bilish darajasini
                                aniqlash bo‘yicha bo‘lib o‘tadigan.....'
                            />
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;