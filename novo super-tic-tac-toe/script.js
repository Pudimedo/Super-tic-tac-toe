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

let small_board = create_elements_from_html(9, `<div class="small_board" data-cell></div>`)

document.body.querySelector(".big_board").appendChild(small_board)