/* gl-lab.mesh.js

   Mesh-related classes
*/


// Declaration of our namespaces
if (gl_lab === undefined)
    var gl_lab = {};

if (gl_lab.mesh === undefined)
    gl_lab.mesh = {};


/************************************** CONSTANTS ***************************************/

gl_lab.mesh.constants = {
    MASK_TRIANGLE:           0x01,
    MASK_FACE_MATERIAL:      0x02,
    MASK_FACE_UV:            0x04,
    MASK_FACE_VERTEX_UV:     0x08,
    MASK_FACE_NORMAL:        0x10,
    MASK_FACE_VERTEX_NORMAL: 0x20,
    MASK_FACE_COLOR:         0x40,
    MASK_FACE_VERTEX_COLOR:  0x80,
};


/********************************** CLASS: MeshLoader ***********************************/

//----------------------------------------------------------------------------------------
// Constructor
//----------------------------------------------------------------------------------------
gl_lab.mesh.instanciate = function(gl, name, mesh)
{
    var submeshes_declaration = gl_lab.mesh._getSubmeshes(mesh.faces);
    var submeshes = [];

    for (var i = 0; i < submeshes_declaration.length; ++i)
    {
        // Parse the submesh declaration
        var declaration = submeshes_declaration[i];

        var size           = gl_lab.mesh._getFaceSize(declaration, 0);
        var mask           = declaration[0];
        var material_index = declaration[4];

        var indexes  = [];
        var vertices = [];
        var uvs      = (mask & gl_lab.mesh.constants.MASK_FACE_VERTEX_UV ? [] : null);
        var normals  = ((mask & gl_lab.mesh.constants.MASK_FACE_NORMAL) || (mask & gl_lab.mesh.constants.MASK_FACE_VERTEX_NORMAL) ? [] : null);
        var colors   = ((mask & gl_lab.mesh.constants.MASK_FACE_COLOR) || (mask & gl_lab.mesh.constants.MASK_FACE_VERTEX_COLOR) ? [] : null);

        var j = 0;
        while (j < declaration.length)
        {
            indexes.push(indexes.length, indexes.length + 1, indexes.length + 2);

            var index = declaration[j+1];
            vertices.push(mesh.vertices[index * 3], mesh.vertices[index * 3 + 1], mesh.vertices[index * 3 + 2]);

            index = declaration[j+2];
            vertices.push(mesh.vertices[index * 3], mesh.vertices[index * 3 + 1], mesh.vertices[index * 3 + 2]);

            index = declaration[j+3];
            vertices.push(mesh.vertices[index * 3], mesh.vertices[index * 3 + 1], mesh.vertices[index * 3 + 2]);

            j += 5;

            if (uvs !== null)
            {
                index = declaration[j];
                uvs.push(mesh.uvs[0][index * 2], mesh.uvs[0][index * 2 + 1]);

                index = declaration[j+1];
                uvs.push(mesh.uvs[0][index * 2], mesh.uvs[0][index * 2 + 1]);

                index = declaration[j+2];
                uvs.push(mesh.uvs[0][index * 2], mesh.uvs[0][index * 2 + 1]);

                j += 3;
            }

            if (normals !== null)
            {
                if (mask & gl_lab.mesh.constants.MASK_FACE_NORMAL)
                {
                    index = mesh.faces[j];
                    normals.push(mesh.normals[index * 3], mesh.normals[index * 3 + 1], mesh.normals[index * 3 + 2]);
                    normals.push(mesh.normals[index * 3], mesh.normals[index * 3 + 1], mesh.normals[index * 3 + 2]);
                    normals.push(mesh.normals[index * 3], mesh.normals[index * 3 + 1], mesh.normals[index * 3 + 2]);
                    ++j;
                }
                else
                {
                    index = mesh.faces[j];
                    normals.push(mesh.normals[index * 3], mesh.normals[index * 3 + 1], mesh.normals[index * 3 + 2]);

                    index = mesh.faces[j+1];
                    normals.push(mesh.normals[index * 3], mesh.normals[index * 3 + 1], mesh.normals[index * 3 + 2]);

                    index = mesh.faces[j+2];
                    normals.push(mesh.normals[index * 3], mesh.normals[index * 3 + 1], mesh.normals[index * 3 + 2]);

                    j += 3;
                }
            }

            if (colors !== null)
            {
                if (mask & gl_lab.mesh.constants.MASK_FACE_COLOR)
                {
                    index = mesh.faces[j];
                    var color = mesh.colors[index];

                    colors.push(((color & 0xFF0000) >> 16) / 255.0, ((color & 0xFF00) >> 8) / 255.0, (color & 0xFF) / 255.0);
                    colors.push(((color & 0xFF0000) >> 16) / 255.0, ((color & 0xFF00) >> 8) / 255.0, (color & 0xFF) / 255.0);
                    colors.push(((color & 0xFF0000) >> 16) / 255.0, ((color & 0xFF00) >> 8) / 255.0, (color & 0xFF) / 255.0);

                    ++j;
                }
                else
                {
                    index = mesh.faces[j];
                    var color = mesh.colors[index];
                    colors.push(((color & 0xFF0000) >> 16) / 255.0, ((color & 0xFF00) >> 8) / 255.0, (color & 0xFF) / 255.0);

                    index = mesh.faces[j+1];
                    color = mesh.colors[index];
                    colors.push(((color & 0xFF0000) >> 16) / 255.0, ((color & 0xFF00) >> 8) / 255.0, (color & 0xFF) / 255.0);

                    index = mesh.faces[j+2];
                    color = mesh.colors[index];
                    colors.push(((color & 0xFF0000) >> 16) / 255.0, ((color & 0xFF00) >> 8) / 255.0, (color & 0xFF) / 255.0);

                    j += 3;
                }
            }
        }


        // Create the submesh instance
        var submesh = new gl_lab.SubMesh();

        submesh.vertex_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, submesh.vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        submesh.vertex_buffer.itemSize = 3;
        submesh.vertex_buffer.numItems = vertices.length / 3;

        if (uvs)
        {
            submesh.texture_coordinates_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, submesh.texture_coordinates_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);
            submesh.texture_coordinates_buffer.itemSize = 2;
            submesh.texture_coordinates_buffer.numItems = uvs.length / 2;
        }

        if (normals)
        {
            submesh.normal_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, submesh.normal_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
            submesh.normal_buffer.itemSize = 3;
            submesh.normal_buffer.numItems = normals.length / 3;
        }

        if (colors)
        {
            submesh.color_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, submesh.color_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
            submesh.color_buffer.itemSize = 3;
            submesh.color_buffer.numItems = colors.length / 3;
        }

        submesh.index_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, submesh.index_buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexes), gl.STATIC_DRAW);
        submesh.index_buffer.itemSize = 1;
        submesh.index_buffer.numItems = indexes.length;


        // Parse the material declaration
        var material_declaration = mesh.materials[material_index];

        submesh.material.ambient_color  = new gl_lab.RGBColor(material_declaration.colorAmbient);
        submesh.material.diffuse_color  = new gl_lab.RGBColor(material_declaration.colorDiffuse);
        submesh.material.emissive_color = new gl_lab.RGBColor(material_declaration.colorEmissive);
        submesh.material.specular_color = new gl_lab.RGBColor(material_declaration.colorSpecular);

        if (material_declaration.mapDiffuse !== undefined)
            submesh.material.diffuse_texture = gl_lab.resources.get('data/textures/' + material_declaration.mapDiffuse);

        if (uvs === null)
            submesh.setShaderProgram(gl, 'no_texture__no_lighting.vs', 'no_texture__no_lighting.fs');
        else
            submesh.setShaderProgram(gl, 'textured__no_lighting.vs', 'textured__no_lighting.fs');

        submeshes.push(submesh);
    }

    return new gl_lab.Object(name, submeshes);
}


