(function($, window) {

  $.notify = function(msg, type) {
    const DELAY_MS = 3000;
    const classMap = {
      error: 'danger',
      success: 'success',
      info: 'info',
      warning: 'warning',
    };

    if ($.isPlainObject(msg)) {
      msg = msg.message || msg.error || 'Unknown error';
    }

    const flash = $(`<div class="alert alert-${classMap[type] || 'info'} alert-dismissible" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      ${msg}
      </div>`);
    $.notify.wrapper.prepend(flash);
    setTimeout(() => flash.fadeOut(), DELAY_MS);
    return this;
  };

  $(function() {
    const wrapper = $.notify.wrapper = $('<div class="ai-notify-container"></div>');
    $('body').append(wrapper);
  });

}( jQuery, window ));

