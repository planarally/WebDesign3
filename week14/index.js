/**
 * Set some defaults for the project
 */

 var theme = {
    nineties: {
        foreground: ['111,213,248','251,198,27','244,95,99','94,38,220','77,227,130'],
        background: '255,255,255'
    },
    blues: {
        foreground: ['255,255,255'],
        background: '12,42,228'
    },
    bluesInverted: {
        foreground: ['12,42,228'],
        background: '255,255,255'
    },
    green: {
        foreground: ['255,255,255'],
        background: '111,248,140'
    },
    cowboy: {
        foreground: ['224,39,37','253,181,37','179,179,179'],
        background: '38,35,32'
    },
    aqua: {
        foreground: ['24,164,240','73,92,207','58,213,244','41,85,165','210,228,247'],
        background: '255,255,255' 
    }
};


var options = {
    colors: theme.nineties.foreground,
    background: theme.nineties.background,
    shape: ['square','circle','triangle'],
    minRadius: 5,
    maxRadius: 15,
    minSpeed: -0.75,
    maxSpeed: 0.75,
    minOpacity: 1,
    maxOpacity: 1,
    minStroke: 1,
    maxStroke: 1,
    minRotationSpeed: 0.005,
    maxRotationSpeed: 0.02,
    numOfElements: 50
}



/**
 * Create seeds for each element to be animated
 * Seed stores all the coordinates, size and speed data
 * Runs once, generates random values that can then be used
 * as a costant value or added to if needed/
 **/
function seedElements(){
    var elements = [];
    
    for(var i = 0; i < options.numOfElements; i++){
        // setup shape options and add to a new array
        var element = {
            x: pickRandBetween(0,canvas.width),
            y: pickRandBetween(0,canvas.height),
            radius: pickRandBetween(options.minRadius,options.maxRadius),
            color: pickRand(options.colors),
            opacity: pickRandBetween(options.minOpacity,options.maxOpacity),
            stroke: pickRandBetween(options.minStroke,options.maxStroke),
            shape: pickRand(options.shape),
            xSpeed: pickRandBetween(options.minSpeed,options.maxSpeed),
            ySpeed: pickRandBetween(options.minSpeed,options.maxSpeed),
            rotation: pickRandBetween(1,360),
            rotationSpeed: pickRandBetween(options.minRotationSpeed,options.maxRotationSpeed),
            rotationDirection: pickRand(['clockwise','anticlockwise']),
        };
        elements.push(element);
    }
    return elements;
}

function drawSquare(r){   
    ctx.strokeRect(-(r/2), -(r/2), r, r);
}

function drawCircle(r){
    ctx.beginPath();
    ctx.arc(0,0, r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.stroke();
}

function drawTriangle(r){
    ctx.beginPath();
    var a = ((Math.PI * 2) / 3);
    ctx.translate(0, 0);
    ctx.moveTo(r, 0);
    ctx.lineTo(r * Math.cos(a*1), r * Math.sin(a*1));
    ctx.lineTo(r * Math.cos(a*2), r * Math.sin(a*2));
    ctx.lineTo(r * Math.cos(a*3), r * Math.sin(a*3));
    ctx.closePath();
    ctx.stroke();
    ctx.setTransform(1, 0, 0, 1, 0, 0); // no idea!!!
}

/**
 * runs every frame so watch your ass with any heavy lifting!
 */
function drawElement(seed,i){   
    ctx.save();
    ctx.translate(seed.x - seed.radius/2, seed.y - seed.radius/2);
    //ctx.fillText(i,-4,5);
    ctx.rotate(seed.rotation);
    ctx.strokeStyle = 'rgba(' +seed.color + ',' + seed.opacity + ')';
    ctx.lineWidth = seed.stroke;
    if(seed.shape === 'square'){
        drawSquare(seed.radius);
    } else if(seed.shape === 'circle'){
        drawCircle(seed.radius);
    } else if(seed.shape === 'triangle'){
        drawTriangle(seed.radius);
    }
      
    ctx.translate( -(seed.x), -(seed.y));
    ctx.restore();
}

function offScreen(elem){  
    var xOffScreen = false;
    var yOffScreen = false;
    
    if(elem.x + (elem.radius/2) < 0 || elem.x + (elem.radius/2) > canvas.width){
        xOffScreen = true;
    }
       
    if(elem.y + (elem.radius/2) < 0 || elem.y + (elem.radius/2) > canvas.height){
        yOffScreen = true;
    }
    
    if(xOffScreen || yOffScreen){
       return true;
    }
}


function wraparound(x,y,r){
    var newX = x;
    var newY = y;
    
    if(x < -r){
        //x is off to the left
        newX = canvas.width + r;
    }
    
    if(x > canvas.width + r){
        //x is off to the right
        newX = -r;
    }
       
    if(y < -r){
        // y is off at the top
        newY = canvas.height + r;
    }
    
    if(y > canvas.height + r){
       newY = -r;
    }
    
    return {x:newX,y:newY};
}

/**
 * Pick a random element from an array
 */
function pickRand(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * pick a random number between two integers
 */
function pickRandBetween(min,max){
      return Math.random() * (max - min) + min;
}

function drawElements(seeds){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < seeds.length; i++){
        seeds[i].x = wraparound(seeds[i].x,seeds[i].y,seeds[i].radius).x;
        seeds[i].y = wraparound(seeds[i].x,seeds[i].y,seeds[i].radius).y;
        seeds[i].x += seeds[i].xSpeed;
        seeds[i].y += seeds[i].ySpeed;
        if (seeds[i].rotationDirection === 'clockwise'){
            seeds[i].rotation += seeds[i].rotationSpeed;
        } else {
            seeds[i].rotation -= seeds[i].rotationSpeed;
        }
        
        // pass the i as second arg is temporary
        drawElement(seeds[i],i);
    }
    //console.log(seeds);
}

/**
 * Animation loop 
 */
function animate(myseeds) {
    requestAnimationFrame(function(){
        animate(myseeds);
    });
    drawElements(myseeds);
}

(function(){
    var canvas = document.getElementById('canvas');
    canvas.style.backgroundColor = 'rgb(' + options.background + ')';
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var myseeds = seedElements();
    animate(myseeds);
    window.addEventListener('resize', function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    })  
})();	
