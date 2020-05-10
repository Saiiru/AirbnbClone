const apiUrl = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";

const cardsCounteudo = document.querySelector("#cards");

let data = [];

async function buscarCards() {
  let resposta = await fetch(apiUrl);

  const dataResposta = await resposta.json();

  return dataResposta;
}


function gerarCards(cards) {
  cardsCounteudo.innerHTML = "";
  cards.map(renderCard);
}


function renderCard(card) {
  var div = document.createElement("div");
  div.className = "item";

  var cartãoImagem = document.createElement("img");
  cartãoImagem.className = "card-image";
  cartãoImagem.src = card.photo;

  var tipoDePropiedade = document.createElement("p");
  tipoDePropiedade.className = "card-type";
  tipoDePropiedade.innerHTML = card.property_type;

  var segundo = document.createElement("p");
  segundo.innerHTML = `Valor por noite: <b class="card-price">R$${card.price},00</b>`;

  var primeiro = document.createElement("p");
  primeiro.innerHTML = card.name;



  div.appendChild(cartãoImagem);
  div.appendChild(tipoDePropiedade);
  div.appendChild(segundo);
  div.appendChild(primeiro);


  cardsCounteudo.appendChild(div);
}

async function main() {
  data = await buscarCards();

  if (data[0]) {
    gerarCards(data);
  }
}

main();

function handleSearch() {

  let valueInput = document.querySelector("#searchInput").value.toUpperCase();

  const filteredResults = data.filter((places) => {
    const placesToSearchByName = places.name.toUpperCase();
    if (placesToSearchByName.search(valueInput) > -1) {
      return places;
    }
  });
  gerarCards(filteredResults);
}
