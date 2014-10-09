//----------------------------------------------------------------------------------------
// Rendering of an untextured object, with per-pixel lighting
//
// Setup:
//   - Ambient light
//   - 1 directional light
//   - 1 point light
//   - No texture
//----------------------------------------------------------------------------------------

// Per-vertex inputs
attribute vec3 in_vertex_position;
attribute vec3 in_vertex_normal;

// Transforms
uniform mat4 model_view_matrix;
uniform mat3 normals_matrix;
uniform mat4 perspective_matrix;

// Material
uniform vec4  ambient_color;

// Lighting
uniform vec3 ambient_light_color;

// Outputs
varying vec4  processed_position;
varying vec3  processed_normal;
varying vec4  processed_ambient_intensity;


void main(void)
{
    processed_position = model_view_matrix * vec4(in_vertex_position, 1.0);

    gl_Position = perspective_matrix * processed_position;

    processed_normal = normals_matrix * in_vertex_normal;

    processed_ambient_intensity = vec4(ambient_light_color, 1.0) * ambient_color;
}
