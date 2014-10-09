//----------------------------------------------------------------------------------------
// Rendering of a textured object, with per-pixel lighting
//----------------------------------------------------------------------------------------

precision mediump float;

// Textures
uniform sampler2D diffuse_texture;

// Material
uniform vec4  specular_color;
uniform float specular_coefficient;

// Lighting
uniform vec3 ambient_light_color;
uniform vec3 directional_light_direction;
uniform vec3 directional_light_color;
uniform vec3 point_light_position;
uniform vec3 point_light_diffuse_color;
uniform vec3 point_light_specular_color;

// Inputs
varying vec4 processed_position;
varying vec3 processed_normal;
varying vec2 processed_texture_coordinates;


void main(void)
{
    vec3 light_direction = normalize(point_light_position - processed_position.xyz);

    vec4 diffuse_color = texture2D(diffuse_texture, vec2(processed_texture_coordinates.s,
                                   processed_texture_coordinates.t));

    vec4 ambient_intensity = vec4(ambient_light_color, 1.0) * diffuse_color;

    vec4 diffuse_intensity = vec4(directional_light_color, 1.0) * diffuse_color *
                             max(dot(processed_normal, directional_light_direction), 0.0) +
                             vec4(point_light_diffuse_color, 1.0) * diffuse_color *
                             max(dot(processed_normal, light_direction), 0.0);

    vec3 eye_direction = normalize(-processed_position.xyz);

    vec3 reflection_direction = reflect(-light_direction, processed_normal);

    vec4 specular_intensity = pow(max(dot(reflection_direction, eye_direction), 0.0), specular_coefficient) *
                              vec4(point_light_specular_color, 1.0) * specular_color;

    gl_FragColor = ambient_intensity + diffuse_intensity + specular_intensity;
}
