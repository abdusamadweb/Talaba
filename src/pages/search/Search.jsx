import React, {useState} from 'react';
import './Search.scss'
import {Collapse, Input, Select, Slider} from "antd";
import searchIcon from "../../assets/images/search-icon.svg";
import ApplyCard from "../../components/cards/apply/ApplyCard.jsx";
import logo from "../../assets/images/apply-logo-test.png";
import bgtest from "../../assets/images/apply-bgi-test.jpg";
import adImg from "../../assets/images/ad-img.png";
import {formatPrice} from "../../assets/scripts/global.js";
import {CaretDownOutlined, CaretRightOutlined} from '@ant-design/icons'

const Option = ({ txt }) => {
    return (
        <div className='option-wrapper'>
            <span>{ txt }</span>
            <div className='circle'>
                <span className='dot' />
            </div>
        </div>
    )
}

const Search = () => {

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
                    </div>
                </div>
                <div className="apply">
                    <Collapse
                        rootClassName='collapse'
                        expandIconPosition='end'
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        items={[
                            {
                                key: '1',
                                label: 'Tanlash',
                                children: <div>
                                    <div className="range">
                                        <Slider
                                            range
                                            step={5}
                                            defaultValue={[5, 100]}
                                            onChange={changeRange}
                                        />
                                        <div className="row between">
                                            <span className='txt'>{formatPrice(ranges.from) || 0} UZS</span>
                                            <span className='txt'>{formatPrice(ranges.to) || 0} UZS</span>
                                        </div>
                                    </div>
                                    <div className="select">
                                        <div className='select-wrapper'>
                                            <span className='select__txt'>Manzil</span>
                                            <Select
                                                size='large'
                                                suffixIcon={<CaretDownOutlined/>}
                                                onChange={handleChange}
                                                placeholder="Manzil"
                                                options={[
                                                    {
                                                        value: 'Toshkent shaxri',
                                                        label: <Option txt='Toshkent shaxri'/>,
                                                    },
                                                    {
                                                        value: 'Jizzax shaxri',
                                                        label: <Option txt='Jizzax shaxri'/>,
                                                    },
                                                ]}
                                            />
                                        </div>
                                        <div className='select-wrapper'>
                                            <span className='select__txt'>Ta’lim yo’nalishlari</span>
                                            <Select
                                                size='large'
                                                suffixIcon={<CaretDownOutlined/>}
                                                onChange={handleChange}
                                                placeholder="Ta’lim yo’nalishlari"
                                                options={[
                                                    {
                                                        value: "Ta’lim yo’nalishlari",
                                                        label: <Option txt="Ta’lim yo’nalishlari"/>,
                                                    },
                                                ]}
                                            />
                                        </div>
                                        <div className='select-wrapper'>
                                            <span className='select__txt'>Ta’lim turi</span>
                                            <Select
                                                size='large'
                                                suffixIcon={<CaretDownOutlined/>}
                                                onChange={handleChange}
                                                placeholder="Ta’lim turi"
                                                options={[
                                                    {
                                                        value: 'Kunduzgi',
                                                        label: <Option txt='Kunduzgi'/>,
                                                    },
                                                    {
                                                        value: 'Sirtqi',
                                                        label: <Option txt='Sirtqi'/>,
                                                    },
                                                    {
                                                        value: 'Kechki',
                                                        label: <Option txt='Kechki'/>,
                                                    },
                                                    {
                                                        value: 'Masofaviy',
                                                        label: <Option txt='Masofaviy'/>,
                                                    },
                                                ]}
                                            />
                                        </div>
                                        <div className='select-wrapper'>
                                            <span className='select__txt'>Ta’lim tili</span>
                                            <Select
                                                size='large'
                                                suffixIcon={<CaretDownOutlined/>}
                                                onChange={handleChange}
                                                placeholder="Ta’lim tili"
                                                options={[
                                                    {
                                                        value: "O'zbek tili",
                                                        label: <Option txt="O'zbek tili"/>,
                                                    },
                                                    {
                                                        value: 'Ingliz tili',
                                                        label: <Option txt='Ingliz tili'/>,
                                                    },
                                                    {
                                                        value: 'Rus tili',
                                                        label: <Option txt='Rus tili'/>,
                                                    },
                                                    {
                                                        value: 'Turkman tili',
                                                        label: <Option txt='Turkman tili'/>,
                                                    },
                                                ]}
                                            />
                                        </div>
                                        <button className='select__btn'>Qidirish</button>
                                    </div>
                                </div>,
                            },
                        ]}
                    />

                    <ul className="apply__list">
                        <ApplyCard
                            title='Iqtisodiyot va pedagogika universiteti'
                            name='Biznes boshqaruvi'
                            logo={logo}
                            bgImg={bgtest}
                            lang='O’zbek tili'
                            edu='Kunduzgi / Sirtqi'
                            contract={35000000}
                        />
                        <ApplyCard ad={adImg}/>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Search;