//----------------------------------------------------------------------------------------
// Rendering of an untextured object, without any lighting
//----------------------------------------------------------------------------------------

// Per-vertex inputs
attribute vec3 in_vertex_position;

// Transforms
uniform mat4 model_view_matrix;
uniform mat4 perspective_matrix;

// Colors
uniform vec4 diffuse_color;

// Outputs
varying vec4 processed_diffuse_color;


void main(void)
{
    gl_Position = perspective_matrix * model_view_matrix * vec4(in_vertex_position, 1.0);
    processed_diffuse_color = diffuse_color;
}
