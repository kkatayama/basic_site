// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Area Chart Example
var ctx = document.getElementById('myLineChart');


   var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["2020-04-13T22:31:12", "2020-04-13T22:31:43", "2020-04-13T22:32:13", "2020-04-13T22:32:44", "2020-04-13T22:33:15", "2020-04-13T22:33:45", "2020-04-13T22:34:16", "2020-04-13T22:34:46", "2020-04-13T22:35:17", "2020-04-13T22:35:47", "2020-04-13T22:36:18", "2020-04-13T22:36:48", "2020-04-13T22:37:19", "2020-04-13T22:37:49", "2020-04-13T22:38:20", "2020-04-13T22:38:50", "2020-04-13T22:39:21", "2020-04-13T22:39:51", "2020-04-13T22:40:22", "2020-04-13T22:40:53", "2020-04-13T22:41:23", "2020-04-13T22:41:54", "2020-04-13T22:42:24", "2020-04-13T22:42:55", "2020-04-13T22:43:26", "2020-04-13T22:43:40", "2020-04-13T22:44:11", "2020-04-13T22:44:41", "2020-04-13T22:45:12", "2020-04-13T22:45:42", "2020-04-13T22:46:13", "2020-04-13T22:46:44", "2020-04-13T22:47:14", "2020-04-13T22:47:45", "2020-04-13T22:48:15", "2020-04-13T22:48:46"],
    datasets: [{
      label: "Time Series Plot: smeter-4.current4",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [38.341183, 2.314504, 2.631591, 2.339179, 2.243963, 2.292208, 2.522202, 2.264495, 2.51074, 2.223385, 2.440133, 2.300522, 2.381692, 2.355169, 2.169565, 2.123815, 1.810852, 1.887122, 1.51423, 1.779852, 2.417939, 1.612584, 1.510038, 1.970655, 1.91894, 40.573696, 2.212275, 2.135135, 2.168797, 2.343139, 2.225882, 1.986773, 2.138094, 2.218454, 2.012451, 2.237344],

    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        type: 'time',
        distribution: 'series',
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          source: 'auto'
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': ' + number_format(tooltipItem.yLabel) + 'V';
        }
      }
    }
  }
});
