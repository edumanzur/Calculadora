import { useState } from 'react'
import './App.css'

function App() {
  const on = () => {
    let tela = document.getElementById('tela');
    let cor = window.getComputedStyle(tela).backgroundColor;
    let n = document.getElementById('cont');
    if(cor === 'rgb(20, 87, 20)') {
      tela.style.backgroundColor = '#1ead1e'
      n.style.display = 'flex'
    } else {
      tela.style.backgroundColor = '#145714'
      n.style.display = 'none'
      limpar();
    }
  }
  const [contador, setCount] = useState(0)
  const [numeroAtual, setNumeroAtual] = useState(0);
  const [equacao, setEquacao] = useState("0");

  function descobrirNumero(event) {
    const botaoId = event.target.id;
    const numero = parseInt(botaoId.replace('botao', ''), 10);
    setNumeroAtual(numero);
    add(numero)
  }

  function add(numero) {
    setEquacao(prevEquacao => {
      if (prevEquacao === "0") {
        return numero.toString(); // Reseta a equação se for zero
      } else {
        return prevEquacao + numero.toString(); // Concatena o número à equação existente
      }
    });
  }

  const encrementar = () => {
    setCount(contador + numeroAtual)
    add("+")
  }

  const decrementar = () => {
    setCount(contador - numeroAtual)
  }

  function limpar() {
    setCount(0)
    setEquacao("0")
  }
return (
    <>
      <div id="calculadora">
        <div id="tela"><h1 id='cont'>{equacao}</h1></div>
        <button id="sqrt">
            &radic;
        </button>
        <button id="expoente">
            ^
        </button>
        <button id="botao0" onClick={descobrirNumero}>
            0
        </button>
        <button id="botao1" onClick={descobrirNumero}>
            1
        </button>
        <button id="botao2" onClick={descobrirNumero}>
            2
        </button>
        <button id="botao3" onClick={descobrirNumero}>
            3
        </button>
        <button id="botao4" onClick={descobrirNumero}>
            4
        </button>
        <button id="botao5" onClick={descobrirNumero}>
            5
        </button>
        <button id="botao6" onClick={descobrirNumero}>
            6
        </button>
        <button id="botao7" onClick={descobrirNumero}>
            7
        </button>
        <button id="botao8" onClick={descobrirNumero}>
            8
        </button>
        <button id="botao9" onClick={descobrirNumero}>
            9
        </button>
        <button id="mais" onClick={encrementar}>
            +
        </button>
        <button id="menos" onClick={decrementar}>
            -
        </button>
        <button id="divisao">
            &divide;
        </button>
        <button id="multiplicação">
            &times;
        </button>
        <button id="igual">
            =
        </button>
        <button id="lower">
            &lt;
        </button>
        <button id="greater">
            &gt;
        </button>
        <button id="lowere">
            &le;
        </button>
        <button id="greatere">
            &ge;
        </button>
        <button id="parents1">
            (
        </button>
        <button id="parents2">
            )
        </button>
        <button id="buttonON" onClick={on}>
            ON
        </button>
        <button id="buttomCLEAR" onClick={limpar}>
            CLEAR
        </button>
    </div>

    </>
  )
}

export default App
