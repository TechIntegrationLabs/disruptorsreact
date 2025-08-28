$(document).ready(function() {
  $('.accordion-content').hide(); // Hides all accordion contents initially
  $('.accordion-title .toggle-sign').addClass('plus'); // Sets all toggle signs to '+'

  $('.accordion-title').click(function() {
    var $content = $(this).next('.accordion-content');
    var $sign = $(this).find('.toggle-sign');

    $content.slideToggle(function() {
      $sign.toggleClass('plus minus');
    });
  });
});