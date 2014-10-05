/* gl-lab.submesh.js

   Submesh implementation
*/


// Declaration of our namespaces
if (gl_lab === undefined)
    var gl_lab = {};


/************************************ CLASS: SubMesh ************************************/

//----------------------------------------------------------------------------------------
// Constructor
//----------------------------------------------------------------------------------------
gl_lab.SubMesh = function()
{
    this.vertex_buffer              = null;
    this.normal_buffer              = null;
    this.texture_coordinates_buffer = null;
    this.color_buffer               = null;
    this.index_buffer               = null;
    this.shader_program             = null;
    this.material                   = new gl_lab.Material();
}
