import React from 'react';

export default class CardItemTextDelivery extends React.Component {
    render () {
        return (
            // card Item Text Chart Component
            <div className="col-12 col-lg-6 col-xl">
                <div className="card">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col">
                                <h6 className="text-uppercase text-muted mb-2">{this.props.title}</h6>
                                <span className="h2 mb-0">{this.props.value}</span>
                                {
                                ! this.props.logo == ''
                                ? <span className="badge badge-soft-success mt-n1"> {this.props.logo}</span>  
                                : ''
                                }
                            </div>
                            <div className="col-auto">
                                <div className="chart chart-sparkline">
                                    {/* chart was draw by canvas and appeared below */}
                                    <canvas className="chart-canvas" id="sparklineChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        <style jsx>{`
            .chart-canvas {
                display: block;
                height: 35px;
                width: 75px;
            }
        `}</style>
            </div>
        )
    }
}

// data icon
// thêm class vào mục <span className="h2 fe text-muted ... ">
// .fe-dollar-sign
// .fe-briefcase
// .fe-clock
