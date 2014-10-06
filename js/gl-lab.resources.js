/* gl-lab.resources.js

   Resources-related functions
*/


// Declaration of our namespaces
if (gl_lab === undefined)
    var gl_lab = {};

if (gl_lab.resources === undefined)
    gl_lab.resources = {};


/*************************************** GLOBALS ****************************************/

gl_lab.resources.globals = {
    queued: 0,
    data:   {},
};


gl_lab.resources.callbacks = {
    all_resources_loaded: null,
};


//----------------------------------------------------------------------------------------
// Queue the loading of a resource
//----------------------------------------------------------------------------------------
gl_lab.resources._queue = function(url)
{
    gl_lab.resources.globals.queued++;
    gl_lab.resources.globals.data[url] = null;
}


//----------------------------------------------------------------------------------------
// Store a loaded resource
//----------------------------------------------------------------------------------------
gl_lab.resources._loaded = function(url, resource)
{
    gl_lab.resources.globals.queued--;
    gl_lab.resources.globals.data[url] = resource;

    if ((gl_lab.resources.globals.queued == 0) && gl_lab.resources.callbacks.all_resources_loaded)
    {
        gl_lab.resources.callbacks.all_resources_loaded();
        gl_lab.resources.callbacks.all_resources_loaded = null;
    }
}


//----------------------------------------------------------------------------------------
// Wait for the end of the loading of all the queued resources
//----------------------------------------------------------------------------------------
gl_lab.resources.wait = function(callback)
{
    if (gl_lab.resources.globals.queued == 0)
    {
        callback();
        return;
    }

    gl_lab.resources.callbacks.all_resources_loaded = callback;
}


//----------------------------------------------------------------------------------------
// Wait for the end of the loading of all the queued resources
//----------------------------------------------------------------------------------------
gl_lab.resources.get = function(url)
{
    return gl_lab.resources.globals.data[url];
}


//----------------------------------------------------------------------------------------
// Load a shader program
//----------------------------------------------------------------------------------------
gl_lab.resources.loadShader = function(gl, url)
{
    if (gl_lab.resources.globals.data[url] !== undefined)
        return;

    gl_lab.resources._queue(url);


    $.get(url, function(data) {
        var shader_type = null;

        if (url.endsWith('.fs'))
        {
            shader_type = gl.FRAGMENT_SHADER;
        }
        else if (url.endsWith('.vs'))
        {
            shader_type = gl.VERTEX_SHADER;
        }
        else
        {
            alert('Unknown shader type: ' + url);
            return;
        }

        var shader = gl.createShader(shader_type);
        gl.shaderSource(shader, data);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        {
            alert(gl.getShaderInfoLog(shader));
            return;
        }

        gl_lab.resources._loaded(url, shader);
    });
}


//----------------------------------------------------------------------------------------
// Load a texture
//----------------------------------------------------------------------------------------
gl_lab.resources.loadTexture = function(gl, url)
{
    if (gl_lab.resources.globals.data[url] !== undefined)
        return;

    gl_lab.resources._queue(url);


    var texture = gl.createTexture();
    texture.image = new Image();

    texture.image.onload = function() {
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);

        gl.bindTexture(gl.TEXTURE_2D, null);

        gl_lab.resources._loaded(url, texture);
    };

    texture.image.src = url;
}


//----------------------------------------------------------------------------------------
// Load a mesh
//----------------------------------------------------------------------------------------
gl_lab.resources.loadMesh = function(gl, url)
{
    if (gl_lab.resources.globals.data[url] !== undefined)
        return;

    gl_lab.resources._queue(url);


    $.get(url, function(data) {
        gl_lab.resources._loaded(url, data);
    });
}
