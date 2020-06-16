import React from 'react';

export default class CardChart extends React.Component {
    

    render () {
        return (
            // card body
            <div class="card">
                <div class="card-body">
                  <div class="chart">
                    <canvas id="overviewChart" class="chart-canvas"></canvas>
                  </div>
                </div>      
            </div>
        )
    }
}