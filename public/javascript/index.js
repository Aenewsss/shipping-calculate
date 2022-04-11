const items = [
    {
        id: 0,
        nome: 'camiseta',
        img: './media/camera-icon.png',
        quantidade: 0
    },
    {
        id: 1,
        nome: 'bermuda',
        img: './media/camera-icon.png',
        quantidade: 0
    },
    {
        id: 2,
        nome: 'sapato',
        img: './media/camera-icon.png',
        quantidade: 0
    }
]

function Main(){
    iniciarLoja()
    
    let links = document.getElementsByTagName('a')

    for(let i=0;i<links.length;i++){
        links[i].addEventListener("click", function(){
            let key = this.getAttribute('key')
            items[key].quantidade++
            atualizarCarrinho()  
        })
}


}

function iniciarLoja(){
    
    let containerProdutos = document.getElementById('produtos')
    items.map((item) => {
        containerProdutos.innerHTML += `<div class="produto"><img src="`+item.img+`"/><p>`+item.nome+ item`</p><a key="`+item.id+`"href="#">Adicionar ao carrinho</a></div>`
    })
}

function atualizarCarrinho(){
    var containerCarrinho = document.getElementById('carrinho')
    containerCarrinho.innerHTML = ""
    items.map((item) => {
        if(item.quantidade>0){
            containerCarrinho.innerHTML += `<p>`+item.nome+` | quantidade: `+item.quantidade+`</p><hr/>`
        }
    })
}

Main()


