//----------------------------------------------------------------------------------------
// Rendering of a vertex colored object, with per-pixel lighting
//
// NOTE: no specular component yet
//
// Setup:
//   - Ambient light
//   - 1 directional light
//   - 1 point light
//   - Vertex colors
//----------------------------------------------------------------------------------------

// Per-vertex inputs
attribute vec3 in_vertex_position;
attribute vec3 in_vertex_normal;
attribute vec3 in_vertex_color;

// Transforms
uniform mat4 model_view_matrix;
uniform mat3 normals_matrix;
uniform mat4 perspective_matrix;

// Lighting
uniform vec3 ambient_light_color;

// Outputs
varying vec4 processed_position;
varying vec3 processed_normal;
varying vec4 processed_ambient_intensity;
varying vec4 processed_diffuse_color;


void main(void)
{
    processed_position = model_view_matrix * vec4(in_vertex_position, 1.0);

    gl_Position = perspective_matrix * processed_position;

    processed_normal = normals_matrix * in_vertex_normal;

    processed_diffuse_color = vec4(in_vertex_color, 1.0);

    processed_ambient_intensity = vec4(ambient_light_color, 1.0) * processed_diffuse_color;
}
