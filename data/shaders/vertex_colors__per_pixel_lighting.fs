//----------------------------------------------------------------------------------------
// Rendering of an untextured object, with per-pixel lighting
//
// NOTE: no specular component yet
//----------------------------------------------------------------------------------------

precision mediump float;

// Lighting
uniform vec3 directional_light_direction;
uniform vec3 directional_light_color;
uniform vec3 point_light_position;
uniform vec3 point_light_color;

// Inputs
varying vec4 processed_position;
varying vec3 processed_normal;
varying vec4 processed_diffuse_color;
varying vec4 processed_ambient_intensity;


void main(void)
{
    vec3 light_direction = normalize(point_light_position - processed_position.xyz);

    vec4 diffuse_intensity = vec4(directional_light_color, 1.0) * processed_diffuse_color *
                             max(dot(processed_normal, directional_light_direction), 0.0) +
                             vec4(point_light_color, 1.0) * processed_diffuse_color *
                             max(dot(processed_normal, light_direction), 0.0);

    gl_FragColor = processed_ambient_intensity + diffuse_intensity;
}
