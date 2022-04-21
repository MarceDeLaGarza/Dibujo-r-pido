color=""; //Actividad Adicional

function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function clearCanvas() {
    background("white");
}

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
} 
function draw () {
    strokeWeight(13);  //grosor del lápiz
    stroke("blue"); //color del lápiz, si quieres que sea negro colocar 0
    if(mouseIsPressed) {  //dibuja una línea entre la posicición previa del mouse y la siguiente si está presionado
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}
function gotResult(error, results) {
    if(error){
        console.error(error);
    }
    console.log(results);
    document. getElementById('label').innerHTML = 'Etiqueta: ' + results[0].label;

    document.getElementById('confidence').innerHTML = 'Confianza: ' + Math.round(results[0].confidence * 100) + '%';

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}