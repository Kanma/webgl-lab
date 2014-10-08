//----------------------------------------------------------------------------------------
// Rendering of a textured object, with per-pixel lighting
//----------------------------------------------------------------------------------------

precision mediump float;

// Textures
uniform sampler2D diffuse_texture;

// Lighting
uniform vec3 ambient_light_color;
uniform vec3 directional_light_direction;
uniform vec3 directional_light_color;
uniform vec3 point_light_position;
uniform vec3 point_light_color;

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
                             vec4(point_light_color, 1.0) * diffuse_color *
                             max(dot(processed_normal, light_direction), 0.0);

    gl_FragColor = ambient_intensity + diffuse_intensity;
}
