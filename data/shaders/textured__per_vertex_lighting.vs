//----------------------------------------------------------------------------------------
// Rendering of a textured object, with per-vertex lighting
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

// Material
uniform vec4  specular_color;
uniform float specular_coefficient;

// Lighting
uniform vec3 directional_light_direction;
uniform vec3 directional_light_color;
uniform vec3 point_light_position;
uniform vec3 point_light_diffuse_color;
uniform vec3 point_light_specular_color;

// Outputs
varying vec4 processed_diffuse_factor;
varying vec4 processed_specular_intensity;
varying vec2 processed_texture_coordinates;


void main(void)
{
    vec4 vertex_position = model_view_matrix * vec4(in_vertex_position, 1.0);

    gl_Position = perspective_matrix * vertex_position;

    processed_texture_coordinates = in_texture_coordinates;

    vec3 light_direction = normalize(point_light_position - vertex_position.xyz);

    vec3 transformed_normal = normals_matrix * in_vertex_normal;

    processed_diffuse_factor = vec4(directional_light_color, 1.0) *
                               max(dot(transformed_normal, directional_light_direction), 0.0) +
                               vec4(point_light_diffuse_color, 1.0) *
                               max(dot(transformed_normal, light_direction), 0.0);

    vec3 eye_direction = normalize(-vertex_position.xyz);

    vec3 reflection_direction = reflect(-light_direction, transformed_normal);

    processed_specular_intensity = pow(max(dot(reflection_direction, eye_direction), 0.0), specular_coefficient) *
                                   vec4(point_light_specular_color, 1.0) * specular_color;
}
