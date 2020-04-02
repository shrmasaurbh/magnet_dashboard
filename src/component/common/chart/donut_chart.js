import React from 'react';
import NVD3Chart from 'react-nvd3';
import "./donut_chart.css";
import {getDashboardData} from "../../../dataParser/getDashboardData"; 




class PieDonutChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoader : false,
            homeData : {},
        };
    }

    async componentDidMount () {
        this.setState({showLoader : true})
        var resData = await getDashboardData();
        setTimeout(()=>{
            if(resData.meta.status === 200){
                
                this.setState({homeData : resData.data}) ;
                this.setState({showLoader : false})
                window.scrollTo(0, 0);
            }else if(resData.meta.status === 401){
                
                localStorage.clear();
                this.props.history.push("/login");
                
            }
            else{
                this.setState({homeData : resData}) ;
                this.setState({showLoader : false})
                window.scrollTo(0, 0);
            }
        },500)
    }

    render() {

        const {homeData} = this.state;
        console.log("homeData.total_leadsXXXXXXX",homeData.total_leads)
        const datum = [
            {key: "Total Leads", y: (homeData.total_leads), color: "#8d266b"},
            {key: "New Leads", y:(homeData.not_update), color: "#f4c22b"},
            {key: "Closed Leads", y:(homeData.closed), color: "#04a9f5"},
            {key: "Booked Leads", y:(homeData.booked), color: "#3ebfea"},
            {key: "Cancel Leads", y:(homeData.cancel), color: "#4F5467"},
            {key: "Remind me later Leads", y:(homeData.remind_me_later), color: "#1de9b6"},
            {key: "Pipeline Leads", y:(homeData.pipeline), color: "#a389d4"},
            {key: "Opportunity Leads", y:(homeData.opportunity), color: "#ac6507"},
            {key: "Decision delayed Leads", y:(homeData.decision_delayed), color: "#09dc40"},
            // {key: "Assigned Leads", y:(homeData.assigned), color: "#1e954a"},
            {key: "Gross eoi Leads", y:(homeData.gross_eoi_application), color: "#FE8A7D"},
        ];

        return <NVD3Chart id="chart" height={500} type="pieChart" datum={datum} x="key" y="y" donut labelType='percent' />
    }
}

export default PieDonutChart;