//----------------------------------------------------------------------------------------
// Use the provided interpolated color as the fragment color
//----------------------------------------------------------------------------------------

precision mediump float;

varying vec4 processed_diffuse_color;


void main(void)
{
    gl_FragColor = processed_diffuse_color;
}
