// MOBILE: mostrar menu
var menu = document.querySelector(".js-nav");
function showMenu(){
    // mostrar menu
    menu.style.display = "block";

    // ao clicar ícone x, desaparecer menu
    menu.children[0].children[0].addEventListener("click", function(){
        menu.style.display = "none";
    });
}

// próxima imagem
var img = document.querySelector(".js-product__img-img"); // foto do produto
var click = 1; // contador começa em 1
function nextImg(){ // próxima imagem
    let icons = document.querySelector(".js-product__img-icons"); // ícones de voltar e próxima

    if (click >= 1 && click < 4){ // contador vai de 1 até 3
        click++; // incrementa
        img.src = `images/image-product-${click}.jpg`; // muda a imagem
    }

    icons.children[0].onclick = function(){ // imagem anterior
        if (click > 1){ // se for maior que 1
            click--; // decrementa
            img.src = `images/image-product-${click}.jpg`; // muda a imagem
        }
    }
}

// DESKTOP IMG
//// LIGHTBOX
var ltbx = document.querySelector(".js-lightbox");
var ltbxImgKit = document.querySelector(".js-lightbox__img__kit-main");
var ltbxClose = document.querySelector(".js-lightbox__img__svg");

// lightbox aparece
img.onclick = function(){
    if (screen.width >= 746){ // aparecer lightbox apenas em Desktop
        ltbx.style.display = "flex";
    }
}
// ao clicar no ícone x, lightbox desaparece
ltbxClose.onclick = function(){
    ltbx.style.display = "none";
}


// ao clicar na img, muda a imagem principal do Lightbox
function changeLtbx(element){
    let currentImg = element.src;
    ltbxImgKit.src = currentImg; // mudei src da img principal
}


// anterior/próxima imagem lightbox
var ltbxClick = 1; // contador de cliques do ícone

function ltbxNext(){ // próxima imagem
    if (ltbxClick < 4){
        ltbxClick++;
        ltbxImgKit.src = `images/image-product-${ltbxClick}.jpg`; // muda imagem
    }

    let ltbxIcons = document.querySelector(".js-lightbox__img__kit-icons");
    let ltbxPrevious = ltbxIcons.children[0]; // ícone previous

    // imagem anterior
    ltbxPrevious.onclick = function(){
        if (ltbxClick > 1){
            ltbxClick--;
            ltbxImgKit.src = `images/image-product-${ltbxClick}.jpg`; // muda imagem
        }
    }
}

//// PÁGINA DESKTOP
// mudar imagem principal da página
function changeImg(element){
    let currentImg = element.src;
    img.src = currentImg; // muda img
}
//

// quantidade de itens
var amountItem = document.querySelector(".js-product__info-amount-n");
var numberCart = document.querySelector(".js-box-right__cart-number");
var amountItemPerma; // variável para salvar na memória do navegador a quantidade de itens escolhidas pelo usuário
var itemsCart; // itens dentro do carrinho começa em zero

amountItemPerma = JSON.parse(localStorage.getItem("amountItem")); // acessando quantidade de itens salva e tornando-a definitiva
if (amountItemPerma === null){ // primeira vez que acessa o site
    amountItemPerma = 0;
}
amountItem.innerText = amountItemPerma; // mostrando na tela quantidade de itens definitiva

function test(){
    // pegar itens salvos do carrinho
    itemsCart = JSON.parse(localStorage.getItem("itemsCart"));
    if (itemsCart === null){ // primeiro acesso começa como null
        itemsCart = 0;
        localStorage.setItem("itemsCart", itemsCart);
    }
}
test();
if (itemsCart !== 0){
    numberCart.innerText = itemsCart; // último número escolhido pelo usuário vai se tornar ícone acima do cart
    numberCart.style.display = "block"; // mostrar ícone acima do cart
}

// mudar a cor do carrinho
var iconCart = document.querySelector(".js-box-right__cart__path"); // ícone do carrinho
if (itemsCart !== 0){
    iconCart.style.fill = "#69707D"; // se carrinho estiver cheio muda para cor cinza
}
else{
    iconCart.style.fill = "#000000"; // se carrinho estiver vazio muda para cor preto
}
//

