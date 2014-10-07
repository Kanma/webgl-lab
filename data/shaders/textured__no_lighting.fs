//----------------------------------------------------------------------------------------
// Rendering of a textured object, without any lighting
//----------------------------------------------------------------------------------------

precision mediump float;

// Textures
uniform sampler2D diffuse_texture;

// Inputs
varying vec2 texture_coordinates;


void main(void)
{
    gl_FragColor = texture2D(diffuse_texture, vec2(texture_coordinates.s, texture_coordinates.t));
}
