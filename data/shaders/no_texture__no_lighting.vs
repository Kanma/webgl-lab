//----------------------------------------------------------------------------------------
// Rendering of an untextured object, without any lighting
//
// The object color is determined using the vertex colors (if available), or the provided
// diffuse color
//----------------------------------------------------------------------------------------

// Per-vertex inputs
attribute vec3 in_vertex_position;
attribute vec3 in_vertex_color;

// Transforms
uniform mat4 model_view_matrix;
uniform mat4 perspective_matrix;

// Colors
uniform bool use_vertex_colors;
uniform vec4 diffuse_color;

// Outputs
varying vec4 processed_diffuse_color;


void main(void)
{
    gl_Position = perspective_matrix * model_view_matrix * vec4(in_vertex_position, 1.0);

    if (use_vertex_colors)
        processed_diffuse_color = vec4(in_vertex_color, 1.0);
    else
        processed_diffuse_color = diffuse_color;
}
