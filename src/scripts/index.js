console.log('<|^_^|>');
import $ from 'jquery'
import {menuToggle} from './menuToggle.js';

$(document).ready(function () {
    // prevent transition runing, IE fix - disable transition on preloading
    $("body").removeClass("preload");

    //if($('#navbar-toggle').length > 0){
    if($('#navbar-toggle').length > 0){
        menuToggle();
    }
});