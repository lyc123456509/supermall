export const inputPhone = {
  mounted: function (el) {
    const input = el;
    input.addEventListener('input', (e) => {
      if (e.keyCode == 8) return;
      var value = input.value;
      value = value.replace(/\s*/g, '');
      var result = [];
      for (var i = 0; i < value.length; i++) {
        if (i == 3 || i == 7) {
          result.push(' ' + value.charAt(i));
        } else {
          result.push(value.charAt(i));
        }
      }
      input.value = result.join('');
    });
  },
};
