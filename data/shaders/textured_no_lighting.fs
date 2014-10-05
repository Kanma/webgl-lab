precision mediump float;

uniform sampler2D diffuse_texture;

varying vec2 texture_coordinates;


void main(void)
{
    gl_FragColor = texture2D(diffuse_texture, vec2(texture_coordinates.s, texture_coordinates.t));
}
