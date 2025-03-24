import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getFile} from "../../api/apiResp.js";
import {Image, Skeleton} from "antd";

const GetFile = ({ id, className, defImg }) => {

    const { data, isLoading } = useQuery({
        queryKey: ['img', id],
        queryFn: () => id ? getFile(id) : null
    })


    return (
        !id ?
            defImg ? <img className={`get-file-img ${className}`} src={defImg} alt="img"/>
                : <Skeleton.Avatar
                    className={`get-file-sk ${className}`}
                    active={true}
                    shape='circle'
                />
            : isLoading ?
                <Skeleton.Avatar
                    className={`get-file-sk ${className}`}
                    active={true}
                    shape='circle'
                />
                : <Image
                    className={`get-file-img ${className}`}
                    src={data}
                    alt="img"
                />
    );
};

export default GetFile;