var express = require('express');
var app = express();
var path = require('path');
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

app.get('/:inp', (req, res) => {
  var inp = req.params.inp;
  var new_date = {};
  if (inp == parseInt(inp)) {
    var d = new Date(0);
    d.setUTCSeconds(req.params.inp);
    new_date["unix"] = parseInt((d.getTime() / 1000).toFixed(0));
    new_date["natural"] = monthNames[d.getMonth()] + " " + addZ(d.getDate()) + ", " + d.getFullYear();
  } else if (isNatural(inp)["bool"]) {
    var d = isNatural(inp)["d"];
    console.log(typeof (d));
    new_date["unix"] = parseInt((d.getTime() / 1000).toFixed(0));
    new_date["natural"] = monthNames[d.getMonth()] + " " + addZ(d.getDate()) + ", " + d.getFullYear();
  } else {
    new_date["unix"] = null;
    new_date["natural"] = null;
  }
  res.send(JSON.stringify(new_date));
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 5000, () => {
  console.log('Listening on port 3000');
});

function addZ(n) { return n < 10 ? '0' + n : '' + n; }

function isNatural(inp) {
  try {
    var arr = inp.split(' ');
    var isMth = false;
    var dt = arr[1].slice(0, -1);
    var yr = arr[2];
    var mth;
    for (var i = 0; i < 12; i++) {
      if (arr[0] == monthNames[i]) {
        isMth = true;
        mth = i;
        break;
      }
    }
    if (!mth || (dt < 1 || dt > 31 || (yr < 0000 || yr > 9999))) { throw "invalid month" };
    var d = new Date(yr, mth, dt, 0, 0, 0, 0);
    var dateInfo = {};
    dateInfo["bool"] = (d) ? true : false;
    dateInfo["d"] = d;
    return dateInfo;
  } catch (err) {
    console.log(err);
    var dateInfo = {};
    dateInfo["bool"] = false;
    dateInfo["d"] = null;
    return dateInfo;
  }
}