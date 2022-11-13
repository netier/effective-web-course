// other

let setError = ( message ) => 
    document.getElementById( 'timer__error' ).innerText = message

let changePageStyle = ( Inputs , boolean ) => 
{
    Object.values( Inputs ).forEach( e => 
    {
        e.style.color = boolean 
            ? "#FF403C" 
            : "#272727";
    } )
    document.body.style.backgroundColor = boolean 
        ? "#FF403C" 
        : "white"
}

// input

let getInputs = () =>
{
    return {
        minuts : document.getElementById('timer__minuts'),
        seconds : document.getElementById('timer__seconds')    
    }
}

let getInputTime = () => 
{
    let Inputs = getInputs()
    return {
        minuts : Number(Inputs.minuts.value),
        seconds : Number(Inputs.seconds.value)
    }
}

let toInputTime = (seconds) =>
{
    let m = Math.floor(seconds/60)
    let s = seconds%60
    return {
        minuts : m<=9?`0${m}`:m,
        seconds : s<=9?`0${s}`:s
    }
}

let setInputTime = ( input__time ) =>
{
    let Inputs = getInputs()
    Inputs.minuts.value = input__time.minuts
    Inputs.seconds.value = input__time.seconds
}

let changeInputsState = (boolean) =>
{
    let Inputs = getInputs()
    Object.values(Inputs).forEach((e) => { e.disabled = !boolean })
}


let toSeconds = ( inputTime ) =>
{
    return inputTime.minuts*60+inputTime.seconds
}

let InputChangeHandler = (object) => 
{
    object.value = object.value.slice( 0 , object.maxLength )

    // write to local storage entered time
    localStorage.entered_time = toSeconds( getInputTime() )
}

let InputBlurHandler = (object) =>
    object.value = object.value.length == 1 
        ? object.value = `0${object.value}`
        : !object.value.length
            ? object.value = `00`
            : object.value

let InputFocusHandler = (object) =>
    object.value = !Number(object.value)
        ? `` 
        : !Number(object.value[0]) 
            ? object.value[1] 
            : object.value

// timer

let timer;

let setTimer = (time,callback,end) =>
{
    let current__time = time
    callback( current__time-- )
    timer = setInterval( () => 
        {
            if( !current__time )
            {
                clearInterval( timer )
                end()
            }
            callback(current__time)
            current__time--
        } 
    , 1000 )
}

let clearTimer = ( timer ) => clearInterval( timer )

let timerStart = () =>
{
    localStorage.timer_status = 'start'

    let current__time = toSeconds( getInputTime() )
    
    if( current__time <= 0 )
    {
        setError(`Введённое время таймера некорректно`)
        return
    }

    let Inputs = getInputs()
    changeInputsState( false )
    changePageStyle( getInputs() , false )
    setError( '' )

    setTimer( current__time , 
        (time) => {
            setInputTime( toInputTime( time ) )

            // write to local storage current time
            localStorage.current__time = time
        } ,
        () => {
            changePageStyle( Inputs , true )
            localStorage.timer_status = 'pause'

            let sound = new Audio()
            sound.src = 'sounds/end.mp3'
            sound.autoplay = true;
        }
    )
}

let timerStop = () =>
{
    localStorage.timer_status = 'pause'

    clearTimer( timer )
    changeInputsState( true )
    changePageStyle( getInputs() , false )
}

let timerRestart = () => 
{
    localStorage.timer_status = 'stop'
    localStorage.current__time = localStorage.entered_time

    setInputTime( toInputTime( localStorage.entered_time ) )
    clearTimer( timer )
    changeInputsState( true )
    changePageStyle( getInputs() , false )
}

// change buttons

let changeTime = ( seconds ) => 
{
    localStorage.entered_time = localStorage.current__time = seconds
    setInputTime( toInputTime(seconds) )
    timerStop()
}

// load page

window.onload = () => 
{
    //check storage
    localStorage.current__time = !localStorage.current__time ? 0 : localStorage.current__time
    localStorage.entered_time = !localStorage.entered_time ? 0 : localStorage.entered_time
    
    if( localStorage.timer_status == 'pause' )
        setInputTime( toInputTime( localStorage.current__time ) )    

    if( localStorage.timer_status == 'start' )
    {
        setInputTime( toInputTime( localStorage.current__time ) ) 
        timerStart()
    }

    if( localStorage.timer_status == 'stop' )
        setInputTime( toInputTime( localStorage.entered_time ) )   
}