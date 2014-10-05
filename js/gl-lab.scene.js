/* gl-lab.scene.js

   Scene implementation
*/


// Declaration of our namespaces
if (gl_lab === undefined)
    var gl_lab = {};



/************************************ CLASS: Object *************************************/

//----------------------------------------------------------------------------------------
// Constructor
//----------------------------------------------------------------------------------------
gl_lab.Scene = function()
{
    this.objects = [];

    this.ambient_light_color = new gl_lab.RGBColor(0.5, 0.5, 0.5);
}
