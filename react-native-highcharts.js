import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const win = Dimensions.get('window');

class ChartWeb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            init: `
                <!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <script src="https://code.highcharts.com/stock/highstock.js"></script>
                        <script src="https://code.highcharts.com/modules/exporting.js"></script>
                        <style>
                            @font-face {
                                font-family: 'OpenSansHebrew-Regular';
                                src: url('fonts/OpenSansHebrew-Regular.ttf') format('truetype');
                                font-weight: 300;
                            }
                            #container {
                                width: 100%;
                                height: 100%;
                                position: absolute;
                                top: 0;
                                left: 0;
                                font-weight: 300;
                            }
                        </style>
                    </head>
                    <body>
                        <div id="container"></div>
                    </body>
                </html>
            `,
            end: `
                <script>
                    var config = ${JSON.stringify(this.props.config)};
                    config.chart = {
                        ...config.chart,
                        style: {
                            fontSize: '11px',
                            fontWeight: '300'
                        }
                    };
                    config.tooltip = {
                        ...config.tooltip,
                        style: {
                            fontSize: '11px',
                            fontWeight: '300'
                        },
                        formatter: function() {
                            var selectedTimeFilter = config.tooltip.selectedTimeFilter;
                            var strings = config.tooltip.strings;
                            var isMultiChartPresentation = config.tooltip.isMultiChartPresentation;
                            var tradeDataForStock = config.tooltip.tradeDataForStock;
                            var registrationDate = config.tooltip.registrationDate;

                            var dateFormat = selectedTimeFilter === 0 ? '%H:%M:%S' : '%d/%m/%y';
                            var date = Highcharts.dateFormat(dateFormat, this.x);
                            var tradeDataForStockString = selectedTimeFilter === 0 ? strings.rate : registrationDate === date ? strings.registrationRateStrings : strings.closingRate;
                            var title = isMultiChartPresentation ? strings.yield : (tradeDataForStock ? tradeDataForStockString : strings.index);

                            var value = isMultiChartPresentation ? this.y.toFixed(2) + '%' : this.y.toFixed(2);
                            if (value.indexOf('-') > -1) {
                                value = value.substring(1) + '-';
                            }

                            return '<div dir="rtl" style="font-family: OpenSansHebrew-Regular; font-weight: 300; font-size: 11px;">' + date + ' - ' + title + ' : ' + value + '</div>';
                        },
                        positioner: function() {
                            return { x: this.chart.chartWidth - this.label.width, y: 0 };
                        },
                        fixed: true
                    };
                    config.plotOptions = {
                        ...config.plotOptions,
                        series: {
                            ...config.plotOptions.series,
                            lineWidth: 0.5,
                            states: {
                                hover: {
                                    lineWidth: 0.5
                                }
                            }
                        }
                    };
                    config.xAxis = {
                        ...config.xAxis,
                        lineWidth: 0.5,
                        lineColor: '#e8e8e8',
                        gridLineWidth: 0.5,
                        gridLineColor: '#e8e8e8',
                        labels: {
                            ...config.xAxis.labels,
                            style: {
                                fontSize: '11px',
                                fontWeight: '300'
                            }
                        }
                    };
                    config.yAxis = {
                        ...config.yAxis,
                        gridLineWidth: 0.5,
                        gridLineColor: '#e8e8e8',
                        labels: {
                            ...config.yAxis.labels,
                            style: {
                                fontSize: '11px',
                                fontWeight: '300'
                            }
                        }
                    };
                    Highcharts.stockChart('container', config);
                </script>
            `,
            height: win.height,
            width: win.width
        };
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.config) !== JSON.stringify(this.props.config)) {
            this.setState({
                end: `
                    <script>
                        var config = ${JSON.stringify(this.props.config)};
                        config.chart = {
                            ...config.chart,
                            style: {
                                fontSize: '11px',
                                fontWeight: '300'
                            }
                        };
                        config.tooltip = {
                            ...config.tooltip,
                            style: {
                                fontSize: '11px',
                                fontWeight: '300'
                            },
                            formatter: function() {
                                var selectedTimeFilter = config.tooltip.selectedTimeFilter;
                                var strings = config.tooltip.strings;
                                var isMultiChartPresentation = config.tooltip.isMultiChartPresentation;
                                var tradeDataForStock = config.tooltip.tradeDataForStock;
                                var registrationDate = config.tooltip.registrationDate;

                                var dateFormat = selectedTimeFilter === 0 ? '%H:%M:%S' : '%d/%m/%y';
                                var date = Highcharts.dateFormat(dateFormat, this.x);
                                var tradeDataForStockString = selectedTimeFilter === 0 ? strings.rate : registrationDate === date ? strings.registrationRateStrings : strings.closingRate;
                                var title = isMultiChartPresentation ? strings.yield : (tradeDataForStock ? tradeDataForStockString : strings.index);

                                var value = isMultiChartPresentation ? this.y.toFixed(2) + '%' : this.y.toFixed(2);
                                if (value.indexOf('-') > -1) {
                                    value = value.substring(1) + '-';
                                }

                                return '<div dir="rtl" style="font-family: OpenSansHebrew-Regular; font-weight: 300; font-size: 11px;">' + date + ' - ' + title + ' : ' + value + '</div>';
                            },
                            positioner: function() {
                                return { x: this.chart.chartWidth - this.label.width, y: 0 };
                            },
                            fixed: true
                        };
                        config.plotOptions = {
                            ...config.plotOptions,
                            series: {
                                ...config.plotOptions.series,
                                lineWidth: 0.5,
                                states: {
                                    hover: {
                                        lineWidth: 0.5
                                    }
                                }
                            }
                        };
                        config.xAxis = {
                            ...config.xAxis,
                            lineWidth: 0.5,
                            lineColor: '#e8e8e8',
                            gridLineWidth: 0.5,
                            gridLineColor: '#e8e8e8',
                            labels: {
                                ...config.xAxis.labels,
                                style: {
                                    fontSize: '11px',
                                    fontWeight: '300'
                                }
                            }
                        };
                        config.yAxis = {
                            ...config.yAxis,
                            gridLineWidth: 0.5,
                            gridLineColor: '#e8e8e8',
                            labels: {
                                ...config.yAxis.labels,
                                style: {
                                    fontSize: '11px',
                                    fontWeight: '300'
                                }
                            }
                        };
                        Highcharts.stockChart('container', config);
                    </script>
                `
            });
        }
    }

    reRenderWebView = (e) => {
        this.setState({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width,
        });
    }

    render() {
        const { init, end } = this.state;
        const html = `${init}${end}`;

        return (
            <View style={this.props.style}>
                <WebView
                    onLayout={this.reRenderWebView}
                    style={styles.full}
                    source={{ html }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={false}
                    scrollEnabled={false}
                    automaticallyAdjustContentInsets={true}
                    originWhitelist={['*']}
                    mixedContentMode="always"
                    onMessage={this.props.onMessage}
                    injectedJavaScript="if (window.postMessage.length !== 1) {window.postMessage = function(msg) {setTimeout(function () {window.__REACT_WEB_VIEW_BRIDGE.postMessage(msg);}, 500);}} true"
                    {...this.props}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    full: {
        flex: 1,
        backgroundColor: 'transparent'
    }
});

export default ChartWeb;
