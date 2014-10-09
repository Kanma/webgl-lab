/* gl-lab.rendering.js

   Mesh-related classes
*/


// Declaration of our namespaces
if (gl_lab === undefined)
    var gl_lab = {};

if (gl_lab.rendering === undefined)
    gl_lab.rendering = {};


//----------------------------------------------------------------------------------------
// Render a scene
//----------------------------------------------------------------------------------------
gl_lab.rendering.render = function(gl, scene)
{
    // Viewport initialisation
    gl.viewport(scene.camera.viewport.left, scene.camera.viewport.top,
                scene.camera.viewport.width, scene.camera.viewport.height);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    // Compute the perspective matrix
    var perspective_matrix = mat4.create();

    mat4.perspective(perspective_matrix, degToRad(scene.camera.fovy),
                     scene.camera.viewport.width / scene.camera.viewport.height,
                     scene.camera.near, scene.camera.far);

    var camera_transforms = mat4.create();
    mat4.invert(camera_transforms, scene.camera.transforms.matrix);
    mat4.multiply(perspective_matrix, perspective_matrix, camera_transforms);


    // Draw the objects
    for (var i = 0; i < scene.objects.length; ++i)
    {
        var obj = scene.objects[i];

        for (var j = 0; j < obj.submeshes.length; ++j)
        {
            var submesh = obj.submeshes[j];

            gl.useProgram(submesh.shader_program.program);

            // Attributes
            gl.bindBuffer(gl.ARRAY_BUFFER, submesh.vertex_buffer);
            gl.vertexAttribPointer(submesh.shader_program.attributes.vertex_position,
                                   submesh.vertex_buffer.itemSize,
                                   gl.FLOAT, false, 0, 0);

            if ((submesh.normal_buffer !== null) && (submesh.shader_program.attributes.vertex_normal >= 0))
            {
                gl.bindBuffer(gl.ARRAY_BUFFER, submesh.normal_buffer);
                gl.vertexAttribPointer(submesh.shader_program.attributes.vertex_normal,
                                       submesh.normal_buffer.itemSize,
                                       gl.FLOAT, false, 0, 0);
            }

            if ((submesh.texture_coordinates_buffer !== null) && (submesh.shader_program.attributes.texture_coordinates >= 0))
            {
                gl.bindBuffer(gl.ARRAY_BUFFER, submesh.texture_coordinates_buffer);
                gl.vertexAttribPointer(submesh.shader_program.attributes.texture_coordinates,
                                       submesh.texture_coordinates_buffer.itemSize,
                                       gl.FLOAT, false, 0, 0);
            }

            if ((submesh.color_buffer !== null) && (submesh.shader_program.attributes.vertex_color >= 0))
            {
                gl.bindBuffer(gl.ARRAY_BUFFER, submesh.color_buffer);
                gl.vertexAttribPointer(submesh.shader_program.attributes.vertex_color,
                                       submesh.color_buffer.itemSize,
                                       gl.FLOAT, false, 0, 0);
            }

            // Uniforms - Transforms
            gl.uniformMatrix4fv(submesh.shader_program.uniforms.perspective_matrix, false, perspective_matrix);
            gl.uniformMatrix4fv(submesh.shader_program.uniforms.model_view_matrix, false, obj.transforms.transformMatrix());

            if (submesh.shader_program.uniforms.normals_matrix !== null)
            {
                var normals_matrix = mat3.create();
                mat3.fromMat4(normals_matrix, obj.transforms.matrix);

                gl.uniformMatrix3fv(submesh.shader_program.uniforms.normals_matrix, false, normals_matrix);
            }

            // Uniforms - Lighting
            if (submesh.shader_program.uniforms.ambient_light_color !== null)
            {
                gl.uniform3fv(submesh.shader_program.uniforms.ambient_light_color,
                              scene.ambient_light_color.data);
            }

            if (submesh.shader_program.uniforms.directional_light_direction !== null)
            {
                var adjusted_direction = null;

                if (scene.directional_light !== null)
                {
                    adjusted_direction = vec3.create();
                    vec3.normalize(adjusted_direction, scene.directional_light.direction);
                    vec3.scale(adjusted_direction, adjusted_direction, -1.0);
                }
                else
                {
                    adjusted_direction = vec3.clone([0.0, -1.0, 0.0]);
                }

                gl.uniform3fv(submesh.shader_program.uniforms.directional_light_direction,
                              adjusted_direction);
            }

            if (submesh.shader_program.uniforms.directional_light_color !== null)
            {
                var color = null

                if (scene.directional_light !== null)
                    color = scene.directional_light.color.data;
                else
                    color = vec3.clone([0.0, 0.0, 0.0]);

                gl.uniform3fv(submesh.shader_program.uniforms.directional_light_color, color);
            }

            var point_light = (scene.lights.length > 0 ? scene.lights[0] : null);

            if (point_light)
            {
                if (submesh.shader_program.uniforms.point_light_position !== null)
                {
                    gl.uniform3fv(submesh.shader_program.uniforms.point_light_position,
                                  point_light.transforms.position());
                }

                if (submesh.shader_program.uniforms.point_light_diffuse_color !== null)
                {
                    gl.uniform3fv(submesh.shader_program.uniforms.point_light_diffuse_color,
                                  point_light.diffuse_color.data);
                }

                if (submesh.shader_program.uniforms.point_light_specular_color !== null)
                {
                    gl.uniform3fv(submesh.shader_program.uniforms.point_light_specular_color,
                                  point_light.specular_color.data);
                }
            }
            else
            {
                if (submesh.shader_program.uniforms.point_light_position !== null)
                {
                    gl.uniform3fv(submesh.shader_program.uniforms.point_light_position,
                                  vec3.create());
                }

                if (submesh.shader_program.uniforms.point_light_diffuse_color !== null)
                {
                    gl.uniform3fv(submesh.shader_program.uniforms.point_light_diffuse_color,
                                  vec3.clone([0.0, 0.0, 0.0]));
                }

                if (submesh.shader_program.uniforms.point_light_specular_color !== null)
                {
                    gl.uniform3fv(submesh.shader_program.uniforms.point_light_specular_color,
                                  vec3.clone([0.0, 0.0, 0.0]));
                }
            }

            // Uniforms - Material
            if (submesh.shader_program.uniforms.ambient_color !== null)
            {
                gl.uniform4f(submesh.shader_program.uniforms.ambient_color, submesh.material.ambient_color.r,
                             submesh.material.ambient_color.g, submesh.material.ambient_color.b, 1.0);
            }

            if (submesh.shader_program.uniforms.diffuse_color !== null)
            {
                gl.uniform4f(submesh.shader_program.uniforms.diffuse_color, submesh.material.diffuse_color.r,
                             submesh.material.diffuse_color.g, submesh.material.diffuse_color.b, 1.0);
            }

            if (submesh.shader_program.uniforms.specular_color !== null)
            {
                gl.uniform4f(submesh.shader_program.uniforms.specular_color, submesh.material.specular_color.r,
                             submesh.material.specular_color.g, submesh.material.specular_color.b, 1.0);
            }

            if (submesh.shader_program.uniforms.specular_coefficient !== null)
                gl.uniform1f(submesh.shader_program.uniforms.specular_coefficient, submesh.material.specular_coefficient);

            if ((submesh.material.diffuse_texture !== null) && (submesh.shader_program.uniforms.diffuse_texture !== null))
            {
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, submesh.material.diffuse_texture);
                gl.uniform1i(submesh.shader_program.uniforms.diffuse_texture, 0);
            }

            // Indices
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, submesh.index_buffer);
            gl.drawElements(gl.TRIANGLES, submesh.index_buffer.numItems, gl.UNSIGNED_SHORT, 0);
        }
    }
}
