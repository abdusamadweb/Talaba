import React, {useState} from 'react';
import './Search.scss'
import {Button, Collapse, Empty, Input, Select, Skeleton, Slider} from "antd";
import searchIcon from "../../assets/images/search-icon.svg";
import ApplyCard from "../../components/cards/apply/ApplyCard.jsx";
import adImg from "../../assets/images/ad-img.png";
import {formatPrice} from "../../assets/scripts/global.js";
import {CaretDownOutlined, CaretRightOutlined} from '@ant-design/icons'
import $api from "../../api/apiConfig.js";
import {useQuery} from "@tanstack/react-query";
import {$resp} from "../../api/apiResp.js";

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

const fetchRegions = async () => {
    const { data } = await $api.get('/regions/all')
    return data
}
const fetchLang = async () => {
    const { data } = await $api.get('/edu-lang/all')
    return data
}
const fetchDirection = async () => {
    const { data } = await $api.get('/main-direction/all')
    return data
}

const fetchFilteredData = async ({ queryKey }) => {
    const [, params, body] = queryKey
    const { data } = await $resp.post('/main-direction/filter', body, { params })
    return data
}


const Search = () => {

    const [isLoading, setIsLoading] = useState(false)

    const [size, setSize] = useState(10)
    const [q, setQ] = useState('')
    const [sRegion, setSRegion] = useState(null)
    const [sLang, setSLang] = useState([])
    const [sDir, setSDir] = useState(null)

    const [ranges, setRanges] = useState({
        from: 5000000,
        to: 100000000,
    })

    const changeRange = (val) => {
        return setRanges({from: val[0]*1000000, to: val[1]*1000000})
    }

    // Fetch regions
    const { data: regions } = useQuery({
        queryKey: ['regions'],
        queryFn: fetchRegions
    })
    const rOptions = regions?.regions?.map(i => ({
        value: i.id,
        label: <Option txt={i.name} />
    })) || []

    // Fetch langs
    const { data: langs } = useQuery({
        queryKey: ['langs'],
        queryFn: fetchLang
    })
    const lOptions = langs?.map(i => ({
        value: i.id,
        label: <Option txt={i.name} />
    })) || []

    // Fetch directions
    const { data: directions } = useQuery({
        queryKey: ['directions'],
        queryFn: fetchDirection
    })
    const dOptions = directions?.map(i => ({
        value: i.id,
        label: <Option txt={i.name} />
    })) || []


    // filter data
    const [params, setParams] = useState({ page: 1, size: 10 })
    const [body, setBody] = useState({
        q: null,
        region_id: null,
        lang_ids: null,
        main_direction_id: null,
        edu_type: null,
        from_price: null,
        to_price: null,
    })

    const { data, isLoading: loading, refetch } = useQuery({
        queryKey: ['filteredData', params, body],
        queryFn: fetchFilteredData,
        keepPreviousData: true,
    })

    const updateFilters = () => {
        setIsLoading(true)

        setParams({ page: 1, size: size })
        setBody({
            q: q,
            region_id: sRegion,
            lang_ids: [sLang],
            main_direction_id: sDir,
            edu_type: null,
            from_price: ranges.from,
            to_price: ranges.to,
        })
        refetch()
        setTimeout(() => setIsLoading(false), 1000)
    }


    return (
        <div className='search page'>
            <div className="container">
                <div className="search__head">
                    <div className="search-filter ">
                        <Input
                            size="large"
                            prefix={<img src={searchIcon} alt='icon'></img>}
                            placeholder="OTM yoki ta’lim yo’nalishlarini qidiring..."
                            onChange={(e) => setQ(e.target.value)}
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
                                                onChange={(e) => setSRegion(e)}
                                                placeholder="Manzil"
                                                options={rOptions}
                                            />
                                        </div>
                                        <div className='select-wrapper'>
                                            <span className='select__txt'>Ta’lim yo’nalishlari</span>
                                            <Select
                                                size='large'
                                                suffixIcon={<CaretDownOutlined/>}
                                                onChange={(e) => setSDir(e)}
                                                placeholder="Ta’lim yo’nalishlari"
                                                options={dOptions}
                                            />
                                        </div>
                                        {/*<div className='select-wrapper'>*/}
                                        {/*    <span className='select__txt'>Ta’lim turi</span>*/}
                                        {/*    <Select*/}
                                        {/*        size='large'*/}
                                        {/*        suffixIcon={<CaretDownOutlined/>}*/}
                                        {/*        onChange={handleChange}*/}
                                        {/*        placeholder="Ta’lim turi"*/}
                                        {/*        options={[*/}
                                        {/*            {*/}
                                        {/*                value: 'Kunduzgi',*/}
                                        {/*                label: <Option txt='Kunduzgi'/>,*/}
                                        {/*            },*/}
                                        {/*            {*/}
                                        {/*                value: 'Sirtqi',*/}
                                        {/*                label: <Option txt='Sirtqi'/>,*/}
                                        {/*            },*/}
                                        {/*            {*/}
                                        {/*                value: 'Kechki',*/}
                                        {/*                label: <Option txt='Kechki'/>,*/}
                                        {/*            },*/}
                                        {/*            {*/}
                                        {/*                value: 'Masofaviy',*/}
                                        {/*                label: <Option txt='Masofaviy'/>,*/}
                                        {/*            },*/}
                                        {/*        ]}*/}
                                        {/*    />*/}
                                        {/*</div>*/}
                                        <div className='select-wrapper'>
                                            <span className='select__txt'>Ta’lim tili</span>
                                            <Select
                                                size='large'
                                                suffixIcon={<CaretDownOutlined/>}
                                                onChange={(e) => setSLang(e)}
                                                placeholder="Ta’lim tili"
                                                options={lOptions}
                                            />
                                        </div>
                                        <Button
                                            className='select__btn'
                                            onClick={updateFilters}
                                            loading={isLoading}
                                        >
                                            Qidirish
                                        </Button>
                                    </div>
                                </div>,
                            },
                        ]}
                    />

                    <ul className="apply__list">
                        {
                            loading ? <div className='p1 pb3'>
                                    <Skeleton active/> <br/>
                                    <Skeleton active/> <br/>
                                    <Skeleton active/>
                                </div>
                                :
                                data?.data.length ?
                                    data?.data.map((i, index) => (
                                        <ApplyCard key={index} i={i}/>
                                    ))
                                    : <Empty description={false}/>
                        }
                        {
                            data?.data.length > 9 &&
                            <Button
                                className='more-btn'
                                loading={isLoading}
                                size='large'
                                onClick={() => setSize(+size + 10)}
                            >
                                Ko'proq ko'rsatish
                            </Button>
                        }
                        <ApplyCard ad={adImg}/>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Search;