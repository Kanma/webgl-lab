/* gl-lab.lights.directional.js

   Directional light implementation
*/


// Declaration of our namespaces
if (gl_lab === undefined)
    var gl_lab = {};

if (gl_lab.lights === undefined)
    gl_lab.lights = {};


/******************************* CLASS: DirectionalLight ********************************/

//----------------------------------------------------------------------------------------
// Constructor
//----------------------------------------------------------------------------------------
gl_lab.lights.DirectionalLight = function(name, color)
{
    this.name      = name;
    this.direction = vec3.clone([-0.707, -0.707, 0.0]);
    this.color     = (color !== undefined ? color : new gl_lab.RGBColor([0.5, 0.5, 0.5]));
}
