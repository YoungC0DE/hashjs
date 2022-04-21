const a1 = document.getElementById("a1"),
    a2 = document.getElementById("a2"),
    a3 = document.getElementById("a3"),
    c1 = document.getElementById("c1"),
    c2 = document.getElementById("c2"),
    c3 = document.getElementById("c3"),
    b1 = document.getElementById("b1"),
    b2 = document.getElementById("b2"),
    b3 = document.getElementById("b3"),
    playerTime = document.getElementById("playerTime"),
    section = document.getElementById("blocks"),
    restart = document.getElementById("restart"),
    result = document.getElementById("result"),
    winnerX = document.getElementById("winnerX"),
    winnerO = document.getElementById("winnerO"),
    tie = document.getElementById("tie")


let checkedX = [], // recebe posições quando o jogador for X.
    checkedO = [], // recebe posições quando o jogador for O.
    player = true, // true == X, false == O.
    typeEvent = (screen.width < 600) ? "touchstart" : "click" // Verifica se é desktop ou Mobile.

// Array de arrays com todas as combinações.
const combinations = [
    // Horizontal
    ["a1", "a2", "a3"],
    ["b1", "b2", "b3"],
    ["c1", "c2", "c3"],

    // Vertical
    ["a1", "b1", "c1"],
    ["a2", "b2", "c2"],
    ["a3", "b3", "c3"],

    // Diagonal
    ["a1", "b2", "c3"],
    ["a3", "b2", "c1"]
]

// Função pra reiniciar o jogo.
restart.addEventListener("click", () => document.location.reload(true))

// Checar se o o player atual fez uma combinação de vitória ou empate.
const checkWinner = () => {
    // Quem fizer 3 ganha.
    let winX = 0,
        winO = 0

    // verificando se checkedX ou checkedO fez alguma combinação de 'combinations'
    for (let i = 0; i < combinations.length; i++) {
        if (combinations[i].every(itemX => checkedX.includes(itemX))) winX++
        if (combinations[i].every(itemO => checkedO.includes(itemO))) winO++
    }
    // Empate = 0, Vencedor X == 1, Vencedor O == 2.
    if (checkedX.length > 4 && winX < 1 && winO < 1) return 0
    if (winX == 1) return 1
    if (winO == 1) return 2

}

// Função que mostra layout na tela com resultado do jogo.
const endGame = n => {

    result.style.display = "flex"
    restart.style.display = "flex"

    if (n == 1) winnerX.style.display = "flex"
    if (n == 2) winnerO.style.display = "flex"

    // Mensagem de empate caso ninguém vença.
    if (n == 0) tie.style.display = "flex"

}

// Recebe o elemento(block) e seu nome(check).
function eventClick(block, check) {
    // Cada bloco tem o evento de click ou toque, de acordo com a largura da tela.
    block.addEventListener(typeEvent, () => {

        // True == pode adicionar X ou O no bloco.
        let validBlock = true

        // Verifica se a posição não está ocupada. Se estiver, o validBlock recebe false.
        checkedX.forEach(x => { if (x == check) validBlock = false })
        checkedO.forEach(o => { if (o == check) validBlock = false })

        // As marcações do bloco só vão ocorrer se o bloco clicado estiver livre.
        if (validBlock) {
            // As veriaveis Checked X e O recebem o campo respectivo que esta sendo ocupado.
            player ? checkedX.push(check) : checkedO.push(check)

            // Encerrando o jogo caso algum jogador tenha vencido. 
            if (checkWinner() == 1) endGame(1) // Vencedor = jogador X
            else if (checkWinner() == 2) endGame(2) // Vencedor = Jogador O
            else if (checkWinner() == 0) endGame(0) // Empate
            else    // Jogo continua quando não há vencedor nem empate nesta rodada.
            {
                // Quando clicado no block, ele define a imagem X ou O de acordo com o valor de player.
                block.style.backgroundImage = `url(${player ? "Images/X.png" : "Images/O.png"})`;

                // No desktop ele adiciona a imagem de X ou O no lugar do cursor, e se for mobile ele não faz nada.
                typeEvent == "click" ?
                    section.style.cursor = `url(${player ? "Images/O.png" : "Images/X.png"}) 50 50, pointer`
                    :
                    section.style.cursor = "default"

                // Mensagem abaixo do jogo que mostra quem irá jogar. A cada click altera o a vez do jogador pela imagem.
                playerTime.setAttribute('src', `${player ? "Images/O.png" : "Images/X.png"}`)

                // Ao final, ele muda o valor de player pra poder alterar a imagem nas validações acima.
                player = !player
            }
        }
    })
}

// Função de click chamada pra todos os elementos.
eventClick(a1, "a1")
eventClick(a2, "a2")
eventClick(a3, "a3")

eventClick(b1, "b1")
eventClick(b2, "b2")
eventClick(b3, "b3")

eventClick(c1, "c1")
eventClick(c2, "c2")
eventClick(c3, "c3")