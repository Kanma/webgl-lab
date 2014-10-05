attribute vec3 in_vertex_position;
attribute vec3 in_vertex_color;

uniform mat4 model_view_matrix;
uniform mat4 perspective_matrix;

varying vec4 vertex_color;


void main(void)
{
    gl_Position = perspective_matrix * model_view_matrix * vec4(in_vertex_position, 1.0);
    vertex_color = vec4(in_vertex_color, 1.0);
}
