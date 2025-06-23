function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}let emojisFrutas = ["🍎", "🍌", "🍇", "🍉", "🍊", "🍍", "🍓", "🥝"];

let cartas = [];

let cartasSelecionadas = [];

let acertos = 0;

let fase = 1;

let esperandoVirar = 0;

let tamanho = 90;

function setup() {

  createCanvas(700, 700);

  novaFase();

}

function draw() {

  background("#e0f7fa");

  

  for (let carta of cartas) {

    carta.desenhar();

  }

  if (acertos === cartas.length / 2) {

    textAlign(CENTER);

    textSize(30);

    fill("#004d40");

    text("Parabéns! Clique para avançar!", width / 2, height / 2);

    noLoop(); // pausa o jogo até clicar

  }

  if (esperandoVirar > 0) {

    esperandoVirar--;

    if (esperandoVirar === 0) {

      cartasSelecionadas[0].virada = false;

      cartasSelecionadas[1].virada = false;

      cartasSelecionadas = [];

    }

  }

}

function mousePressed() {

  if (acertos === cartas.length / 2) {

    fase++;

    novaFase();

    loop();

    return;

  }

  for (let carta of cartas) {

    if (carta.clique(mouseX, mouseY) && !carta.virada && cartasSelecionadas.length < 2) {

      carta.virada = true;

      cartasSelecionadas.push(carta);

      if (cartasSelecionadas.length === 2) {

        if (cartasSelecionadas[0].simbolo === cartasSelecionadas[1].simbolo) {

          acertos++;

          cartasSelecionadas = [];

        } else {

          esperandoVirar = 60; // tempo para esconder as cartas

        }

      }

    }

  }

}

function novaFase() {

  cartas = [];

  cartasSelecionadas = [];

  acertos = 0;

  let pares = fase + 2;

  let simbolos = shuffle(emojisFrutas).slice(0, pares);

  let listaCartas = shuffle([...simbolos, ...simbolos]);

  let colunas = ceil(sqrt(listaCartas.length));

  let linhas = ceil(listaCartas.length / colunas);

  let i = 0;

  for (let y = 0; y < linhas; y++) {

    for (let x = 0; x < colunas; x++) {

      if (i < listaCartas.length) {

        let posX = x * (tamanho + 15) + 50;

        let posY = y * (tamanho + 15) + 50;

        cartas.push(new Carta(posX, posY, listaCartas[i]));

        i++;

      }

    }

  }

}

class Carta {

  constructor(x, y, simbolo) {

    this.x = x;

    this.y = y;

    this.simbolo = simbolo;

    this.virada = false;

  }

  desenhar() {

    fill(this.virada ? "#ffffff" : "#80cbc4");

    stroke(0);

    strokeWeight(2);

    rect(this.x, this.y, tamanho, tamanho, 12);

    if (this.virada) {

      textSize(40);

      textAlign(CENTER, CENTER);

      fill("#004d40");

      text(this.simbolo, this.x + tamanho / 2, this.y + tamanho / 2);

    }

  }

  clique(mx, my) {

    return mx > this.x && mx < this.x + tamanho && my > this.y && my < this.y + tamanho;

  }

}