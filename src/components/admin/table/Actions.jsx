import React from 'react';
import {Popconfirm} from "antd";

const Actions = ({ i, setModal, setSelectedItem, deleteItem }) => {

    return (
        <div className="actions">
            <button className='actions__btn edit' onClick={() => {
                setModal('edit')
                setSelectedItem(i)
            }}>
                <i className="fa-regular fa-pen-to-square"/>
            </button>
            <Popconfirm
                title="Ochirishni xolisizmi?"
                description=' '
                okText="Ha"
                cancelText="Yoq"
                placement='topRight'
                onConfirm={() => deleteItem(i.id)}
            >
                <button className='actions__btn delete'>
                    <i className="fa-regular fa-trash-can"/>
                </button>
            </Popconfirm>
        </div>
    );
};

export default Actions;