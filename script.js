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

let small_board = create_elements_from_html(9, `<div class="small_board x"></div>`)

document.body.querySelector(".big_board").appendChild(small_board)

let cell = create_elements_from_html(9, `
        <div class="cell" data-cell ></div>`)
document.querySelectorAll(".small_board").forEach((board) => board.appendChild(cell.cloneNode(true)))
//Criando todos as células, jogos da velha pequenos e o jogo da velha grande

const x_class = "x"
const o_class = "o"
const cell_elements = document.querySelectorAll("[data-cell]")
const board_elements = document.querySelectorAll(".small_board")
let o_turn


cell_elements.forEach(cell => {
    cell.addEventListener("click", handle_click, {once: true})
})

function handle_click(e){
    const cell = e.target
    const current_class = o_turn ? o_class : x_class
    place_mark(cell, current_class)
    swap_turns()
    board_elements.forEach(board => {board.classList.remove(x_class), board.classList.remove(o_class), board.classList.add(o_turn ? o_class : x_class)})
}
function place_mark(cell, current_class){
    cell.classList.add(current_class)
}

function swap_turns(){
    o_turn = !o_turn
}