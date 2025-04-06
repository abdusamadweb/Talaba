import React, {useState} from 'react';
import arrowIcon from "../../assets/images/arrow-icon.svg";
import {Input, Skeleton} from "antd";
import searchIcon from "../../assets/images/search-icon.svg";
import {CloseCircleOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {$resp} from "../../api/apiResp.js";
import {useQuery} from "@tanstack/react-query";


const fetchFilteredData = async ({ queryKey }) => {
    const [, params, search] = queryKey
    const { data } = await $resp.post('/main-direction/filter',
        {
            q: search,
            region_id: null,
            lang_ids: null,
            main_direction_id: null,
            edu_type: null,
            from_price: null,
            to_price: null,
        },
        { params })
    return data
}


const SearchQ = () => {

    const navigate = useNavigate()
    const [search, setSearch] = useState('')


    // fetch
    const { data, isLoading } = useQuery({
        queryKey: ['filteredData', { page: 1, size: 10 }, search, search],
        queryFn: fetchFilteredData,
        keepPreviousData: true,
    })


    return (
        <div className='searchQ'>
            <div className="container">
                <div className="searchQ__head">
                    <button className='btn' onClick={() => navigate(-1)}>
                        <img src={arrowIcon} alt="icon"/>
                    </button>
                    <div className='search-filter'>
                        <Input
                            size="large"
                            prefix={<img src={searchIcon} alt='icon' />}
                            suffix={<CloseCircleOutlined onClick={() => setSearch('')}/>}
                            placeholder="OTM yoki ta’lim yo’nalishi..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="searchQ__body">
                    <div className="uni-dir">
                        <h3 className="uni-dir__title">Ko’p qidirilgan yo’nalishlar</h3>
                        <div className='p1 pb3'>
                            <Skeleton active/> <br/>
                            <Skeleton active/> <br/>
                            <Skeleton active/>
                        </div>
                        {/*<ul className="uni-dir__list">*/}
                        {/*    {*/}
                        {/*        isLoading ? <div className='p1 pb3'>*/}
                        {/*                <Skeleton active/> <br/>*/}
                        {/*                <Skeleton active/> <br/>*/}
                        {/*                <Skeleton active/>*/}
                        {/*            </div>*/}
                        {/*            : data?.data?.map((i, index) => (*/}
                        {/*                <li className="item" key={index}>*/}
                        {/*                    <Link className='item__link' to={`/${i.id}`}>{i?.name}</Link>*/}
                        {/*                </li>*/}
                        {/*            ))*/}
                        {/*    }*/}
                        {/*</ul>*/}
                    </div>
                    {/*<div className="uni-dir">*/}
                    {/*    <h3 className="uni-dir__title">Ko’p qidirilgan OTMlar</h3>*/}
                    {/*    <ul className="uni-dir__list">*/}
                    {/*        <li className="item">*/}
                    {/*            <Link className='item__link' to='/'>Xalqaro TMC instituti</Link>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
};

export default SearchQ;