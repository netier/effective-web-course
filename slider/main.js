//variables
let auto_sl = false;
let timer_id;
// slide

let set_background = ( element ) => 
{
    let src = element.src
    let bg = document.getElementById('slider__background')

    bg.style.cssText = `background: url(${src}) no-repeat center;filter:blur(20px);display:block;`;
}

let change_image = ( orientation ) => 
{
    let items = document.getElementById( 'slider__items' ).childNodes
    items.forEach( (e) => e.style.display = 'none' )
    localStorage.state=(Number(localStorage.state)+orientation)%items.length
    localStorage.state=Number(localStorage.state)<0?items.length-1:localStorage.state
    items[localStorage.state].style.display = 'block'
    set_background( items[localStorage.state] )
}

document.addEventListener( 'keydown' , (e) => 
{
    let control = { 'ArrowRight':1 , 'ArrowLeft':-1 , 'Space':1 }
    if( control[e.code]!=undefined )
    {   
        e.preventDefault();
        if( !auto_sl )
            change_image( control[e.code] );
    }

} )

// auto slide

let auto_slide = ( attr ) => 
{
    document.getElementById('nav__right').style.display = attr ? 'none' : 'block';
    document.getElementById('nav__left').style.display = attr ? 'none' : 'block';

    if( attr )
        timer_id = setInterval(()=>{change_image(1)},3000);
    else
        clearInterval( timer_id );

    auto_sl = attr;
    document.getElementById( 'nav__auto' ).style.fill = attr ? 'white' : 'gray'
    document.getElementById( 'nav__auto' ).setAttribute( 'onclick' , `auto_slide(${!attr})` )
}

// start

window.onload = () => 
{
    if( localStorage.state == undefined )
        localStorage.setItem( 'state' , 0 );
    change_image( localStorage.state )
}