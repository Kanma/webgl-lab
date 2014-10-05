precision mediump float;

uniform vec4 diffuse_color;

varying vec4 vertex_color;


void main(void)
{
    gl_FragColor = vertex_color;
}
