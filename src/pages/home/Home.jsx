import React from 'react';
import DirectionCard from "../../components/cards/direction/DirectionCard.jsx";
import img from '../../assets/images/direction/dir-muhandislik.svg'
import image from '../../assets/images/test.jpg'
import logo from '../../assets/images/test-icon.svg'
import UniCard from "../../components/cards/univercity/UniCard.jsx";

const Home = () => {
    return (
        <div className='home py3'>
            <div className="container">
                {/*<DirectionCard img={img} txt={'Muhandislik va texnologiya'} />*/}
                <UniCard
                    logo={logo}
                    name='Iqtisodiyot va pedagogika universiteti'
                    city='Qarshi shahri'
                    img={image}
                    desc='O‘zbekistonning poytaxti –Toshkent shahrining yashil hududidada joylashgan, boy ta’lim...'
                />
            </div>
        </div>
    );
};

export default Home;