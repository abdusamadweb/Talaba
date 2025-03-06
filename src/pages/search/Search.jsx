import React, {useState} from 'react';
import './Search.scss'
import {Drawer, Input, Select, Slider} from "antd";
import searchIcon from "../../assets/images/search-icon.svg";
import filterIcon from "../../assets/images/filter-icon.svg";
import ApplyCard from "../../components/cards/apply/ApplyCard.jsx";
import logo from "../../assets/images/apply-logo-test.png";
import bgtest from "../../assets/images/apply-bgi-test.jpg";
import adImg from "../../assets/images/ad-img.png";
import {formatPrice} from "../../assets/scripts/global.js";

const Search = () => {

    const [modal, setModal] = useState(false)
    const [ranges, setRanges] = useState({
        from: 5000000,
        to: 100000000,
    })

    const changeRange = (val) => {
        return setRanges({from: val[0]*1000000, to: val[1]*1000000});
    }

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };


    return (
        <div className='search'>
            <div className="container">
                <div className="search__head">
                    <div className="search-filter ">
                        <Input
                            size="large"
                            prefix={<img src={searchIcon} alt='icon'></img>}
                            placeholder="OTM yoki ta’lim yo’nalishlarini qidiring..."
                        />
                        <button className='filter grid-center' onClick={() => {
                            setModal(true)
                        }}>
                            <img src={filterIcon} alt="icon"/>
                        </button>
                    </div>
                </div>
                <div className="apply">
                    <ul className="apply__list">
                        <ApplyCard
                            title='Iqtisodiyot va pedagogika universiteti'
                            name='Biznes boshqaruvi'
                            logo={logo}
                            bgImg={bgtest}
                            lang='O’zbek tili'
                            edu='Kunduzgi / Sirtqi'
                            contract={35000000}
                            close
                        />
                        <ApplyCard ad={adImg}/>
                    </ul>
                </div>
            </div>
            <Drawer
                className='filter-modal'
                placement='bottom'
                closable={false}
                onClose={() => setModal(false)}
                open={modal}
                key='bottom'
            >
                <span className='line'/>
                <h3 className="title">Ta’lim narxi</h3>
                <div className="range">
                    <Slider
                        range
                        step={5}
                        defaultValue={[5, 100]}
                        onChange={changeRange}
                    />
                    <div className="row between">
                        <span className='txt'>{ formatPrice(ranges.from) || 0 } UZS</span>
                        <span className='txt'>{ formatPrice(ranges.to) || 0 } UZS</span>
                    </div>
                </div>
                <div className="select">
                    <span className='select__txt'>Manzil</span>
                    <Select
                        defaultValue="lucy"
                        onChange={handleChange}
                        options={[
                            {
                                value: 'jack',
                                label: 'Jack',
                            },
                            {
                                value: 'lucy',
                                label: 'Lucy',
                            },
                        ]}
                    />
                </div>
            </Drawer>
        </div>
    );
};

export default Search;