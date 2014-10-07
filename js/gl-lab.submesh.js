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


//----------------------------------------------------------------------------------------
// Change the shader program used for the submesh
//----------------------------------------------------------------------------------------
gl_lab.SubMesh.prototype.setShaderProgram = function(gl, vertex_shader_name, fragment_shader_name)
{
    if (this.shader_program !== null)
    {
        this.shader_program.destroy(gl);
        this.shader_program = null;
    }

    this.shader_program = new gl_lab.ShaderProgram(gl, gl_lab.resources.get('data/shaders/' + vertex_shader_name),
                                                   gl_lab.resources.get('data/shaders/' + fragment_shader_name));
}
