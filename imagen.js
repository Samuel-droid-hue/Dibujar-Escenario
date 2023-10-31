var canvas = document.getElementById("tile");
var ctx = canvas.getContext('2d');   //pincel 

var canvas_escenario = document.getElementById("escenario");
var ctx_escenario = canvas_escenario.getContext('2d');   //pincel
var rejilla = document.getElementById("rejilla");
var textarea = document.getElementById("textarea");
var texto = document.getElementById("texto");

var img = new Image();
img.src = "tubup.png";
//Variables canvas
var xTile = 0;
var yTile = 0;
//Variables canvas_escenario
var xTile_escenario = 0;
var yTile_escenario = 0;

//Obtenemos los limites de los canvas
const rectTile = canvas.getBoundingClientRect();
const rectTile_escenario = canvas_escenario.getBoundingClientRect();


img.onload = function (){ //carga la imagen y despues ejecuta la funcion 
	draw()
	draw_escenario();
}

rejilla.addEventListener('change', manejadorRejilla);
//para agregar escuchadores, detecta eventos 
canvas.addEventListener('mousedown',manejadorRaton, false);
canvas_escenario.addEventListener('mousedown',manejadorRaton_escenario, false);
texto.addEventListener('change', leerTexto);

// j filas
// i col
var M = [];
for (j = 0; j < 20; j++ ){
	M[j] = new Array (40);
	for (i = 0; i < 40; i++)
		M[j][i] = -1;
}

function leerTexto(e){
	var archivo = e.target.files[0];
	if (!archivo){
		console.log("Error PA")
		return
	}
	let reader =  new FileReader(); //Variable del tipo file
	console.log("Aqui vamos")
	reader.onloadend = () => leerContenido(reader.result);// Llama una vez finalice el proceso del archivo
	reader.readAsText(archivo, "ISO-8859-1")
	//console.log(reader)
}

function leerContenido(contenido){
	console.log(contenido);
	let lineas = contenido.split(/ /);
	console.log(lineas);
	for(i=0 ; i < 800 ; i++){//Porque el escenario es de 40 col x 20 filas. Carga la matriz en M
		M[Math.floor(i/40)][i%40] = parseInt(lineas[i]); //Convierte a Entero
	}
	//console.log(M);
	draw_escenario();
}

function manejadorRejilla(){
	draw_escenario();
	console.log(rejilla.checked);
}
function manejadorRaton_escenario(e){
	var relativeX_escenario = e.clientX - rectTile_escenario.left;
	var relativeY_escenario = e.clientY - rectTile_escenario.top;
	xTile_escenario = Math.floor(relativeX_escenario/32);
	yTile_escenario = Math.floor(relativeY_escenario/32);

	M [yTile_escenario][xTile_escenario] = yTile*6 + xTile;
	draw_escenario();
	/*
	ctx.globalAlpha = 0.5;
	ctx.fillStyle="rgb(0,0,255)";
	ctx.fillRect(xTile_escenario*32,yTile_escenario*32,32,32); //Dibuja el rectangulo
	ctx.globalAlpha = 1;
	*/
}

function manejadorRaton(e){
	var relativeX = e.clientX - rectTile.left;
	var relativeY = e.clientY - rectTile.top;
	xTile=Math.floor(relativeX/32);
	yTile=Math.floor(relativeY/32);

	draw();
	//ctx.globalAlpha = 0.5;
	//ctx.fillStyle="rgb(0,0,255)";
	//ctx.fillRect(xTile*32,yTile*32,32,32); //Dibuja el rectangulo
	//ctx.globalAlpha = 1;
}

function draw()
{
	//Borra el canvas
	//ctx.fillStyle="rgb(255,255,255)";
	//ctx.fillRect(0,0,canvas.width,canvas.height); //Dibuja el rectangulo

	ctx.clearRect(0, 0, canvas.width, canvas.height); //Limpia escenario
	ctx.drawImage(img,0,0);
	ctx.strokeStyle = '#F00'
	//dibuja la reticula
	for(i=0; i<=6; i++){
		ctx.moveTo(i*32,0)
		ctx.lineTo(i*32,448)
		ctx.stroke()
	}

	for(i=0; i<=14; i++){
		ctx.moveTo(0, i*32)
		ctx.lineTo(448, i*32)
		ctx.stroke()
	}

	//Dibuja el cuadrito default
	ctx.globalAlpha = 0.5;
	ctx.fillStyle="rgb(0,0,255)";
	ctx.fillRect(xTile*32,yTile*32,32,32); //Dibuja el rectangulo
	ctx.globalAlpha = 1;

}

function draw_escenario()
{
	//DIBUJAMOS RECT (Limpiar pantalla)
	//ctx_escenario.fillStyle="rgb(255,255,255)";
	//ctx_escenario.fillRect(0,0,canvas_escenario.width,canvas_escenario.height); //Dibuja el rectangulo
	console.log("Dibujar escenario");
	ctx_escenario.clearRect(0, 0, canvas_escenario.width, canvas_escenario.height); //Limpia escenario
	ctx_escenario.strokeStyle = '#F00'

	if(rejilla.checked)
		Dibuja_rejilla();
	textarea.value = "";
	//Dibujamos la porcion de imagen
	for (j = 0; j < 20; j++ ){
		for (i = 0; i < 40; i++){
			if (M [j][i] != -1){
				console.log(M[j][i]); //(M[j][i]%6)*32 es la columna y  Math.floor(M[j][i]/6)*32 la fila
				ctx_escenario.drawImage(img, 
					(M[j][i]%6)*32, (Math.floor(M[j][i]/6))*32,
					32 , 32,
					i*32, j*32,
					32, 32);
				textarea.value += M[j][i] + " ";
			}else{
				textarea.value +="-1 ";
			}
		}
		console.log(textarea.value);
	}
	//Dibujar en el segundo canva el contenido de M, (corregir el identificador xTile)
}

function Dibuja_rejilla(){
	//PONEMOS LA RETICULA
	for(i=0; i<=40; i++){
		ctx_escenario.moveTo(i*32,0)
		ctx_escenario.lineTo(i*32,640)
		ctx_escenario.stroke()
	}

	for(i=0; i<=20; i++){
		ctx_escenario.moveTo(0, i*32)
		ctx_escenario.lineTo(1280, i*32)
		ctx_escenario.stroke()
	}
}