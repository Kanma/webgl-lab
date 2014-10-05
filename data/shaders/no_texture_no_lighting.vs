attribute vec3 in_vertex_position;

uniform mat4 model_view_matrix;
uniform mat4 perspective_matrix;


void main(void)
{
    gl_Position = perspective_matrix * model_view_matrix * vec4(in_vertex_position, 1.0);
}
