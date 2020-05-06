import React, {Component} from "react";
import {connect} from "react-redux";
import {getAllLinks, getLinkAnalytics} from "./store/actions/linkActions";
import {Redirect} from "react-router-dom";
import {Bar} from 'react-chartjs-2';

class LinkAnalytics extends Component {
    state = {
        labels: [],
        data: []
    }

    async componentDidMount() {
        await this.props.getAllLinks();
        const {all_links, link_analytics} = this.props;
        console.log("gla in la: ", link_analytics);
        let info = [];
        all_links && link_analytics && all_links.forEach(item => {
            const short_link = all_links.filter(item1 => item1.LID === item.LID)[0].SHORT_LINK;
            const spec = link_analytics.filter(item1 => item1.LID === item.LID)[0];
            const count = spec && spec.total_clicks;
            console.log("link in gla is:", count);
            console.log("item is:", link_analytics.filter(item1 => (item1 && item1.LID === item.LID)));
            info = [...info, {
                short_link: short_link,
                click_count: count
            }];
            this.setState({labels: [...this.state.labels, "" + short_link]});
            this.setState({data: [...this.state.data, count]});
        });
        console.log("info is: ", info);
    }

    render() {
        if (!localStorage.getItem("SKEY")) {
            return <Redirect to="/"/>
        }
        const chartData = {
            labels: this.state.labels,
            datasets: [{
                label: "Click Counts",
                data: this.state.data,
                backgroundColor: 'rgba(75,192,192,1)',
                maxBarThickness: 20
            }]
        };
        return (
            <div className="center linkanalytics">
                {this.props.link_analytics ?
                    <div className="bar"><Bar data={chartData} options={{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}/></div>
                    : <p>Loading...</p>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        all_links: state.link.all_links,
        link_analytics: state.link.link_analytics
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllLinks: () => dispatch(getAllLinks()),
        getLinkAnalytics: (LID) => dispatch(getLinkAnalytics(LID))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LinkAnalytics);
