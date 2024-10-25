import { useState } from 'react'
import './App.css'

function App() {
  const [contador, setCount] = useState(0)
  const [numeroAtual, setNumeroAtual] = useState(0);
  const [equacao, setEquacao] = useState("0");
  const [resultado, setResultado] = useState(null);

  const on = () => {
    let tela = document.getElementById('tela');
    let cor = window.getComputedStyle(tela).backgroundColor;
    let n = document.getElementById('cont');
    if(cor === 'rgb(20, 87, 20)') {
      tela.style.backgroundColor = '#1ead1e'
      n.style.display = 'flex'
      setEquacao("0")
    } else {
      tela.style.backgroundColor = '#145714'
      n.style.display = 'none'
      limpar();
    }
  }

  function descobrirNumero(event) {
    const botaoId = event.target.id;
    const numero = parseInt(botaoId.replace('botao', ''), 10);
    setNumeroAtual(numero);
    add(numero)
  }

  function add(numero) {
    setEquacao(prevEquacao => {
      if (prevEquacao === "0") {
        return numero.toString(); 
      } else {
        return prevEquacao + numero.toString();
      }
    });
  }

  const incrementar = () => {
    setCount(contador + numeroAtual)
    add("+")
  }

  const decrementar = () => {
    setCount(contador - numeroAtual)
    add("-")
  }

  const dividir = () => {
    setCount(contador / numeroAtual)
    add("/")
  }

  const multi = () => {
    setCount(contador * numeroAtual)
    add("*")
  }

  const par1 = () => {
    add("(")
  }

  const par2 = () => {
    add(")")
  }

  const raizQuadrada = () => {
    const result = Math.sqrt(numeroAtual);
    setResultado(result);
    setEquacao(result.toString());
  };

  const potencia = () => {
    setCount(contador ** numeroAtual);
    add("^");
  };

  const maiorque = () => {
    add(">")
  }

  const menorque = () => {
    add("<")
  }

  const maiorouigual = () => {
    add("≥")
  }

  const menorouigual = () => {
    add ("≤")
  }

  function limpar() {
    setCount(0)
    setEquacao("0")
    setResultado(null);
  }

  const calcularResultado = () => {
    const evalExpression = (expr) => {
      const values = [];
      const operators = [];
      let i = 0;

      while (i < expr.length) {
        if (typeof expr[i] === 'number') {
          values.push(expr[i]);
        } else if (expr[i] === '(') {
          operators.push(expr[i]);
        } else if (expr[i] === ')') {
          while (operators.length && operators[operators.length - 1] !== '(') {
            let b = values.pop();
            let a = values.pop();
            let op = operators.pop();
            values.push(applyOperation(op, a, b));
          }
          operators.pop(); // Remove '('
        } else {
          while (operators.length && precedence(operators[operators.length - 1]) >= precedence(expr[i])) {
            let b = values.pop();
            let a = values.pop();
            let op = operators.pop();
            values.push(applyOperation(op, a, b));
          }
          operators.push(expr[i]);
        }
        i++;
      }

      while (operators.length) {
        let b = values.pop();
        let a = values.pop();
        let op = operators.pop();
        values.push(applyOperation(op, a, b));
      }

      return values[0];
    };

    const applyOperation = (op, a, b) => {
      switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : alert("Divisão por zero!");
        case '^': return a ** b;
        default: return 0;
      }
    };

    const precedence = (op) => {
      if (op === '+' || op === '-') return 1;
      if (op === '*' || op === '/') return 2;
      if (op === '^') return 3;
      return 0;
    };

    const lista = equacao.split(/(\+|\-|\*|\/|\^|\(|\))/).map(item => {
      const num = parseFloat(item);
      return isNaN(num) ? item.trim() : num;
    }).filter(item => item); // Remove elementos vazios

    const total = evalExpression(lista);

    setResultado(total);
    setEquacao(total.toString());
  };

return (
    <>
      <div id="calculadora">
        <div id="tela"><h1 id='cont'>{equacao}</h1></div>
        <button id="sqrt" onClick={raizQuadrada}>
            &radic;
        </button>
        <button id="expoente" onClick={potencia}>
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
        <button id="mais" onClick={incrementar}>
            +
        </button>
        <button id="menos" onClick={decrementar}>
            -
        </button>
        <button id="divisao" onClick={dividir}>
            &divide;
        </button>
        <button id="multiplicação" onClick={multi}>
            &times;
        </button>
        <button id="igual" onClick={calcularResultado}>
            =
        </button>
        <button id="lower" onClick={menorque}>
            &lt;
        </button>
        <button id="greater" onClick={maiorque}>
            &gt;
        </button>
        <button id="lowere" onClick={menorouigual}>
            &le;
        </button>
        <button id="greatere" onClick={maiorouigual}>
            &ge;
        </button>
        <button id="parents1" onClick={par1}>
            (
        </button>
        <button id="parents2" onClick={par2}>
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
