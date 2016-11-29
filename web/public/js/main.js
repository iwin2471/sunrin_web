var img = new Image();
img.src = './image/sa.png';



var quen = {
   data: [],
   head: 0,
   tail: 0,
   size: 7,
   in : function(rect) {

       if ((this.tail + 1) % this.size == this.head) {
           this.data[this.head] = null;
           this.head = (this.head + 1) % this.size;
       }
       this.data[this.tail] = rect;
       this.tail = (this.tail + 1) % this.size;
   },
   out: function() {
       if (this.head == this.tail) {
           return;
       } else {
           var result = this.data[this.head];
           this.data[this.head] = null;
           this.head = (this.head + 1) % this.size;
           return result;

       }

   },
   len: function() {
       if (this.head > this.tail) {
           return this.size - (this.head - this.tail);
       } else {
           return (this.tail - this.head);
       }
   }
};

var ball = {
   x: 300,
   y: 390,
   radius: 20,
   mx: 10,
   my: -8,
   up: true,
   draw: function() {
       ctx.drawImage(img, this.x, this.y, 50, 50)

       ctx.fillStyle = ctx.createPattern(wall, 'repeat');;
   }
};

var wall = new Image();
wall.src = './image/wall.jpg';

var jumping = false;
var raf = true;

var distance = 0;
var randomDistance = 600;
var tempRandomDistance = 0;
var clock = 0;
var speed = 6;
var score = 0;

function roll() {
   ctx.clearRect(0, 150, 1600, 290);

   if (quen.len() > 0) {
       for (var i = 0; i < quen.len(); i++) {

           var subscript = (quen.head + i) % 7;
           var rectItem = quen.data[subscript];
           if (rectItem.distance >= rectItem.len) {
               quen.out();
           } else {
               ctx.save();
               rectItem.distance += speed;

               var rect_left_x = 1600 - rectItem.distance - rectItem.width;
               var rect_top_y = 440 - rectItem.height;
               var rect_right_x = 1600 - rectItem.distance ;

               if( rect_left_x < ball.x + ball.radius && rect_left_x > ball.x - ball.radius){
                   if(ball.y < rect_top_y && Math.sqrt((ball.x - rect_left_x)*(ball.x - rect_left_x) + (ball.y - rect_top_y)*(ball.y - rect_top_y) >= ball.radius)){

                   }else{
                       raf = false;

                   }
               }


               if( rect_right_x < ball.x + ball.radius && rect_right_x > ball.x - ball.radius){
                   if(ball.y < rect_top_y && Math.sqrt((ball.x - rect_right_x)*(ball.x - rect_right_x) + (ball.y - rect_top_y)*(ball.y - rect_top_y) ) >= ball.radius ){
                   score++; document.getElementById("score").innerHTML = "Score = " + Math.floor(score/6);
                   }
                   else{
                       raf = false;

                   }
               }


               ctx.translate(-rectItem.distance, 0);
               ctx.fillRect(1600 - rectItem.width, 440 - rectItem.height,
                   rectItem.width, rectItem.height);
               ctx.restore();
           }
       }
   } else {
       var height = Math.floor(20 + Math.random() * 150);
       var width = Math.floor(20 + Math.random() * 30);
       var rect = {
           height: height,
           width: width,
           distance: 0,
           len: 1600
       };
       quen.in(rect);
   }


   if (jumping) {
       ctx.save();
       ball.y += ball.my;
       ball.draw();


       if (ball.y <= 200) {
           ball.up = false;
           ball.my = 2;
       } else if (ball.y <= 220) {
           ball.my = ball.up ? -2 : 2;
       } else {
           ball.my = ball.up ? (-1) * Math.sqrt(330 - 1.5 * (390- ball.y)) : Math.sqrt(330 - 1.5 * (390 - ball.y));
       }

       if (ball.y >= 390) {
           ball.my = -18;
           ball.y = 390;
           ball.up = true;
           jumping = false;
       }
       ctx.restore();
   } else {
       ball.draw();
   }


   tempRandomDistance += speed;
   if (tempRandomDistance >= randomDistance) {
       var height = Math.floor(20 + Math.random() * 150);
       var width = Math.floor(20 + Math.random() * 40);
       randomDistance = Math.floor(Math.random() * 350 + 200);
       var rect = {
           height: height,
           width: width,
           distance: 0,
           len: 1600 + randomDistance * 2
       };
       quen.in(rect);
       tempRandomDistance = 0;
   }
   if(raf)
       window.requestAnimationFrame(roll);
}


function draw() {
   window.canvas = document.getElementById("canvas");
   window.ctx = canvas.getContext('2d');
   canvas.width  = window.innerWidth;
   canvas.height = window.innerHeight;

   ctx.scale(1, 1);
   ctx.fillRect(0, 440, 1600, 200);
   ball.draw();

   window.requestAnimationFrame(roll);

   canvas.addEventListener('click', function() {
       jumping = true;
   });
}
