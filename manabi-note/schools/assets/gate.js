(function(){
  var DISABLE_GATE_FOR_LOCAL_PREVIEW = false;
  var PASS = "kotaro0918juntaro0805";
  var gate = document.getElementById('gate');
  var main = document.querySelector('main');
  var form = document.getElementById('gate-form');
  var input = document.getElementById('gate-pass');
  var err = document.getElementById('gate-err');

  function unlock(){
    gate.style.display = 'none';
    if(main) main.style.display = 'block';
  }

  if(DISABLE_GATE_FOR_LOCAL_PREVIEW){
    unlock();
  } else if(sessionStorage.getItem('manabi-note-auth') === '1'){
    unlock();
  } else if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(input.value === PASS){
        sessionStorage.setItem('manabi-note-auth', '1');
        unlock();
      } else {
        err.textContent = '合言葉が違います';
        input.value = '';
        input.focus();
      }
    });
  }
})();
