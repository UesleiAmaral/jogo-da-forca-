import { Boneco } from "./desenho.js";
import { db } from "./connection.js";
import { element } from "./elementos.js";

const palavras = await db();

export class Game {
  palavraSorteada;
  listaDeLetras = [];
  listaDeLetrasDigitadas=[];
  chances;
  erro_Length;
  vitoria;

  regex = new RegExp("^[A-Z]");

  constructor() {
    this.chances = 6;
    this.erro_Length = 2;
    this.vitoria = false;

    Boneco.desenha_Area_Forca();
    this.sorteiaPalavra();
    this.exibePalavra();
    this.recebeLetra();
  }

  sorteiaPalavra() {
    let pos = Math.round(Math.random() * palavras.length);
    this.palavraSorteada = palavras[pos].toUpperCase();

    if (this.palavraSorteada === undefined) {
      pos = Math.round(Math.random() * palavras.length);
      this.palavraSorteada = palavras[pos].toUpperCase();
    }
    return this.palavraSorteada;
  }

  exibePalavra() {
    element.palavraSecreta.innerHTML = "";

    for (let i = 0; i < this.palavraSorteada.length; i++) {
      if (this.listaDeLetras[i] === undefined) {
        this.listaDeLetras[i] = "&nbsp;";
        element.palavraSecreta.innerHTML =
          element.palavraSecreta.innerHTML +
          "<div class='Letra_secreta'>" +
          this.listaDeLetras[i] +
          "</div>";
      } else {
        element.palavraSecreta.innerHTML =
          element.palavraSecreta.innerHTML +
          "<div class='Letra_secreta'>" +
          this.listaDeLetras[i] +
          "</div>";
        
      }


    }

  }

  verificaLetra(value) {
    if (this.chances > 1) {
      if (value.length > 1) {
        this.erro_Length--;
        alert("DIGITE APENAS UMA LETRA, SE PERSISTIR SERÁ ERRO!");
        element.letraDigitada.value = "";

        if (this.erro_Length === 0) {
          this.chances--;
          this.compara_Desenho();
          element.exibeChances.innerHTML = "TENTATIVAS: " + this.chances;
          alert("ERRO CONTADO!");
        }
      } else if (
        this.palavraSorteada.indexOf(value, this.palavraSorteada) < 0
      ) {
        this.chances--;
        this.compara_Desenho();

        element.exibeChances.classList.add("perdeuChances");
        element.exibeChances.innerHTML = "TENTATIVAS: " + this.chances;
        console.log(this.listaDeLetrasDigitadas)
        
        this.listaDeLetrasDigitadas += "  " + value;
        element.exibeLetrasDigitadas.innerHTML = this.listaDeLetrasDigitadas;
        console.log(this.listaDeLetrasDigitadas)
      } else {
        for (let i = 0; i < this.palavraSorteada.length; i++) {
          if (
            this.palavraSorteada[i].indexOf(value, this.palavraSorteada[i]) ===
            0
          ) {
            this.listaDeLetras[i] = value;
          }

          let palavraConcatenada = "";
          this.listaDeLetras.forEach((element) => {
            palavraConcatenada += element;

            if (this.palavraSorteada == palavraConcatenada) {
              this.vitoria = true;
              return;
            }
          });
        }

        if (this.vitoria === true) {
          alert("PARABÉNS VOCÊ VENCEU!");
          element.letraDigitada.disabled = true;

          return;
        }
      }
    } else {
      this.chances = 0;

      element.exibeChances.innerHTML = "TENTATIVAS: " + this.chances;
      this.compara_Desenho();
      alert(`QUE PENA TENTE NOVAMENTE! A PALAVRA ERA: ${this.palavraSorteada}`);

      element.letraDigitada.disabled = true;
      return;
    }
  }

  recebeLetra() {
    element.letraDigitada.addEventListener("keyup", (event) => {
      let value = element.letraDigitada.value.toUpperCase();

      if (event.key === "Enter") {
        event.preventDefault();
        this.verificaLetra(value);

        if (this.regex.test(value) === true) {
          this.exibePalavra();
        } else {
          alert(
            "CARACTERES ESPECIAIS, LETRAS MINUSCULAS E NUMEROS NÃO SÃO PERIMITIDOS!"
          );
        }

        element.letraDigitada.value = "";
      }
    });
  }

  compara_Desenho() {
    if (this.chances == 5) {
      Boneco.desenha_Cabeca();
    } else if (this.chances == 4) {
      Boneco.desenha_Corpo();
    } else if (this.chances == 3) {
      Boneco.desenha_Braco_Direito();
    } else if (this.chances == 2) {
      Boneco.desenha_Braco_Esquerdo();
    } else if (this.chances == 1) {
      Boneco.desenha_Perna_Direita();
    } else if (this.chances == 0) {
      Boneco.desenha_Perna_Esquerda();
    } else {
      Boneco.desenha_Boneco_Completo();
    }
  }
}