// aumentar quantidade de itens
function increaseAmount(){ // serve para exibir quantidade de itens temporária
    if (amountItemPerma <= 8){ // contador soma até 9
        amountItemPerma += 1; // contador incrementa a cada clique
        amountItem.innerText = amountItemPerma; // atualizando quantidade de itens

        localStorage.setItem("amountItem", amountItemPerma); // salvando a nova quantidade
    }
}

// diminuir quantidade de itens
function decreaseAmount(){
    if (amountItemPerma > 0){ // se a quantidade de itens for maior que 0
        amountItemPerma -= 1; // contador decrementa até 0 a cada clique
        amountItem.innerText = amountItemPerma; // atualizando quantidade de itens

        localStorage.setItem("amountItem", amountItemPerma); // salvando a nova quantidade
    }
}

// função para adicionar item no carrinho
function addCart(){
    itemsCart = amountItemPerma; // itens do carrinho recebe a quantidade escolhida pelo usuário, se o amountItemPerma atualizar, atualiza também itemsCart na memória
    numberCart.innerText = itemsCart; // atualiza ícone do número de itens dentro do cart
    if (itemsCart == 0){ // se número de ítens dentro do carrinho for 0
        cartEmpty(); // função de carrrinho vazio
    }
    if (itemsCart !== 0){ // somente executar função de carrinho cheio se 'itemsCart' for diferente de 0
        cartFilled(); // função carrinho cheio
    }
    localStorage.setItem("itemsCart", itemsCart); // salva a nova quantidade de itens dentro do cart
}

var cart = document.querySelector(".js-product__cart");
function cartEmpty(){ // função para carrinho vazio
    numberCart.style.display = "none"; // esconde ícone acima do carrinho
    iconCart.style.fill = "#000000"; // se carrinho estiver vazio muda para cor preto
    cart.children[2].innerHTML = "<ul class='js-product__cart-info__items' style='align-items: center; justify-content: center; padding: 0; height: 100%;'></ul>"; //limpa conteúdo, cria ul
    cart.children[2].children[0].innerHTML = "<li class='js-empty'>Your cart is empty.</li>"; // criar elemento dentro da ul para informar que está vazio

    cart.children[3].style.display = "none"; // botão desaparece
}

function cartFilled(){ // função para carrinho cheio
    iconCart.style.fill = "#69707D"; // se carrinho estiver cheio muda para cor cinza
    numberCart.style.display = "block"; // mostrar ícone acima do cart

    // criar elemento imagem do produto
    cart.children[2].innerHTML = "<img class='js-product-img' alt='' src='images/image-product-1-thumbnail.jpg'>";

    cart.children[2].innerHTML += "<ul class='js-product__cart-info__items'></ul>"; // limpar conteúdo, criar ul
    // criar elementos dentro da ul que representam o produto
    cart.children[2].children[1].innerHTML = "<li class='js-filled'>Fall Limited Edition Sneakers</li>";
    cart.children[2].children[1].innerHTML += `<li class='js-filled'>$125.00 x ${itemsCart} <strong style='color: black'>$${125.00 * itemsCart}</strong></li>`;

    // criar elemento imagem para remover produto
    cart.children[2].innerHTML += "<img class='js-delete' alt='' src='images/icon-delete.svg'>";

    cart.children[3].style.display = "block"; // botão aparecer

    // deletar o produto
    let delet = document.querySelector(".js-delete");
    delet.onclick = function(){
        localStorage.setItem("itemsCart", 0); // zerar itens dentro do carrinho
        cartEmpty();
    }
}

var clickCart = 0; // contador de cliques do Cart
// mostrar carrinho
function showCart(){
    // itemsCart = JSON.parse(localStorage.getItem("itemsCart")); // atualizar quantidade de itens
    test();

    clickCart++; // adiciona mais um no contador de cliques do Cart
    cart.style.display = "block"; // irá abrir o cart

    // se o carrinho estiver vazio, mostrar mensagem
    if (itemsCart === 0){
        cartEmpty();
    }
    // se o carrinho tiver cheio mostrar itens
    if(itemsCart !== 0){
        cartFilled();
    }

    function hideCart(){ // esconder Cart
        cart.style.display = "none";
    }
    if (clickCart % 2 == 0){ // se o contador for divisível por 2 executar função
        hideCart(); // esconder Cart
    }
}