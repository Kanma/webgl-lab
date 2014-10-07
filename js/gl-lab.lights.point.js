/* gl-lab.lights.point.js

   Point light implementation
*/


// Declaration of our namespaces
if (gl_lab === undefined)
    var gl_lab = {};

if (gl_lab.lights === undefined)
    gl_lab.lights = {};


/********************************** CLASS: PointLight ***********************************/

//----------------------------------------------------------------------------------------
// Constructor
//----------------------------------------------------------------------------------------
gl_lab.lights.PointLight = function(name, color)
{
    this.name       = name;
    this.transforms = new gl_lab.Transforms();
    this.color      = (color !== undefined ? color : new gl_lab.RGBColor([0.5, 0.5, 0.5]));
}
