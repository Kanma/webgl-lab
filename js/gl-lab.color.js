/* gl-lab.color.js

   Color implementation
*/


// Declaration of our namespaces
if (gl_lab === undefined)
    var gl_lab = {};



/*********************************** CLASS: RGBColor ************************************/

//----------------------------------------------------------------------------------------
// Constructor
//----------------------------------------------------------------------------------------
gl_lab.RGBColor = function(val)
{
    if (val !== undefined)
        this.data = vec3.clone(val);
    else
        this.data = vec3.clone([0, 0, 0]);
}


//---------------------------------------------------------


gl_lab.RGBColor.prototype.__defineGetter__('r', function()
{
    return this.data[0];
});


//---------------------------------------------------------


gl_lab.RGBColor.prototype.__defineSetter__('r', function(v)
{
    this.data[0] = v;
});


//---------------------------------------------------------


gl_lab.RGBColor.prototype.__defineGetter__('g', function()
{
    return this.data[1];
});


//---------------------------------------------------------


gl_lab.RGBColor.prototype.__defineSetter__('g', function(v)
{
    this.data[1] = v;
});


//---------------------------------------------------------


gl_lab.RGBColor.prototype.__defineGetter__('b', function()
{
    return this.data[2];
});


//---------------------------------------------------------


gl_lab.RGBColor.prototype.__defineSetter__('b', function(v)
{
    this.data[2] = v;
});
