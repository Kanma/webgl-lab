/* gl-lab.material.js

   Material implementation
*/


// Declaration of our namespaces
if (gl_lab === undefined)
    var gl_lab = {};



/*********************************** CLASS: Material ************************************/

//----------------------------------------------------------------------------------------
// Constructor
//----------------------------------------------------------------------------------------
gl_lab.Material = function()
{
    // Colors
    this.ambient_color        = new gl_lab.RGBColor([0.0, 0.0, 0.0]);
    this.diffuse_color        = new gl_lab.RGBColor([0.0, 0.0, 0.0]);
    this.emissive_color       = new gl_lab.RGBColor([0.0, 0.0, 0.0]);
    this.specular_color       = new gl_lab.RGBColor([0.0, 0.0, 0.0]);
    this.specular_coefficient = 0.0;

    // Textures
    this.diffuse_texture = null;
    this.normal_map      = null;
}
