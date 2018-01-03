// colors.js
const express = require('express')
const path = require("path");
const Color = require("./colorlib.js");
const app = express();
const fs = require('fs')
var objColor = []
var colorstxt = fs.readFileSync("./colors.txt", "utf-8");
var color = colorstxt.split('\n');
var colors = color.toString().split(',');
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.get('/', function(req, res){
    res.redirect('/colors')
});
app.get('/about', function(req, res){
  res.render('about.hbs');
});
function validateForm(req, res, next) {
  if(((req.query.red == undefined) && (req.query.green == undefined) && (req.query.blue == undefined) && (req.query.shades == undefined))) {
    req.query.red = 0;
    req.query.green = 0;
    req.query.blue = 0;
    req.query.shades = 2;
    return next();
  }
  else {
    // everything looks good
    return next();
  }
}
app.get('/colors',validateForm,function(req, res){
  var query = req.query;
  console.log(JSON.stringify(req.query));
  var red=0;
  var green=0;
  var blue=0;
  var shades=2;
  var df = new Color(red,green,blue,shades);
  var newColor = new Color(query.red,query.green,query.blue)
  var shades = parseInt(query.shades);
  shades = shades-1;
  var hex = '#'+newColor.getHex(query.red,query.green,query.blue);
  console.log("THIS THE HEX" + hex)
  newColor.addHex(hex)
  console.log("see this?: "+newColor.hex)
  var colorname =" ";
  var shadenames =" ";
  var index = colors.indexOf(hex)
  if(index !== -1){
        colorname = String(colors[index-1])
  }
  newColor.addName(colorname)
  objColor.push(newColor)
  console.log("The # shades:"+ shades)
  var shades = newColor.getShades(hex,shades)
  shades.forEach(function(element) {
      var obj = newColor.getRGB(element)
      var newShade = new Color(obj.r,obj.g,obj.b)
      newShade.addHex(element)
      var shadex = colors.indexOf(element)
      if(shadex !== -1){
            shadenames = String(colors[shadex-1])
      }
      newShade.addName(colorname)
      newShade.shade = true;
      objColor.push(newShade)
  });
  objColor.forEach(function(element) {
    console.log("hex2: "+element.hex);
  });
  res.render('colors.hbs',{"data" : objColor})
});

app.listen(3000);
