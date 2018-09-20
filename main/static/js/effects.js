var points = 25;
var length = 10;
var HEIGHT = 700;
var bounds = new Rectangle(0, 0, $(window).width(), HEIGHT)
//      var colors = ['#6A4A3C','#00A0B0','#CC333F','#EB6841','#EDC951']
var colors = ['#E8DDCB','#CDB380','#036564','#033649','#031634']
$('.change-background-color').css('background-color',colors[0])
var Boid = Base.extend({
    initialize: function(position){
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.path = new Path({
                strokeColor: this.color,
                strokeWidth: 25,
                strokeCap: 'round',
                opacity: 0.95,
        });
        if (position) {
            this.start = position;
        } else {
            this.start = Point.random() * view.size
        }
        this.vect = new Point(2,0)
        for (var i = 0; i < points; i++) {
            this.path.add(this.start + new Point(i * length, 0));
        }
    },
    update: function() {
        this.vect.angle += 20 - 40*Math.random()
        this.path.firstSegment.point += this.vect;
        if (this.path.firstSegment.point.x < 0 || this.path.firstSegment.point.x > $(window).width()) {
            this.vect.x = -this.vect.x
        }
        if (this.path.firstSegment.point.y < 0 || this.path.firstSegment.point.y > HEIGHT) {
            this.vect.y = -this.vect.y
        }
        for (var i = 0; i < points - 1; i++) {
            var segment = this.path.segments[i];
            var nextSegment = segment.next;
            var vector = segment.point - nextSegment.point;
            vector.length = length;
            nextSegment.point = segment.point - vector;
        }
        this.path.smooth();
    }
})

view.scale(1/view.pixelRatio, new Point(0,0))
view.viewSize = new Size($(window).width()/view.pixelRatio, HEIGHT/view.pixelRatio);
view.draw();

var boids = [];
var background = new Shape.Rectangle({
    rectangle: view.bounds,
    fillColor: "#111"
});

var raster, text;

var boidCount = HEIGHT / 20

for (var i=0; i<boidCount; i++) {
    boids.push(new Boid());
    if (i == Math.floor(boidCount / 2)) {
        raster = new Raster('logo');
        raster.width = $(window).width() * 0.80;
        raster.height = $(window).width() / 1450 * 0.80 * 600
        raster.position = new Point($(window).width()/2, HEIGHT/2 - raster.height * 0.1);
        raster.blendMode = "hard-light";
        raster.opacity = 0.95;
        console.log(raster);

        text = new PointText(new Point($(window).width()/2, HEIGHT/2 + raster.height/2));
        text.justification = 'center';
        text.fillColor = '#EEE';
        text.content = 'A Social and Creative Co-op';
        text.fontSize = "36px";
        text.fontFamily = "Open Sans";
        text.fontWeight = "700";
        text.blendMode = "hard-light";
        if ($(window).width() > 500) {
            text.scaling = $(window).width() * 0.0005;
        } else {
            text.scaling = $(window).width() * 0.001;
        }
    }
}
var glitching = false;
var log = true;
var timer;

function onFrame() {
    for (var i = 0; i < boids.length; i++) {
        boids[i].update()
    }
}

tool.onMouseDown = function(event) {
    console.log(event.point)
}

$("#page-top").show()

// function onResize(event) {
//     console.log($(window).width(), HEIGHT)
//     view.viewSize = new Size($(window).width()/view.pixelRatio, HEIGHT/view.pixelRatio);
//     view.draw();
// 
//     if (raster) {
//         raster.width = $(window).width() * 0.70;
//         raster.height = $(window).width() / 1450 * 0.70 * 600
//         raster.position = new Point($(window).width()/2, HEIGHT/2 - raster.height * 0.1);
//     }
//     
//     if (text) {
//         text.scaling = $(window).width() * 0.0005;
//     }
// }
