import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    SvgIcon
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Chart from 'react-apexcharts';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const SalesChart = ({ type }) => {
    const navigate = useNavigate();

    const { noOfOrderOfProductOfSeller } = useSelector((state) => state?.product);

    const chartData = {
        options: {
            xaxis: {
                categories: ["2019", "2020", "2021", "2022", "2023", "2024"],
                axisBorder: { show: true },
                axisTicks: { show: false },
                labels: { show: true }
            },
            yaxis: {
                min: 0,
                max: 500,
            },
            grid: { show: false },
            chart: {
                sparkline: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            }
        },
        series: [
            {
                name: "series-1",
                data: [0, 0, 0, 0, 0, noOfOrderOfProductOfSeller]
            }
        ]
    };

    return (
        <Card sx={{ backgroundImage: "linear-gradient(320deg, rgb(58 163 171 / 32%) 0%, rgb(8 23 198 / 32%) 100%)" }}>
            <CardHeader
                action={(
                    <Button
                        color="inherit"
                        size="small"
                        startIcon={(
                            <SvgIcon fontSize="small">
                                <RefreshIcon />
                            </SvgIcon>
                        )}
                    >
                        Refresh
                    </Button>
                )}
            />
            <CardContent sx={{ display: "flex", justifyContent: 'center', alignItems: "center", height: 310 }}>
                <ResponsiveChart
                    options={chartData.options}
                    series={chartData.series}
                    type={type}
                />
            </CardContent>

            <Divider />

            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                    color="inherit"
                    endIcon={(
                        <SvgIcon fontSize="small">
                            <ArrowForwardIcon />
                        </SvgIcon>
                    )}
                    size="small"
                    onClick={() => navigate("/Seller/orders")}
                >
                    Details
                </Button>
            </CardActions>
        </Card>
    );
};

export default SalesChart;

const ResponsiveChart = styled(Chart)`
    width: 550px;

    @media (max-width: 600px) {
        width: 350px;
    }
`;
