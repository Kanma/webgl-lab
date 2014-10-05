attribute vec3 in_vertex_position;
attribute vec2 in_texture_coordinates;

uniform mat4 model_view_matrix;
uniform mat4 perspective_matrix;

varying vec2 texture_coordinates;


void main(void)
{
    gl_Position = perspective_matrix * model_view_matrix * vec4(in_vertex_position, 1.0);
    texture_coordinates = in_texture_coordinates;
}
