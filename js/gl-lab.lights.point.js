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
gl_lab.lights.PointLight = function(name, diffuse_color, specular_color)
{
    this.name           = name;
    this.transforms     = new gl_lab.Transforms();
    this.diffuse_color  = (diffuse_color !== undefined ? diffuse_color : new gl_lab.RGBColor([0.5, 0.5, 0.5]));
    this.specular_color = (specular_color !== undefined ? specular_color : new gl_lab.RGBColor([1.0, 1.0, 1.0]));
}
