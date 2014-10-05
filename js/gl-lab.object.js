/* gl-lab.object.js

   3D object implementation
*/


// Declaration of our namespaces
if (gl_lab === undefined)
    var gl_lab = {};


/************************************ CLASS: Object *************************************/

//----------------------------------------------------------------------------------------
// Constructor
//----------------------------------------------------------------------------------------
gl_lab.Object = function(name, submeshes)
{
    this.name       = name;
    this.transforms = new gl_lab.Transforms();
    this.submeshes  = submeshes;
}
