import React, { useState, useEffect, useRef } from 'react';

//docs: react-select.com
import Select from 'react-select' 
import { parseCookies, setCookie, destroyCookie } from 'nookies'

const AirtablePlus = require('airtable-plus');  

// ====================================
// INIT GLOBAL VARIABLES
const airtable = new AirtablePlus({
  baseID: 'appmREe03n1MQ6ydq',
  apiKey: 'keyLNupG6zOmmokND',
  tableName: 'Brand_Setup',
});

async function updateData(rowID, data,tbName) {
    try {
      const res = await airtable.update(rowID, data,{tableName:tbName});
      return res
    } catch(e) {
      console.error(e);
    }
}


export default class SelectStatusBrandSetup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    componentDidMount() {
        
    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    updateStatus(recID, statusValue) {
        updateData(recID, {status: statusValue},"Brand_Setup")
        .then(res=> {console.log(res)})
    }

    render() {
        const cookies = parseCookies();
        const options = [
            { value: 0, label:  'Đang đợi thực hiện'},
            { value: 1, label: 'Đang đợi kiểm tra' },
            { value: 2, label: 'Đã xác nhận' },
            { value: 3, label: 'Đã trễ hạn' }
        ]

        const curSelectedValue = this.props.children.props.selected_value
        
        return (
            <div className="select-custom badge badge-pill">
                <Select
                    defaultValue={options[curSelectedValue]}
                    options={options} 
                    isDisabled = {cookies.role <= 2 ? false : true}
                    className = "ml-2"
                    onChange = { item => {
                        console.log("select:",item)                        
                        console.log("record_id:",this.props.children.props.record_id)
                        this.updateStatus(this.props.children.props.record_id, item.value)
                    }}
                />                
                {this.props.children}
                <style jsx>{`
                .select-custom { 
                    width: 250px !important;
                    font-size: 100% !important;
                }
                `}</style>
            </div>
            
        );
    }
}