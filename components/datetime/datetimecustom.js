import React, { useState, useEffect, useRef } from 'react';
import DatePicker from "react-datepicker";
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

export default class DateTimeCustom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date(),
        }
    }
    componentDidMount() {
        let currentComponent = this
        currentComponent.setState({startDate:new Date()})
    }

    componentDidUpdate(prevProps, prevState) {
        let curDate = new Date(this.props.children.props.date)
        let prevDate = new Date(prevState.startDate)
        
        if((prevDate.getDate() !== curDate.getDate()) || (prevDate.getMonth() !== curDate.getMonth()) ) {
            console.log("detect UPDATE.........")            
            this.setStartDate(curDate)
        }
        
    }

    setStartDate(date) {
        let currentComponent = this
        let newDate = new Date(date)
        currentComponent.setState({startDate:newDate})
    }

    updateDueDate(recID, date) {
        updateData(recID, {duedate: new Date(date).toDateString()},"Brand_Setup")
        .then(res=> {console.log(res)})
    }

    render() {
        const DatePickerCustomEdit = ({ value, onClick }) => (
            <div>
                <span data={value} className="duedate ml-2"> {new Date(value).toDateString()} </span>
                <span className="fe fe-edit mr-4 small btn-control btn-control-edit btn-control-edit-setup-duedate ml-2" onClick={onClick} data={value}></span>
                <style jsx>{`
                    .updated{ text-decoration: underline}
                    .btn-control:hover {
                        cursor: pointer
                    }
                `}</style>
            </div>
        )
        const {startDate} = this.state

        return (
            <span>
                {this.props.children}
                <DatePicker
                    dateFormat="yyyy/MM/dd"
                    selected={startDate}
                    customInput={<DatePickerCustomEdit />}
                    onChange={date => {
                        console.log("selecteddate: ", date)
                        this.setStartDate(date)                        
                        this.updateDueDate(this.props.children.props.record_id, date)
                    }}
                />
            </span>
            
        );
    }
}