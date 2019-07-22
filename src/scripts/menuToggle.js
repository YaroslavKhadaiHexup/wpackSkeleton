function menuToggle() {
    document.querySelector("#navbar-toggle").addEventListener("click", function(){
        document.querySelector("body").classList.toggle('open-menu');
    });
    //require CSS logic
}
export {menuToggle};