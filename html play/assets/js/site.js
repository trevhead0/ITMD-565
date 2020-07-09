(function(){  // Browser sanity check:
  if (!('querySelector' in document && 'addEventListener' in document)) {
    // Old, old browser.
    console.log('Old browser, or you turned off js. Noice'); // not afraid to put it
    return;
  }
  // Da Dom offers you a favor you cant refuse
  document.addEventListener('DOMContentLoaded', function(){
    // Make this top of everything!
    var sto = window.localStorage;
    var items =['Mozzarella Sticks', 'Spinach Dip', 'Shrimp Cocktail', 'Crab Ragoon', 'Lemon Chicken', 'Spicy Beef', 'Roasted Duck', 'Eggplant Parmesan', 'Italian Beef', 'Fettuccini Alfredo', 'Baked Mostaccioli', 'Spaghetti and Meatballs', 'Greek Salad', 'Ceaser Salad', 'House Salad', 'Baked Potato', 'Mashed Potato', 'Cannoli Bundle', 'Cheese Cake'];
    var item={};
    var list = document.getElementsByClassName("food-item");
    var i;
    for (i=0; i<list.length; i++){
      item[list[i].lastElementChild.innerText] = list[i].firstElementChild.value;
    }

      //if allows local storage begins seting up older menu and such!
      if (storageAvailable('localStorage')) {
        //seperates each of the pages
          //-------------------------MENU LOCAL STORAGE-------------------------- page!!!!!!
      if (document.querySelector('#menupage') !==null){
        addPrevious();
        addEvents();
      }

          //--------------------------CHECKOUT PAGE-------------------------- page!!!!!!
      if (document.querySelector('#checkoutpage') !==null){
        document.querySelector('#review').classList.toggle('nv');
        console.log("your in checkout now");
        addReview();
        document.querySelector('#checkbox').addEventListener('click', function(){
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0');
          var yyyy = today.getFullYear();

          today = yyyy+'-'+mm +'-'+ dd;
          document.querySelector('#date').value=today;

        });
        document.querySelector('#checkouts').addEventListener('click', function (){
          var del={};
          var cc={};
          var deltop, delinfo;
          var deliveryinfo = document.getElementsByClassName('deliveryobj');
          var ccinfo=document.getElementsByClassName('ccobj');

          for (i=0; i<deliveryinfo.length; i++){
            deltop = deliveryinfo[i].firstElementChild.innerText;
            delinfo = deliveryinfo[i].lastElementChild.value;
            del[deltop]=delinfo;
          }
          cc.Name=ccinfo[0].firstElementChild.innerText;
          cc.Card=ccinfo[1].lastElementChild.value;
          sto.setItem('deliveryobj', JSON.stringify(del));
          sto.setItem('ccobj', JSON.stringify(cc));
        });
      }

         //--------------------------CONFIRM PAGE-------------------------- page!!!!!!
      if (document.querySelector('#confirmpage') !==null){
        console.log("your in confirmation now");
        addOrder();
        addDelivery();
        addCard();
        sto.clear();
      }
    }

    // code for adding previous data.....
      function addPrevious() {
        //Grabs items
      var item=sto.getItem('items');
      // eslint doesnt like.  I like, grabs undefined as well.(i know i could write a second && not undefined.Same goes for line 102 and 181)
      if(item != null){
        item=JSON.parse(item);
        for(i=0; i<list.length; i++){
          list[i].firstElementChild.value=item[list[i].lastElementChild.innerText];
        }
      }
    }

    // code for adding event listeners
      function addEvents() {

          //CLEAR  button
      document.querySelector("#mclear").addEventListener('click', function(){
        sto.setItem(items, null);
        for(i=0; i<list.length; i++){
          list[i].firstElementChild.value="";
        }
      });

      // Add values to local storage
      document.querySelector("#checkouts").addEventListener('click', function(){
        for (i=0; i<list.length; i++){
          item[list[i].lastElementChild.innerText] = list[i].firstElementChild.value;
        }
        sto.setItem("items", JSON.stringify(item));
      });

      for(i=0; i<list.length; i++){
        list[i].addEventListener('change', function(e){
          item[e.target.parentNode.lastElementChild.innerText] = e.target.parentNode.firstElementChild.value;
        });
      }
    }

    // code for Adding review Section
    function addReview(){
      var li, pa, inum, ides, modifybut, deletebut, confirmbut, input;
      item=JSON.parse(sto.getItem('items'));
      for (i=0; i<items.length; i++){
        if (item[items[i]] != null && item[items[i]] !== ""){
          // declare the items elements
          li= document.createElement('li');
          pa= document.createElement('p');
          inum= document.createElement('i');
          ides= document.createElement('i');
          modifybut= document.createElement('a');
          deletebut= document.createElement('a');
          confirmbut= document.createElement('a');
          input= document.createElement('input');
          // Define item and quantity
          li.classList.add('review-item');
          li.id= items[i];
          input.classList.add("nv");
          inum.innerText=item[items[i]];
          ides.innerText=" x "+items[i];
          pa.append(inum);
          pa.append(input);
          pa.append(ides);

          // Define buttons
          modifybut.id= 'but'+(i+1)+'-1';
          modifybut.innerText = "Modify";
          modifybut.href='#';
          modifybut.classList.add('but');
          deletebut.id= 'but'+(i+1)+'-2';
          deletebut.href='#';
          deletebut.innerText = "Delete";
          deletebut.classList.add('but');
          confirmbut.id= 'but'+(i+1)+'-3';
          confirmbut.href='#';
          confirmbut.classList.add('nv');
          confirmbut.classList.add('but');
          confirmbut.innerText = "Confirm";
          confirmbut.classList.add('nv');

          // Add elements to list
          li.append(pa);
          li.append(modifybut);
          li.append(deletebut);
          li.append(confirmbut);
          document.querySelector('#review').append(li);


          // add event listeners
          document.querySelector('#'+modifybut.id).addEventListener('click', function(e){
            var tarpar= e.target.parentNode;
            tarpar.firstChild.firstChild.classList.toggle('nv');
            tarpar.firstChild.childNodes[1].classList.toggle('nv');
            tarpar.childNodes[1].classList.toggle('nv');
            tarpar.childNodes[2].classList.toggle('nv');
            tarpar.childNodes[3].classList.toggle('nv');
          });
          document.querySelector('#'+deletebut.id).addEventListener('click', function(e){
            var tarpar= e.target.parentNode;
            // delete entire parent
            tarpar.remove();
            item[tarpar.id]=null;
          });
          document.querySelector('#'+confirmbut.id).addEventListener('click', function(e){
            var tarpar= e.target.parentNode;
            var newval=tarpar.firstChild.childNodes[1].value;
            item[tarpar.id]=newval;
            tarpar.firstChild.firstChild.classList.toggle('nv');
            tarpar.firstChild.childNodes[1].classList.toggle('nv');
            tarpar.firstChild.firstChild.innerText=newval;
            tarpar.childNodes[1].classList.toggle('nv');
            tarpar.childNodes[2].classList.toggle('nv');
            tarpar.childNodes[3].classList.toggle('nv');
          });
        }
      }
    }

    // code for confirm page
    function addOrder(){
      var li, pa, inum, ides;
      item=JSON.parse(sto.getItem('items'));
      for (i=0; i<items.length; i++){
        if (item[items[i]] != null && item[items[i]] !== ""){
          // declare the items elements
          li= document.createElement('li');
          pa= document.createElement('p');
          inum= document.createElement('i');
          ides= document.createElement('i');
          // Define item and quantity
          li.classList.add('review-item');
          li.id= items[i];
          inum.innerText=item[items[i]];
          ides.innerText=" x "+items[i];
          pa.append(inum);
          pa.append(ides);

          // Add elements to list
          li.append(pa);
          document.querySelector('#review-list').append(li);
        }
      }
    }

    function addDelivery(){
      var li, pa, inum, ides;
      var del={};
      var delnames;
      del=JSON.parse(sto.getItem('deliveryobj'));
      delnames = Object.getOwnPropertyNames(del);
      for (i=0; i<delnames.length; i++){
        // declare the items elements
        li= document.createElement('li');
        pa= document.createElement('p');
        inum= document.createElement('i');
        ides= document.createElement('i');
        // Define item and quantity
        li.classList.add('delivery-item');
        li.id= delnames[i];
        inum.innerText=del[delnames[i]];
        ides.innerText=delnames[i]+" = ";
        pa.append(ides);
        pa.append(inum);
        // Add elements to list
        li.append(pa);
        document.querySelector('#delivery').append(li);
      }
    }

    function addCard(){
      var li, pa, inum, ides, lastfour;
      var cc={};
      var ccnames;
      cc=JSON.parse(sto.getItem('ccobj'));
      ccnames = Object.getOwnPropertyNames(cc);

      for (i=0; i<ccnames.length; i++){
        // declare the items elements
        li= document.createElement('li');
        pa= document.createElement('p');
        inum= document.createElement('i');
        ides= document.createElement('i');
        // Define item and quantity
        li.classList.add('card-item');
        li.id= ccnames[i];
        if(i===1){
          lastfour = cc[ccnames[i]].substring(12, 17);
          inum.innerText="****-****-****-"+lastfour;
        }
        else{
          inum.innerText=cc[ccnames[i]];
        }
        ides.innerText=ccnames[i]+" = ";
        pa.append(ides);
        pa.append(inum);
        // Add elements to list
        li.append(pa);
        document.querySelector('#cc').append(li);
      }
    }

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
