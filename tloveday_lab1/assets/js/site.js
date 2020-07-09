(function(){  // Browser sanity check:
  if (!('querySelector' in document && 'addEventListener' in document)) {
    // Old, old browser.
    console.log('Old browser, or you turned off js. Nooiiccce'); // not afraid to put it
    return;
  }
  // Da Dom offers you a favor you cant refuse
    document.addEventListener('DOMContentLoaded', function () {
        // Make this top of everything!
        var sto = window.localStorage;
        addEvents();

        // code for adding event listeners
        function addEvents() {
            document.querySelector("#calcBut").addEventListener('click', function () {
                //print
                console.log('Something Happened!');

                //Get numbers to calculate
                var sub = parseFloat(document.getElementById("subTotal").value);
                var rate = parseFloat(document.getElementById("taxRate").value);

                //Do Maths
                var salesT = (rate / 100) * sub;
                var totalC = salesT + sub;

                //Set Elements
                document.getElementById("salesTax").value = salesT.toFixed(2);
                var total = document.getElementById("total").value = totalC.toFixed(2);

            });

            // Add values to local storage
            document.querySelector("#clearBut").addEventListener('click', function () {
                console.log('Something Happened Again!');

            });

        };

});

  // code for seeing if local storage is accessable
  function storageAvailable(type) {
    var storage = window[type], x = '__storage_test__';
    try {
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch(e) {
      return false;
    }
  }
})();
