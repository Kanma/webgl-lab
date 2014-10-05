/* gl-lab.shaderprogram.js

   Shader program implementation
*/


// Declaration of our namespaces
if (gl_lab === undefined)
    var gl_lab = {};



/************************************ CLASS: Object *************************************/

//----------------------------------------------------------------------------------------
// Constructor
//----------------------------------------------------------------------------------------
gl_lab.ShaderProgram = function(gl, vertex_shader, fragment_shader)
{
    // Attributes
    this.program = gl.createProgram();

    this.attributes = {
        vertex_position:     null,
        texture_coordinates: null,
        normal:              null,
        vertex_color:        null,
    };

    this.uniforms = {
        model_view_matrix:  null,
        perspective_matrix: null,
        diffuse_color:      null,
        diffuse_texture:    null,
    };


    // Attempt to link the two shaders
    gl.attachShader(this.program, vertex_shader);
    gl.attachShader(this.program, fragment_shader);
    gl.linkProgram(this.program);

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS))
    {
        alert(gl.getProgramInfoLog(this.program));
        this.program = null;
        return;
    }


    // Retrieve the attributes
    gl.useProgram(this.program);

    this.attributes.vertex_position     = gl.getAttribLocation(this.program, 'in_vertex_position');
    this.attributes.texture_coordinates = gl.getAttribLocation(this.program, 'in_texture_coordinates');
    this.attributes.normal              = gl.getAttribLocation(this.program, 'in_normal');
    this.attributes.vertex_color        = gl.getAttribLocation(this.program, 'in_vertex_color');

    if (this.attributes.vertex_position >= 0)
        gl.enableVertexAttribArray(this.attributes.vertex_position);

    if (this.attributes.texture_coordinates >= 0)
        gl.enableVertexAttribArray(this.attributes.texture_coordinates);

    if (this.attributes.normal >= 0)
        gl.enableVertexAttribArray(this.attributes.normal);

    if (this.attributes.vertex_color >= 0)
        gl.enableVertexAttribArray(this.attributes.vertex_color);


    // Retrieve the uniforms
    this.uniforms.model_view_matrix  = gl.getUniformLocation(this.program, 'model_view_matrix');
    this.uniforms.perspective_matrix = gl.getUniformLocation(this.program, 'perspective_matrix');
    this.uniforms.diffuse_color      = gl.getUniformLocation(this.program, 'diffuse_color');
    this.uniforms.diffuse_texture    = gl.getUniformLocation(this.program, 'diffuse_texture');
}
