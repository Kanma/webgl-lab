/* gl-lab.camera.js

   Camera implementation
*/


// Declaration of our namespaces
if (gl_lab === undefined)
    var gl_lab = {};



/************************************ CLASS: Object *************************************/

//----------------------------------------------------------------------------------------
// Constructor
//----------------------------------------------------------------------------------------
gl_lab.Camera = function(left, top, width, height)
{
    this.transforms = new gl_lab.Transforms();

    this.near = 0.1;
    this.far  = 100;
    this.fovy = 45.0;

    this.viewport = {
        left:   left,
        top:    top,
        width:  width,
        height: height,
    };
}
