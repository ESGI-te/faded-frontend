import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

const AppointmentRatesAreaChart = ({ series, categories }) => {
    const options = {
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            type: 'datetime',
            categories,
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm',
            },
        },
        colors: ['#A88B93'],
    };

    return <Chart options={options} series={series} type="area" />;
};

AppointmentRatesAreaChart.propTypes = {
    series: PropTypes.shape({
        name: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.number).isRequired,
    }).isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AppointmentRatesAreaChart;
