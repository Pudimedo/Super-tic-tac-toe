function create_elements_from_html(n, html){
    const template = document.createElement("template")
    let htmlaux = ``
    for (a = 0; a < n; a += 1){
        htmlaux += html
    }

    template.innerHTML = htmlaux
    return template.content;
}
//Essa função cria elementos em html "n" é o número de elementos "html" que você quer criar

let big_board = create_elements_from_html(1, `<div class="big_board"></div>`)

document.body.appendChild(big_board)

let small_board = create_elements_from_html(9, `<div class="small_board x"></div>`) //setando a classList como "x" pq o jogador começa com o x

document.body.querySelector(".big_board").appendChild(small_board)

let cell = create_elements_from_html(9, `
        <div class="cell" data-cell ></div>`)
document.querySelectorAll(".small_board").forEach((board) => board.appendChild(cell.cloneNode(true)))
//Criando todos as células, jogos da velha pequenos e o jogo da velha grande

const x_class = "x"
const o_class = "o"
//Classes para criar o hover e o before/after do x e o

const cell_elements = document.querySelectorAll("[data-cell]")
const small_board_elements = document.querySelectorAll(".small_board")
//elementos cell e small_board

let o_turn
//turno da bola (true ou false)

const winning_combination = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]
                            ]

cell_elements.forEach(cell => {
    cell.addEventListener("click", handle_click, {once: true})
    //criando um EventListener para detectar se o player clicou e executanto a função "handle_click", só é possivel fazer isso 1 vez para cada celula
})

function handle_click(e){
    const cell = e.target //pegando a celula onde o player clicou

    const current_class = o_turn ? o_class : x_class //colocando a classe (jogador) que está jogando ou seja ("x" ou "o")
    place_mark(cell, current_class) //criando uma classList para a celula que foi clicada com a current_class ("x" ou "o")

    swap_turns() //mudando de turno

    small_board_elements.forEach(board => {board.classList.remove(x_class), board.classList.remove(o_class), board.classList.add(o_turn ? o_class : x_class)}) //criando o hover

    if (checkwin(current_class)){
        console.log("gg")
    }
}

function place_mark(cell, current_class){
    cell.classList.add(current_class)
}

function swap_turns(){
    o_turn = !o_turn //muda o turno transfomando o_turn para false e vice versa
}

function checkwin(current_class){
    return winning_combination.some(combination => {
        return combination.every(index => {
            return cell_elements[index].classList.contains(current_class)
        })
    })
}