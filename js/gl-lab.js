/* gl-lab.js

   Main gl-lab file
*/


// Declaration of our namespaces
if (gl_lab === undefined)
    var gl_lab = {};



//----------------------------------------------------------------------------------------
// Initialise a WebGL context on the canvas with the provided ID
//----------------------------------------------------------------------------------------
gl_lab.init = function(canvas_id)
{
    try
    {
        var canvas = document.getElementById(canvas_id);
        return canvas.getContext('webgl');
    }
    catch (e)
    {
        return null;
    }
}
