import React from 'react';
import './Home.scss'
import {Input} from "antd";
import searchIcon from "../../assets/images/search-icon.svg";
import UniCard from "../../components/cards/univercity/UniCard.jsx";
import ulogo from "../../assets/images/test-icon.svg";
import uimg from "../../assets/images/test.jpg";
import DirectionCard from "../../components/cards/direction/DirectionCard.jsx";
import dirimg from "../../assets/images/direction/dir-muhandislik.svg";

const Home = () => {
    return (
        <div className='home page'>
            <div className="container">
                <div className="home__head">
                    <div className="titles">
                        <h2 className="titles__title">Talaba Portal bilan</h2>
                        <p className='titles__desc'>o’zingiz hohlagan OTMni toping!</p>
                    </div>
                    <div className='home__search'>
                        <Input
                            size="large"
                            prefix={<img src={searchIcon} alt='icon'></img>}
                            placeholder="OTM yoki ta’lim yo’nalishlarini qidiring..."
                        />
                    </div>
                </div>
                <div className="university">
                    <ul className="university-list">
                        <UniCard
                            logo={ulogo}
                            name='Iqtisodiyot va pedagogika universiteti'
                            city='Qarshi shaxar'
                            img={uimg}
                            desc='O‘zbekistonning poytaxti –Toshkent shahrining yashil hududidada joylashgan, boy ta’lim...'
                        />
                        <UniCard
                            logo={ulogo}
                            name='Iqtisodiyot va pedagogika universiteti'
                            city='Qarshi shaxar'
                            img={uimg}
                            desc='O‘zbekistonning poytaxti –Toshkent shahrining yashil hududidada joylashgan, boy ta’lim...'
                        />
                        <UniCard
                            logo={ulogo}
                            name='Iqtisodiyot va pedagogika universiteti'
                            city='Qarshi shaxar'
                            img={uimg}
                            desc='O‘zbekistonning poytaxti –Toshkent shahrining yashil hududidada joylashgan, boy ta’lim...'
                        />
                    </ul>
                    <button className='university__btn'>KO’PROQ UNIVERSITETLAR</button>
                </div>
                <div className="apply">
                    <h2 className="apply__title">1 millon nafar universitet talabalariga qo’shiling</h2>
                    <button className='apply__btn'>Hujjat topshirish</button>
                </div>
                <div className="direction">
                    <h2 className='direction__title'>Yo’nalishlar</h2>
                    <ul className='direction__list'>
                        <DirectionCard img={dirimg} txt='Biznes, menejment va moliya' />
                        <DirectionCard img={dirimg} txt='Biznes, menejment va moliya' />
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;