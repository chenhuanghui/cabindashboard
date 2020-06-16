import React from 'react';

export default class CardChart extends React.Component {
    

    render () {
        return (
            // card body
            <div className="card">
                <div className="card-body">
                  <div className="chart">
                    <canvas id="overviewChart" className="chart-canvas"></canvas>
                  </div>
                </div>      
            </div>
        )
    }
}