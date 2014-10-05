/* gl-lab.transforms.js

   Transforms implementation
*/


// Declaration of our namespaces
if (gl_lab === undefined)
    var gl_lab = {};



/********************************** CLASS: Transforms ***********************************/

//----------------------------------------------------------------------------------------
// Constructor
//----------------------------------------------------------------------------------------
gl_lab.Transforms = function()
{
    this.matrix = mat4.create();
}


gl_lab.Transforms.prototype.setPosition = function(v)
{
    this.matrix[12] = v[0];
    this.matrix[13] = v[1];
    this.matrix[14] = v[2];
}


gl_lab.Transforms.prototype.translate = function(v)
{
    mat4.translate(this.matrix, this.matrix, v);
}


gl_lab.Transforms.prototype.rotate = function(deg, axis)
{
    mat4.rotate(this.matrix, this.matrix, degToRad(deg), axis);
}


gl_lab.Transforms.prototype.rotateX = function(deg)
{
    mat4.rotateX(this.matrix, this.matrix, degToRad(deg));
}


gl_lab.Transforms.prototype.rotateY = function(deg)
{
    mat4.rotateY(this.matrix, this.matrix, degToRad(deg));
}


gl_lab.Transforms.prototype.rotateZ = function(deg)
{
    mat4.rotateZ(this.matrix, this.matrix, degToRad(deg));
}
