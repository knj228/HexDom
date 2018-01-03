class Color{
constructor(r,g,b,hex=""){
  this.r = r;
  this.g = g;
  this.b = b;
  this.hex = hex
  this.name = " "
}
addHex(color){
    this.hex = color
}
 addName(name){
    this.name = name
}

getRGB(hex){
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
getHex(r,g,b){
    var bin = r << 16 | g << 8 | b;
      return (function(h){
        return new Array(7-h.length).join("0")+h})(bin.toString(16).toUpperCase())
}
getShade(c, percent) {
    console.log("hex: "+c)
    var f=parseInt(String(c).slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}
Repeat(n,iterator,arg) {
  n = parseInt(n);
  console.log("N: "+arg)
  var accum = Array(Math.max(0, n));
  for (var i = 0; i < n; i++)
  {
    var per = ((i+1)/4);
    console.log
    accum[i] = iterator.call(this,arg,per);
  }
  return accum;
};

getShades(hex,num){
  console.log("NUM: "+num)
  var shades = this.Repeat(num,this.getShade,hex);
  console.log("SHADES: "+shades);
  return shades;
  }
}
module.exports = Color;
