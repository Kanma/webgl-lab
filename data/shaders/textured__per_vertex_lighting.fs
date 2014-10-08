//----------------------------------------------------------------------------------------
// Rendering of a textured object, with per-vertex lighting
//----------------------------------------------------------------------------------------

precision mediump float;

// Textures
uniform sampler2D diffuse_texture;

// Lighting
uniform vec3 ambient_light_color;

// Inputs
varying vec4 processed_diffuse_factor;
varying vec2 processed_texture_coordinates;


void main(void)
{
    vec4 diffuse_color = texture2D(diffuse_texture, vec2(processed_texture_coordinates.s,
                                   processed_texture_coordinates.t));

    vec4 ambient_intensity = vec4(ambient_light_color, 1.0) * diffuse_color;

    gl_FragColor = ambient_intensity + processed_diffuse_factor * diffuse_color;
}
