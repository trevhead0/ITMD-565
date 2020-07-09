// JavaScript source code
// Da Dom offers you a favor you cant refuse
document.addEventListener('DOMContentLoaded', function () {
    console.log("Page loaded!");

    //SECTION 1
    document.getElementById('sec1-btn1').addEventListener('click', function () {

      sec1=document.getElementById('sec1-input').value;
      document.getElementById('sec1-input').value = "";
        alert(sec1);

    })

    //SECTION 2
    document.getElementById('sec2-btn1').addEventListener('click', function () {
        var container = document.getElementById('sec2-contentarea');
        container.firstElementChild.innerHTML = "Trevor";
        container2 = document.getElementById('sec2-box');
        container2.style.backgroundColor = "grey";
        container2.style.width = "100%";
        container2.style.height = "20px";
        c = container.children[2];
        c.style.fontSize = "12px";
        c.style.fontWeight = "bold";
        c.style.fontStyle = "italic";
        c = container.children[3];
        c.src = "./img/hamburger_color_icon.png"
        c.style.width="100px";
        c = container.children[5];
        c.setAttribute('href', "www.iit.edu");
        c.innerHTML = "Illinois Tech Website"
        c.style.color = "red";
        c.style.textDecoration = "underline";
    })

    //SECTION 3
    document.getElementById('sec3-btn1').addEventListener('click', function () {
        celcius = document.getElementById('sec3-input').value;
        if (Number(celcius) == celcius && celcius != "") {
            document.getElementById('sec3-input').value = "";
            p = document.createElement('p');
            p.innerHTML = celcius + " degress celsius is equal to " + (celcius * (9 / 5) + 32) + " degress fahrenheit";
            document.getElementById('sec3-contentarea').append(p);
        }
        else {
            alert("Please input number")
        }
    })
    document.getElementById('sec3-btn2').addEventListener('click', function () {
        document.getElementById('sec3-input').value = "";
        document.getElementById('sec3-contentarea').innerHTML = "";
    })

    //SECTION 4

    document.getElementById('sec4-btn2').addEventListener('click', function () {
        document.getElementById('sec4-contentarea').innerHTML = "";
    })
    document.getElementById('sec4-btn1').addEventListener('click', function () {

        boxes = document.getElementById('sec4-contentarea');
        num = document.getElementById('sec4-input1').value;
        count = document.getElementById('sec4-contentarea').childElementCount;

        if (Number(num) == num && num != "") {
            for (let i = 0; i < num; i++) {
                newBox(document.getElementById('sec4-select1').value);
            }
        }
        else {
            if (num == "")
                alert("No value was entered");
            else {
                alert("A non-numeric value was entered!");
            }
        }

        function newBox(myColor) {
            newDiv = document.createElement('div');
            newDiv.style.backgroundColor = myColor;
            newDiv.id = count + "box";
            newDiv.style.display = "inline-block";
            newDiv.style.margin = "5px";
            newDiv.style.height = "60px";
            newDiv.style.width = "60px";
            newDiv.classList.add('boxes');

            newDiv.onmouseover = function (e) { this.style.backgroundColor = "yellow" };
            newDiv.onmouseout = function () { this.style.backgroundColor = myColor };
            newDiv.addEventListener('click', function (e) {
                e.target.parentNode.removeChild(e.target);
            });
            count++;
            boxes.append(newDiv);
        }


        document.getElementById('sec4-input1').value="";
        document.getElementById('sec4-select1').selectedIndex=0;
    })


    //SECTION 5


    container = document.getElementById('sec5-contentarea');
    document.getElementById('sec5-input').addEventListener("keydown", function (e) {
        console.log(e.key);
        container.innerHTML = "";
        span = document.createElement('span');
        span.innerText = e.key;
        span.style.fontSize = "60px";
        container.append(span);
        document.getElementById('sec5-input').value = "";
    })
    document.getElementById('sec5-input').addEventListener("keyup", function (e) {

        document.getElementById('sec5-input').value = "";
    })


    //SECTION 6

    sec6 = document.getElementById('sec6-btn1');
    clear = document.getElementById('sec6-btn2');
    container6 = document.getElementById('sec6-contentarea');
    sec6.addEventListener('click', function () {
        sec6.disabled = true;
        var data = "";

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(JSON.parse(this.responseText));
                data = JSON.parse(this.responseText)

                ul = document.createElement('ul');
                for (var i = 0; i < data.length; i++) {
                    li = document.createElement('li');
                    li.innerText = data[i].name + "," + data[i].email + "";
                    ul.append(li);
                }
                container6.append(ul);

            }
        });

        xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

        xhr.send();

    })
    clear.addEventListener('click', function () {
        sec6.disabled = false;
        container6.innerHTML = "";
    })

    //SECTION 7
    var boxes = document.getElementsByClassName('box');
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('click', function () {
            b=this.id;
            a=b[1];
            console.log(a);
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                }});
            switch (a){
                case "0":console.log("red");break;
                case "1":console.log("yellow");break;
                case "2":console.log("blue");break;
                case "3":console.log("green");break;
            }
            xhr.open("GET", "10.0.0.75/redPress");
            xhr.send();
        });
    }


    sec7 = document.getElementById('sec7-btn1');
    clear = document.getElementById('sec7-btn2');
    container7 = document.getElementById('sec7-contentarea');
    sec7.addEventListener('click', function () {
        sec7.disabled = true;
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://jsonplaceholder.typicode.com/users", requestOptions)
            .then(response => response.json())
            .then(function (response) {
                data = response;
                ul = document.createElement('ul');
                for (var i = 0; i < data.length; i++) {
                    li = document.createElement('li');
                    li.innerText = data[i].name + "," + data[i].email + "";
                    ul.append(li);
                }
                container7.append(ul);

            })
    })
    clear.addEventListener('click', function () {
        sec7.disabled = false;
        container7.innerHTML = "";
    })

});
