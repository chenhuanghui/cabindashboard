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
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Số điện',
        data: [0, 10, 5, 15, 10, 20, 15, 25, 20, 30, 25, 40]
      }]
    }
    this.setState({data:temp});

    var optionsdata = [];
    optionsdata =  {
      scales: {
        yAxes: [{
          ticks: {
            callback: function(value) {
              return '$' + value + 'k';
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