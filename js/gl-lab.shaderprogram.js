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
        vertex_normal:       null,
        vertex_color:        null,
    };

    this.uniforms = {
        // Transforms
        model_view_matrix:   null,
        normals_matrix:      null,
        perspective_matrix:  null,

        // Lighting
        ambient_light_color:         null,
        directional_light_direction: null,
        directional_light_color:     null,
        point_light_position:        null,
        point_light_color:           null,

        // Material
        ambient_color:       null, 
        diffuse_color:       null,
        diffuse_texture:     null,

        // Flags
        use_vertex_colors:   null, 
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
    this.attributes.vertex_normal       = gl.getAttribLocation(this.program, 'in_vertex_normal');
    this.attributes.vertex_color        = gl.getAttribLocation(this.program, 'in_vertex_color');

    if (this.attributes.vertex_position >= 0)
        gl.enableVertexAttribArray(this.attributes.vertex_position);

    if (this.attributes.texture_coordinates >= 0)
        gl.enableVertexAttribArray(this.attributes.texture_coordinates);

    if (this.attributes.vertex_normal >= 0)
        gl.enableVertexAttribArray(this.attributes.vertex_normal);

    if (this.attributes.vertex_color >= 0)
        gl.enableVertexAttribArray(this.attributes.vertex_color);


    // Retrieve the uniforms
    this.uniforms.model_view_matrix           = gl.getUniformLocation(this.program, 'model_view_matrix');
    this.uniforms.normals_matrix              = gl.getUniformLocation(this.program, 'normals_matrix');
    this.uniforms.perspective_matrix          = gl.getUniformLocation(this.program, 'perspective_matrix');

    this.uniforms.ambient_light_color         = gl.getUniformLocation(this.program, 'ambient_light_color');
    this.uniforms.directional_light_direction = gl.getUniformLocation(this.program, 'directional_light_direction');
    this.uniforms.directional_light_color     = gl.getUniformLocation(this.program, 'directional_light_color');
    this.uniforms.point_light_position        = gl.getUniformLocation(this.program, 'point_light_position');
    this.uniforms.point_light_color           = gl.getUniformLocation(this.program, 'point_light_color');

    this.uniforms.ambient_color               = gl.getUniformLocation(this.program, 'ambient_color');
    this.uniforms.diffuse_color               = gl.getUniformLocation(this.program, 'diffuse_color');
    this.uniforms.diffuse_texture             = gl.getUniformLocation(this.program, 'diffuse_texture');

    this.uniforms.use_vertex_colors           = gl.getUniformLocation(this.program, 'use_vertex_colors');
}


//----------------------------------------------------------------------------------------
// Destruction function
//----------------------------------------------------------------------------------------
gl_lab.ShaderProgram.prototype.destroy = function(gl)
{
    gl.deleteProgram(this.program);
}
