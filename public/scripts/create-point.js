function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        //Listando todos os estados
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    } )
}

populateUFs();


function getCities(event){
    const citySelect = document.querySelector("select[name=city]");
    const stateInput =  document.querySelector("input[name=state]");

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //Solucionando  bug
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true;

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        //listando todas as cidades após a listagem dos estaados
        for( const city of cities ){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false;
    } )

}

//Ouvidor de eventos (eventListener)
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);


//itens de coleta
//Pegando todos os li
const itemsToCollect = document.querySelectorAll(".items-grid li")

for( const item of itemsToCollect ){
    item.addEventListener("click", handleSelectedItem);
}


let selectedItems = []


function handleSelectedItem (event){
     const itemLi = event.target;
    
    //add or remove one class with javascript
   itemLi.classList.toggle("selected");
    

    //Pegando referência dos li:
    const itemId = itemLi.dataset.id;
    
    const collectedItems = document.querySelector("input[name=items]")
    
    //verificar se existem itens selecionados, se sim
    //pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item =>{
        const itemFound = item == itemId
        return itemFound
    } )

    //se já estiver selecionado
    if( alreadySelected >=0){
        //tirar da seleção
        const filteredItems = selectedItems.filter( item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        } )
        
        selectedItems = filteredItems
    }else{
        //se não  estiver selecionado 
        //adicionar à seleção
        selectedItems.push(itemId)
    }

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}

