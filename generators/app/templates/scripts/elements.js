<%= projectNameUpperCase %>.Elements = (function () {
  'use strict';

  function init() {
    <%= projectNameUpperCase %>.Elements.Template = document.getElementById('nice-app');
    <%= projectNameUpperCase %>.Elements.Loader = document.getElementById('showbox');
    
  }

  return {
    init: init
  };
}());