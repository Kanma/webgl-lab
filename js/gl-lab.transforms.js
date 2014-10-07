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
    this.matrix   = mat4.create();
    this.parent   = null;
    this.children = [];
}


//----------------------------------------------------------------------------------------
// Parent-child relationships
//----------------------------------------------------------------------------------------
gl_lab.Transforms.prototype.setParent = function(parent)
{
    if (this.parent)
    {
        var index = this.parent.children.indexOf(this);
        this.parent.children.splice(index, 1);
    }

    if (parent)
        parent.children.push(this);

    this.parent = parent;
}


gl_lab.Transforms.prototype.setLocalPosition = function(v)
{
    this.matrix[12] = v[0];
    this.matrix[13] = v[1];
    this.matrix[14] = v[2];
}


gl_lab.Transforms.prototype.localPosition = function()
{
    return vec3.clone([this.matrix[12], this.matrix[13], this.matrix[14]]);
}


gl_lab.Transforms.prototype.transformMatrix = function()
{
    if (this.parent)
    {
        var transformMatrix = mat4.create();
        return mat4.multiply(transformMatrix, this.parent.transformMatrix(), this.matrix);
    }
    else
    {
        return mat4.clone(this.matrix);
    }
}


gl_lab.Transforms.prototype.position = function()
{
    if (this.parent)
    {
        var position = vec3.create();
        vec3.transformMat4(position, this.localPosition(), this.parent.transformMatrix());
        return position;
    }
    else
    {
        return this.localPosition();
    }
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
