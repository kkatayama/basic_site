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
    labels: ["2020-04-13T21:54:33", "2020-04-13T21:55:04", "2020-04-13T21:55:34", "2020-04-13T21:56:05", "2020-04-13T21:56:36", "2020-04-13T21:57:06", "2020-04-13T21:57:37", "2020-04-13T21:58:07", "2020-04-13T21:58:38", "2020-04-13T21:59:09", "2020-04-13T21:59:39", "2020-04-13T22:00:10", "2020-04-13T22:00:40", "2020-04-13T22:01:11", "2020-04-13T22:01:41", "2020-04-13T22:02:12", "2020-04-13T22:02:42", "2020-04-13T22:03:13", "2020-04-13T22:03:43", "2020-04-13T22:04:14", "2020-04-13T22:04:44", "2020-04-13T22:05:15", "2020-04-13T22:05:45", "2020-04-13T22:06:16", "2020-04-13T22:06:46", "2020-04-13T22:07:17", "2020-04-13T22:07:48", "2020-04-13T22:08:18", "2020-04-13T22:08:49", "2020-04-13T22:09:19", "2020-04-13T22:09:50", "2020-04-13T22:10:21", "2020-04-13T22:10:51", "2020-04-13T22:11:22", "2020-04-13T22:11:52", "2020-04-13T22:12:23", "2020-04-13T22:12:53", "2020-04-13T22:13:24", "2020-04-13T22:13:54", "2020-04-13T22:14:25", "2020-04-13T22:14:55", "2020-04-13T22:15:26", "2020-04-13T22:15:56", "2020-04-13T22:16:27", "2020-04-13T22:16:57", "2020-04-13T22:17:28", "2020-04-13T22:17:59", "2020-04-13T22:18:29", "2020-04-13T22:19:00", "2020-04-13T22:19:30", "2020-04-13T22:20:01", "2020-04-13T22:20:32", "2020-04-13T22:21:02", "2020-04-13T22:21:33", "2020-04-13T22:22:03", "2020-04-13T22:22:34", "2020-04-13T22:23:04", "2020-04-13T22:23:35", "2020-04-13T22:24:05", "2020-04-13T22:24:36", "2020-04-13T22:25:06", "2020-04-13T22:25:37", "2020-04-13T22:26:07", "2020-04-13T22:26:38", "2020-04-13T22:27:08", "2020-04-13T22:27:39", "2020-04-13T22:28:09", "2020-04-13T22:28:40", "2020-04-13T22:29:10", "2020-04-13T22:29:41", "2020-04-13T22:30:11", "2020-04-13T22:30:42", "2020-04-13T22:31:12", "2020-04-13T22:31:43", "2020-04-13T22:32:13", "2020-04-13T22:32:44", "2020-04-13T22:33:15", "2020-04-13T22:33:45", "2020-04-13T22:34:16", "2020-04-13T22:34:46", "2020-04-13T22:35:17", "2020-04-13T22:35:47", "2020-04-13T22:36:18", "2020-04-13T22:36:48", "2020-04-13T22:37:19", "2020-04-13T22:37:50", "2020-04-13T22:38:20", "2020-04-13T22:38:51", "2020-04-13T22:39:21", "2020-04-13T22:39:52", "2020-04-13T22:40:22", "2020-04-13T22:40:53", "2020-04-13T22:41:23", "2020-04-13T22:41:54", "2020-04-13T22:42:24", "2020-04-13T22:42:55", "2020-04-13T22:43:25", "2020-04-13T22:43:56", "2020-04-13T22:44:26", "2020-04-13T22:44:57", "2020-04-13T22:45:27", "2020-04-13T22:45:58", "2020-04-13T22:46:28", "2020-04-13T22:46:59", "2020-04-13T22:47:29", "2020-04-13T22:48:00", "2020-04-13T22:48:30", "2020-04-13T22:49:01", "2020-04-13T22:49:22"],
    datasets: [{
      label: "Time Series Plot: smeter-2.kwh2",
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
      data: [0.045311, 0.052969, 0.060632, 0.068375, 0.076033, 0.083891, 0.091469, 0.099162, 0.106733, 0.114408, 0.123526, 0.131387, 0.138934, 0.148149, 0.155893, 0.163739, 0.172275, 0.180863, 0.189224, 0.197783, 0.206262, 0.214685, 0.222813, 0.230296, 0.237619, 0.246177, 0.255338, 0.264057, 0.272514, 0.281167, 0.289635, 0.29842, 0.306853, 0.315461, 0.324548, 0.331655, 0.338635, 0.347105, 0.355885, 0.364814, 0.374044, 0.382762, 0.391637, 0.401305, 0.409497, 0.417779, 0.427136, 0.436679, 0.446009, 0.454959, 0.464102, 0.473473, 0.482626, 0.491741, 0.500874, 0.510136, 0.518073, 0.525698, 0.533175, 0.540872, 0.548203, 0.556005, 0.563581, 0.570939, 0.578056, 0.585433, 0.592673, 0.599975, 0.607233, 0.614633, 0.621894, 0.629316, 0.636736, 0.644373, 0.651955, 0.659566, 0.667126, 0.674685, 0.682261, 0.689855, 0.697366, 0.704854, 0.712348, 0.720059, 0.727672, 0.735453, 0.742896, 0.750419, 0.756773, 0.763452, 0.77074, 0.778119, 0.786235, 0.793956, 0.805273, 0.81609, 0.826357, 0.838689, 0.85172, 0.864051, 0.876151, 0.88859, 0.900369, 0.913059, 0.92547, 0.938284, 0.949845, 0.961584, 0.025117],

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
