var canvas = document.getElementById("animacion");
var ctx = canvas.getContext('2d');   //pincel 

var img = new Image();
img.src = "estrellas.png";
//Calcula el centro del canvas (x, y)
var x = canvas.width/2;
var y = canvas.height/2;

var dx = 2;
var dy = 2;

var indice = 3;

var pelotaRadio = 20;

let M = 
	[
		[5, 5, 40, 38, 40, 38], //Coordenada inicial
		[44, 5, 40, 38, 40, 38],
		[80, 5, 33, 38, 33, 38],
		[5, 50, 40, 38, 40, 38],
		[34, 50, 40, 38, 40, 38],
		[73, 50, 40, 38, 40, 38]
	]

img.onload = function (){ //carga la imagen y despues ejecuta la funcion 
	setInterval(draw, 10);
}

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height); //Toma el color de fondo para limpiar
	dibujarBola();
	x += dx;
	if(x > canvas.width || x < 0)
		dx = -dx;
}

function dibujarBola(){
	//Dibuja la estrella con efecto
	ctx.drawImage(img, M[indice][0], M[indice][1], M[indice][2], M[indice][3], x, y, M[indice][4], M[indice][5]);
	indice = (indice+1) % 6;

}