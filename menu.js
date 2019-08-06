$(function() {

  localStorage.removeItem('learnMenu');
  

  function checkMenuPulseState() {
    if(localStorage.getItem('learnMenu') == 'learned') {
      var $menuPulse = $('.menu-pulse');
      $menuPulse.addClass('is-learned');
    }
  }
  checkMenuPulseState();

  $("#menuBtn").click(function(e) {
    e.preventDefault();
    
    localStorage.setItem('learnMenu', 'learned');
    checkMenuPulseState();
    
    $(".menu-overlay").toggleClass("menu-open");
    $(".menu-toggle").toggleClass("menu-open");
  });
});