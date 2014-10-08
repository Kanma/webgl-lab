//----------------------------------------------------------------------------------------
// Rendering of a textured object, with per-pixel lighting
//
// NOTE: no specular component yet
//
// Setup:
//   - Ambient light
//   - 1 directional light
//   - 1 point light
//----------------------------------------------------------------------------------------

// Per-vertex inputs
attribute vec3 in_vertex_position;
attribute vec3 in_vertex_normal;
attribute vec3 in_vertex_color;
attribute vec2 in_texture_coordinates;

// Transforms
uniform mat4 model_view_matrix;
uniform mat3 normals_matrix;
uniform mat4 perspective_matrix;

// Outputs
varying vec4 processed_position;
varying vec3 processed_normal;
varying vec2 processed_texture_coordinates;


void main(void)
{
    processed_position = model_view_matrix * vec4(in_vertex_position, 1.0);

    gl_Position = perspective_matrix * processed_position;

    processed_normal = normals_matrix * in_vertex_normal;

    processed_texture_coordinates = in_texture_coordinates;
}
