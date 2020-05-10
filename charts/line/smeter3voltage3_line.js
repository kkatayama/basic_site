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
    labels: ["2020-04-13T22:19:03", "2020-04-13T22:19:36", "2020-04-13T22:20:06", "2020-04-13T22:20:37", "2020-04-13T22:21:07", "2020-04-13T22:21:38", "2020-04-13T22:22:09", "2020-04-13T22:22:39", "2020-04-13T22:23:01", "2020-04-13T22:23:31", "2020-04-13T22:24:02", "2020-04-13T22:24:32", "2020-04-13T22:25:03", "2020-04-13T22:25:33", "2020-04-13T22:26:04", "2020-04-13T22:26:34", "2020-04-13T22:27:05", "2020-04-13T22:27:35", "2020-04-13T22:28:06", "2020-04-13T22:28:36", "2020-04-13T22:29:07", "2020-04-13T22:29:37", "2020-04-13T22:30:08", "2020-04-13T22:30:39", "2020-04-13T22:31:09", "2020-04-13T22:31:40", "2020-04-13T22:32:11", "2020-04-13T22:32:41", "2020-04-13T22:33:12", "2020-04-13T22:33:42", "2020-04-13T22:34:13", "2020-04-13T22:34:43", "2020-04-13T22:35:14", "2020-04-13T22:35:44", "2020-04-13T22:36:15", "2020-04-13T22:36:45", "2020-04-13T22:37:16", "2020-04-13T22:37:46", "2020-04-13T22:38:17", "2020-04-13T22:38:48", "2020-04-13T22:39:18", "2020-04-13T22:39:49", "2020-04-13T22:40:19", "2020-04-13T22:40:29", "2020-04-13T22:40:59", "2020-04-13T22:41:30", "2020-04-13T22:42:02", "2020-04-13T22:42:33", "2020-04-13T22:43:03", "2020-04-13T22:43:34", "2020-04-13T22:43:42", "2020-04-13T22:44:12", "2020-04-13T22:44:43", "2020-04-13T22:45:13", "2020-04-13T22:45:44", "2020-04-13T22:46:14", "2020-04-13T22:46:45", "2020-04-13T22:47:15", "2020-04-13T22:47:46", "2020-04-13T22:48:16", "2020-04-13T22:48:47", "2020-04-13T22:49:19"],
    datasets: [{
      label: "Time Series Plot: smeter-3.voltage3",
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
      data: [4.134996, 12.193537, 124.767601, 126.87841, 125.711136, 126.748268, 125.684334, 125.827972, 131.419083, 125.761185, 125.14843, 125.00573, 124.938301, 125.904114, 125.941055, 124.985863, 126.065598, 124.898438, 126.014137, 124.373985, 124.5401, 125.664803, 126.002777, 126.031334, 126.174751, 125.955658, 126.289841, 125.159111, 125.816231, 125.811241, 126.864822, 126.877937, 125.617462, 124.775642, 125.806213, 125.593292, 125.836754, 126.839546, 124.076294, 125.006454, 126.822281, 126.739136, 125.955505, 130.730621, 126.595581, 124.831383, 10.461674, 124.752525, 123.8386, 122.005096, 128.770157, 123.790001, 122.575737, 123.051842, 123.696342, 123.721779, 123.943466, 126.853989, 121.827431, 121.675842, 122.230293, 7.564482],

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
