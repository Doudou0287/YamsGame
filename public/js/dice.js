function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more"; 
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less"; 
        moreText.style.display = "inline";
    }
  }

  function myFunction3() {
    var dots = document.getElementById("dots3");
    var moreText = document.getElementById("more3");
    var btnText = document.getElementById("myBtn3");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more"; 
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less"; 
        moreText.style.display = "inline";
    }
  }
  function myFunction2() {
    var dots = document.getElementById("dots2");
    var moreText = document.getElementById("more2");
    var btnText = document.getElementById("myBtn2");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more"; 
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less"; 
        moreText.style.display = "inline";
    }

  }

  function myFunction1() {
      var dots = document.getElementById("dots1");
      var moreText = document.getElementById("more1");
      var btnText = document.getElementById("myBtn1");

      if (dots.style.display === "none") {
          dots.style.display = "inline";
          btnText.innerHTML = "Read more";
          moreText.style.display = "none";
      } else {
          dots.style.display = "none";
          btnText.innerHTML = "Read less";
          moreText.style.display = "inline";
      }
  }


  var dice = document.getElementById('dice');
  var min = 1;
  var max = 24;
  dice.onclick = function()
  {
      var xRand = getRandom(max,min);
      var yRand = getRandom(max,min);
      dice.style.webkitTransform = 'rotateX('+xRand+'deg)rotateY('+yRand+'deg)';
      dice.style.transform = 'rotateX('+xRand+'deg) rotateY('+yRand+'deg)';
  }
  function getRandom(max,min)
  {
      return (Math.floor(Math.random() * (max-min)) + min) * 90
  }

