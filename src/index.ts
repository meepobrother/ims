import lodash = require('lodash');
import ps = require('current-processes');

ps.get(function (err, processes) {

    var sorted = lodash.sortBy(processes, 'cpu');
    var top5 = sorted.reverse().splice(0, 5);

    console.log(top5);
    debugger;
});
