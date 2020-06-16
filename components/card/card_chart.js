import React from 'react';
import { Line } from 'react-chartjs-2';

export default class CardChart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        data: [],
        options: []
    }
  }
  componentDidMount() {
    var temp = [];
    temp = {
      labels: ['Thg1', 'Thg2', 'Thg3', 'Thg4', 'Thg5', 'Thg6', 'Thg7', 'Thg8', 'Thg9', 'Thg10', 'Thg11', 'Thg12'],
      datasets: [{
        label: 'Điện năng tiêu thụ',
        data: [0, 10, 20, 15, 10, 20, 15, 25, 20, 30, 25, 40],

        fill: false,
        // lineTension: 0.1,
        backgroundColor: '#2C7BE5',
        borderColor: '#2C7BE5',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#2C7BE5',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#2C7BE5',
        pointHoverBorderColor: '#2C7BE5',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,

      }]
    }
    this.setState({data:temp});

    var optionsdata = [];
    optionsdata =  {
      scales: {
        yAxes: [{
          ticks: {
            callback: function(value) {
              return value + ' kwh';
            }
          }
        }]
      }
    }
    this.setState({options:optionsdata});
  }

  render () {
    const {data,options} = this.state;
      return (
          // card body
          <div className="card">
              <div className="card-header">
                  {/* title */}
                  <h4 className="card-header-title">Năng lượng tiêu thụ</h4>
                  {/* button */}
                  <ul class="nav nav-tabs nav-tabs-sm card-header-tabs">
                    <li class="nav-item">
                      <a class="nav-link active" href="#" data-toggle="tab">
                        Điện
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#" data-toggle="tab">
                        Nước
                      </a>
                    </li>
                    
                  </ul>
              </div>
              {/* end card header */}
              <div className="card-body">
                <div className="chart">
                  {/* <canvas id="overviewChart" className="chart-canvas"></canvas> */}
                  <Line id="overviewChart" className="chart-canvas" data = {data} options={options} width={'687px'} height= {'300px'}/>
                  
                </div>
              </div>      
          </div>
      )
  }
}

// https://www.npmjs.com/package/react-chartjs-2?activeTab=readme
/*
datasets: [
  {
    label: 'My First dataset',
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(75,192,192,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: [65, 59, 80, 81, 56, 55, 40]
  }
  */