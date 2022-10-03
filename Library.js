(function( globalVariable ) {

    // Public Property because created on the global variable
    globalVariable.greeting = "Hello";

    // Private Property (scoped to stay inside the IIFE)
    let defaultName= "Anonym";

    // Public Method  because attached on the global variable
    globalVariable.hello = function( to ) {
        helloWorld(to);
    };

    // Private Method
    function helloWorld( to ) {
        if (to===undefined ){
          to = defaultName;
        }
       console.log( `${globalVariable.greeting} ${to.trim()} !`);
    }
})( window.libraryName = window.libraryName || {} );