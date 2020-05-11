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
    labels: ["2020-04-13T21:54:33", "2020-04-13T21:55:04", "2020-04-13T21:55:34", "2020-04-13T21:56:05", "2020-04-13T21:56:36", "2020-04-13T21:57:06", "2020-04-13T21:57:37", "2020-04-13T21:58:07", "2020-04-13T21:58:38", "2020-04-13T21:59:09", "2020-04-13T21:59:39", "2020-04-13T22:00:10", "2020-04-13T22:00:40", "2020-04-13T22:01:11", "2020-04-13T22:01:41", "2020-04-13T22:02:12", "2020-04-13T22:02:42", "2020-04-13T22:03:13", "2020-04-13T22:03:43", "2020-04-13T22:04:14", "2020-04-13T22:04:44", "2020-04-13T22:05:15", "2020-04-13T22:05:45", "2020-04-13T22:06:16", "2020-04-13T22:06:46", "2020-04-13T22:07:17", "2020-04-13T22:07:48", "2020-04-13T22:08:18", "2020-04-13T22:08:49", "2020-04-13T22:09:19", "2020-04-13T22:09:50", "2020-04-13T22:10:21", "2020-04-13T22:10:51", "2020-04-13T22:11:22", "2020-04-13T22:11:52", "2020-04-13T22:12:23", "2020-04-13T22:12:53", "2020-04-13T22:13:24", "2020-04-13T22:13:54", "2020-04-13T22:14:25", "2020-04-13T22:14:55", "2020-04-13T22:15:26", "2020-04-13T22:15:56", "2020-04-13T22:16:27", "2020-04-13T22:16:57", "2020-04-13T22:17:28", "2020-04-13T22:17:59", "2020-04-13T22:18:29", "2020-04-13T22:19:00", "2020-04-13T22:19:30", "2020-04-13T22:20:01", "2020-04-13T22:20:32", "2020-04-13T22:21:02", "2020-04-13T22:21:33", "2020-04-13T22:22:03", "2020-04-13T22:22:34", "2020-04-13T22:23:04", "2020-04-13T22:23:35", "2020-04-13T22:24:05", "2020-04-13T22:24:36", "2020-04-13T22:25:06", "2020-04-13T22:25:37", "2020-04-13T22:26:07", "2020-04-13T22:26:38", "2020-04-13T22:27:08", "2020-04-13T22:27:39", "2020-04-13T22:28:09", "2020-04-13T22:28:40", "2020-04-13T22:29:10", "2020-04-13T22:29:41", "2020-04-13T22:30:11", "2020-04-13T22:30:42", "2020-04-13T22:31:12", "2020-04-13T22:31:43", "2020-04-13T22:32:13", "2020-04-13T22:32:44", "2020-04-13T22:33:15", "2020-04-13T22:33:45", "2020-04-13T22:34:16", "2020-04-13T22:34:46", "2020-04-13T22:35:17", "2020-04-13T22:35:47", "2020-04-13T22:36:18", "2020-04-13T22:36:48", "2020-04-13T22:37:19", "2020-04-13T22:37:50", "2020-04-13T22:38:20", "2020-04-13T22:38:51", "2020-04-13T22:39:21", "2020-04-13T22:39:52", "2020-04-13T22:40:22", "2020-04-13T22:40:53", "2020-04-13T22:41:23", "2020-04-13T22:41:54", "2020-04-13T22:42:24", "2020-04-13T22:42:55", "2020-04-13T22:43:25", "2020-04-13T22:43:56", "2020-04-13T22:44:26", "2020-04-13T22:44:57", "2020-04-13T22:45:27", "2020-04-13T22:45:58", "2020-04-13T22:46:28", "2020-04-13T22:46:59", "2020-04-13T22:47:29", "2020-04-13T22:48:00", "2020-04-13T22:48:30", "2020-04-13T22:49:01", "2020-04-13T22:49:22", "2020-05-11T18:33:53", "2020-05-11T18:34:23", "2020-05-11T18:34:54", "2020-05-11T18:35:24", "2020-05-11T18:35:55", "2020-05-11T18:36:25", "2020-05-11T18:36:56", "2020-05-11T18:37:26", "2020-05-11T18:37:57", "2020-05-11T18:38:28", "2020-05-11T18:38:58", "2020-05-11T18:39:29", "2020-05-11T18:39:59", "2020-05-11T18:40:30", "2020-05-11T18:41:01", "2020-05-11T18:41:31", "2020-05-11T18:42:02", "2020-05-11T18:42:32", "2020-05-11T18:43:03", "2020-05-11T18:43:33", "2020-05-11T18:44:04", "2020-05-11T19:20:19", "2020-05-11T19:20:49", "2020-05-11T19:21:20", "2020-05-11T19:21:50", "2020-05-11T19:22:21", "2020-05-11T19:22:51", "2020-05-11T19:23:22", "2020-05-11T19:23:52", "2020-05-11T19:24:23", "2020-05-11T19:24:54", "2020-05-11T19:25:24", "2020-05-11T19:25:55", "2020-05-11T19:26:25", "2020-05-11T19:26:56", "2020-05-11T19:27:27", "2020-05-11T19:27:57", "2020-05-11T19:28:28", "2020-05-11T19:28:58", "2020-05-11T19:29:29", "2020-05-11T19:29:59", "2020-05-11T19:30:30", "2020-05-11T19:31:00", "2020-05-11T19:31:31", "2020-05-11T19:32:01", "2020-05-11T19:32:32", "2020-05-11T19:33:02", "2020-05-11T19:33:33", "2020-05-11T19:34:04", "2020-05-11T19:34:34", "2020-05-11T19:35:05", "2020-05-11T19:35:35", "2020-05-11T19:36:06", "2020-05-11T19:36:37", "2020-05-11T19:37:07", "2020-05-11T19:37:38", "2020-05-11T19:38:08", "2020-05-11T19:38:39", "2020-05-11T19:39:09", "2020-05-11T19:39:40", "2020-05-11T19:40:10", "2020-05-11T19:40:41", "2020-05-11T19:41:11", "2020-05-11T19:41:42", "2020-05-11T19:42:12", "2020-05-11T19:42:43", "2020-05-11T19:43:13", "2020-05-11T19:43:44", "2020-05-11T19:44:15", "2020-05-11T19:44:45", "2020-05-11T19:45:16", "2020-05-11T19:45:46", "2020-05-11T19:46:17", "2020-05-11T19:46:48", "2020-05-11T19:47:18", "2020-05-11T19:47:49", "2020-05-11T19:48:19", "2020-05-11T19:48:50", "2020-05-11T19:49:20", "2020-05-11T19:49:51", "2020-05-11T19:50:21", "2020-05-11T19:50:52", "2020-05-11T19:51:22", "2020-05-11T19:51:53", "2020-05-11T19:52:23", "2020-05-11T19:52:54", "2020-05-11T19:53:24", "2020-05-11T19:53:55", "2020-05-11T19:54:25", "2020-05-11T19:54:56", "2020-05-11T19:55:27", "2020-05-11T19:55:57", "2020-05-11T19:56:28", "2020-05-11T19:56:58", "2020-05-11T19:57:29", "2020-05-11T19:58:00", "2020-05-11T19:58:30", "2020-05-11T19:59:01", "2020-05-11T19:59:31", "2020-05-11T20:00:02", "2020-05-11T20:00:32", "2020-05-11T20:01:03", "2020-05-11T20:01:33", "2020-05-11T20:02:04", "2020-05-11T20:02:34", "2020-05-11T20:03:05", "2020-05-11T20:03:35", "2020-05-11T20:04:06", "2020-05-11T20:04:36", "2020-05-11T20:05:07", "2020-05-11T20:05:38", "2020-05-11T20:06:08", "2020-05-11T20:06:39", "2020-05-11T20:07:09", "2020-05-11T20:07:40", "2020-05-11T20:08:11", "2020-05-11T20:08:41", "2020-05-11T20:09:12", "2020-05-11T20:09:42", "2020-05-11T20:10:13", "2020-05-11T20:10:43", "2020-05-11T20:11:14", "2020-05-11T20:11:44", "2020-05-11T20:12:15", "2020-05-11T20:12:45", "2020-05-11T20:13:16", "2020-05-11T20:13:46", "2020-05-11T20:14:17", "2020-05-11T20:14:47", "2020-05-11T20:15:18", "2020-05-11T20:15:48", "2020-05-11T20:16:19", "2020-05-11T20:16:50", "2020-05-11T20:17:20", "2020-05-11T20:17:51", "2020-05-11T20:18:22", "2020-05-11T20:18:53", "2020-05-11T20:19:24", "2020-05-11T20:19:55", "2020-05-11T20:20:25", "2020-05-11T20:20:56", "2020-05-11T20:21:26", "2020-05-11T20:21:57", "2020-05-11T20:22:27", "2020-05-11T20:22:58", "2020-05-11T20:23:28", "2020-05-11T20:23:59", "2020-05-11T20:24:29", "2020-05-11T20:25:00", "2020-05-11T20:25:30", "2020-05-11T20:26:01", "2020-05-11T20:26:31", "2020-05-11T20:27:02", "2020-05-11T20:27:33", "2020-05-11T20:28:03", "2020-05-11T20:28:34", "2020-05-11T20:29:05", "2020-05-11T20:29:35", "2020-05-11T20:30:06", "2020-05-11T20:30:36", "2020-05-11T20:31:07", "2020-05-11T20:31:37", "2020-05-11T20:32:08", "2020-05-11T20:32:38", "2020-05-11T20:33:09", "2020-05-11T20:33:39", "2020-05-11T20:34:10", "2020-05-11T20:34:40", "2020-05-11T20:35:11", "2020-05-11T20:35:41", "2020-05-11T20:36:12", "2020-05-11T20:36:42", "2020-05-11T20:37:13", "2020-05-11T20:37:44", "2020-05-11T20:38:14", "2020-05-11T20:38:45", "2020-05-11T20:39:15", "2020-05-11T20:39:46", "2020-05-11T20:40:17", "2020-05-11T20:40:47", "2020-05-11T20:41:18", "2020-05-11T20:41:48", "2020-05-11T20:42:19", "2020-05-11T20:42:49", "2020-05-11T20:43:20", "2020-05-11T20:43:50", "2020-05-11T20:44:21", "2020-05-11T20:44:51", "2020-05-11T20:45:22", "2020-05-11T20:45:52", "2020-05-11T20:46:23", "2020-05-11T20:46:53", "2020-05-11T20:47:24", "2020-05-11T20:47:55", "2020-05-11T20:48:25", "2020-05-11T20:48:56", "2020-05-11T20:49:27", "2020-05-11T20:49:57", "2020-05-11T20:50:28", "2020-05-11T20:50:58", "2020-05-11T20:51:29", "2020-05-11T20:51:59", "2020-05-11T20:52:30", "2020-05-11T20:53:00", "2020-05-11T20:53:31", "2020-05-11T20:54:01", "2020-05-11T20:54:32", "2020-05-11T20:55:02", "2020-05-11T20:55:33", "2020-05-11T20:58:27", "2020-05-11T20:58:57", "2020-05-11T20:59:28", "2020-05-11T20:59:48", "2020-05-11T21:00:18", "2020-05-11T21:00:49", "2020-05-11T21:01:19", "2020-05-11T21:01:50", "2020-05-11T21:02:20", "2020-05-11T21:02:51", "2020-05-11T21:03:21", "2020-05-11T21:03:52", "2020-05-11T21:04:22", "2020-05-11T21:04:53", "2020-05-11T21:05:23", "2020-05-11T21:05:54", "2020-05-11T21:06:25", "2020-05-11T21:06:55", "2020-05-11T21:07:26", "2020-05-11T21:07:57"],
    datasets: [{
      label: "Time Series Plot: smeter-2.current2",
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
      data: [7.924031, 7.400073, 7.494444, 7.500175, 7.538694, 7.550506, 7.475965, 7.447341, 7.45525, 7.43069, 8.983418, 7.672053, 7.422574, 8.927293, 7.625805, 7.584882, 8.312341, 8.295546, 8.210714, 8.349951, 8.327219, 8.12805, 7.976412, 7.285267, 7.204659, 8.264449, 8.920735, 8.417871, 8.292892, 8.280582, 8.261058, 8.430906, 8.288852, 8.304845, 8.850787, 6.865886, 6.852767, 8.119712, 8.583173, 8.629652, 9.0685, 8.430136, 8.729023, 9.360227, 8.059777, 7.933053, 9.217332, 9.146776, 9.175586, 8.656996, 8.994209, 9.059164, 9.008286, 8.793037, 8.96486, 8.943816, 7.796663, 7.292311, 7.333631, 7.483008, 7.183456, 7.578483, 7.410995, 7.250814, 6.974303, 7.224508, 7.157079, 7.07094, 7.151246, 7.162637, 7.171735, 7.13436, 7.26267, 7.433915, 7.410187, 7.392192, 7.423678, 7.395367, 7.428714, 7.327343, 7.310207, 7.17842, 7.301363, 7.394217, 7.418113, 7.507357, 7.307539, 7.312327, 6.250309, 6.450105, 7.194708, 7.132948, 7.974303, 7.495418, 10.915072, 10.518806, 10.097553, 11.793627, 12.651906, 11.881406, 11.795169, 11.864542, 11.661539, 12.141443, 12.129887, 12.310146, 11.254481, 11.24858, 173.128464, 63.527294, 8.154338, 8.147421, 8.081107, 8.141393, 8.142028, 8.162912, 8.129797, 8.10689, 8.133228, 8.102468, 8.11513, 8.100501, 8.106129, 8.095827, 8.16974, 8.12044, 8.078701, 8.144258, 8.1038, 8.018888, 66.803833, 6.191663, 6.151816, 6.187433, 6.163155, 6.211399, 6.134972, 6.166812, 6.212034, 6.234079, 6.187078, 6.219137, 6.286194, 6.215953, 6.204936, 6.251589, 6.221276, 6.191832, 6.258396, 6.265781, 6.237895, 6.298233, 6.246337, 6.286576, 6.236554, 6.280338, 6.246936, 6.279108, 6.254884, 6.307863, 6.285563, 6.301415, 6.283408, 6.340279, 6.310181, 6.290567, 6.35481, 6.282407, 6.286135, 6.303586, 6.461749, 6.239608, 6.257099, 6.293641, 6.290761, 6.27674, 6.291172, 6.268018, 6.307271, 6.258162, 6.255621, 6.25382, 6.272432, 6.363201, 6.247229, 6.214932, 6.229124, 6.241539, 6.356464, 6.256886, 6.216192, 6.238782, 6.253957, 6.258396, 6.25459, 6.202173, 6.296053, 6.275597, 6.300411, 6.32698, 6.285888, 6.285623, 6.270597, 6.299758, 6.288588, 7.113068, 7.112477, 7.012898, 6.892927, 6.965881, 7.120972, 7.095182, 7.181519, 7.080841, 7.103887, 7.224753, 7.084896, 7.091072, 7.101447, 7.084279, 7.054626, 7.097459, 7.096315, 7.072716, 7.037256, 7.074066, 7.023085, 7.067411, 7.291067, 7.196204, 7.085105, 7.14004, 7.133665, 7.15227, 7.094203, 7.09417, 7.110669, 7.086473, 7.082841, 7.122509, 7.089003, 7.129143, 7.102344, 7.118971, 7.098427, 56.876522, 4.263595, 3.865413, 3.810919, 3.836311, 3.807649, 3.834158, 3.814836, 3.810849, 3.779367, 3.818939, 3.825298, 3.768897, 3.837262, 3.79659, 3.774608, 3.790341, 3.775377, 3.730987, 3.741563, 3.753246, 3.792332, 3.745696, 3.683328, 3.719326, 3.749916, 3.721987, 3.762964, 3.772512, 3.776116, 3.732727, 3.766336, 3.74979, 3.720282, 3.754924, 3.789716, 3.745488, 3.787481, 3.743837, 3.750508, 3.769054, 3.720313, 3.738535, 3.775469, 3.76692, 3.764065, 3.787615, 3.751697, 3.791127, 3.730139, 3.739344, 3.795209, 3.774392, 3.800175, 3.830892, 3.780718, 3.76774, 3.784049, 3.8031, 3.807567, 3.784247, 3.803003, 3.839246, 3.758348, 3.746087, 3.822719, 3.79915, 3.826807, 3.806963, 3.790797, 3.8105, 3.759455, 3.741646, 57.145061, 7.647688, 7.58103, 58.796848, 3.659722, 3.615614, 2.919304, 4.201752, 7.468833, 3.893656, 3.865649, 3.869857, 3.858469, 3.888626, 3.874428, 3.855786, 3.87727, 3.892383, 3.901023, 3.904932],

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