/********************************** CLASS: MeshLoader ***********************************/

//----------------------------------------------------------------------------------------
// Constructor
//----------------------------------------------------------------------------------------
gl_lab.mesh.VertexDeclaration = function()
{
    this.position = null;
    this.material = null;
    this.uv       = null;
    this.normal   = null;
    this.color    = null;
}



/********************************** UTILITY FUNCTIONS ***********************************/


gl_lab.mesh._getFaceSize = function(faces_declaration, start)
{
    var mask = faces_declaration[0];
    var size = 4;

    if (mask & gl_lab.mesh.constants.MASK_TRIANGLE)
    {
        alert('Unsupported: quad faces');
        return null;
    }

    if (mask & gl_lab.mesh.constants.MASK_FACE_MATERIAL)
        size += 1;

    if (mask & gl_lab.mesh.constants.MASK_FACE_UV)
    {
        alert('Unsupported: face UV');
        return null;
    }

    if (mask & gl_lab.mesh.constants.MASK_FACE_VERTEX_UV)
        size += 3;

    if (mask & gl_lab.mesh.constants.MASK_FACE_NORMAL)
        size += 1;

    if (mask & gl_lab.mesh.constants.MASK_FACE_VERTEX_NORMAL)
        size += 3;

    if (mask & gl_lab.mesh.constants.MASK_FACE_COLOR)
        size += 1;

    if (mask & gl_lab.mesh.constants.MASK_FACE_VERTEX_COLOR)
        size += 3;

    return size;
}


gl_lab.mesh._getSubmeshes = function(faces_declaration)
{
    var current = 0;
    var submeshes = [];

    while (current < faces_declaration.length)
    {
        var size = gl_lab.mesh._getFaceSize(faces_declaration, current);
        if (size === null)
            return null;

        var mask     = faces_declaration[current];
        var material = faces_declaration[current + 4];

        var next = current + size;
        while (next < faces_declaration.length)
        {
            if ((faces_declaration[next] != mask) || (faces_declaration[next + 4] != material))
            {
                submeshes.push(faces_declaration.slice(current, next));
                current = next;
                break;
            }

            next += size;
        }

        if ((next == faces_declaration.length) && (current != next))
        {
            submeshes.push(faces_declaration.slice(current, next));
            break;
        }
    }

    return submeshes;
}
