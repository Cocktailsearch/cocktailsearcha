let lookupUrl= "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="

afficherDetail=(id)=>{
    window.location.href="./detail.html?id="+id
}

afficheResultat= (parent, url, titre)=>{
    fetch(url)
        .then((res)=>res.json())
        .then((cocktail)=>{
            let conteneur=document.createElement("div")
            let divTitre=document.createElement("div")
            let list=document.createElement("div")
            list.className="resultat"
            divTitre.textContent=titre
            conteneur.className="conteneur"
            divTitre.className="titre"
                
            let {drinks} = cocktail;
            drinks.forEach(element => {
                let divcocktail=document.createElement("div")
                divcocktail.className="cocktail"
                divcocktail.innerText=element.strDrink;

                let img=document.createElement("img")
                img.className="cocktail-tmb"
                img.src=element.strDrinkThumb
                img.addEventListener("click", ()=>{
                    afficherDetail(element.idDrink);
                })
                divcocktail.appendChild(img)
            
                list.appendChild(divcocktail)
                
            });
            conteneur.appendChild(divTitre)
            conteneur.appendChild(list)
            parent.appendChild(conteneur)
        })
        .catch(()=>{

        });

}

recherche= (event) => { 
if(event.keyCode && event.keyCode===13 || !event.keyCode) {
    let el=document.getElementById('recherche');
    let divresultat =document.getElementById('resultat')
    divresultat.textContent=""
    afficheResultat(divresultat, "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+el.value, "cocktail whose name includes " + el.value)
    afficheResultat(divresultat, "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="+el.value, "cocktail which includes " + el.value)
    afficheResultat(divresultat, "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="+el.value, "cocktail in the category " + el.value)      
    document.getElementById("onglet").style.display="flex";
}
}

rechercheParNom= (event) => { 
    if(event.keyCode && event.keyCode===13 || !event.keyCode) {
        let el=document.getElementById('recherche');
        let divresultat =document.getElementById('resultat')
        divresultat.textContent=""
        afficheResultat(divresultat, "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+el.value, "cocktail whose name includes " + el.value)
    }
    }

    rechercheParIng1= (event) => { 
        if(event.keyCode && event.keyCode===13 || !event.keyCode) {
            let el=document.getElementById('recherche');
            let divresultat =document.getElementById('resultat')
            divresultat.textContent=""
            afficheResultat(divresultat, "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="+el.value, "cocktail whose name includes " + el.value)
        }
        }

        rechercheParCate= (event) => { 
            if(event.keyCode && event.keyCode===13 || !event.keyCode) {
                let el=document.getElementById('recherche');
                let divresultat =document.getElementById('resultat')
                divresultat.textContent=""
                afficheResultat(divresultat, "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="+el.value, "cocktail whose name includes " + el.value)
            }
            }

        

loadcocktail=()=>{
    let id=window.location.search.replace("?id=","")
    fetch(lookupUrl+id)
    .then((res)=>res.json())
    .then((element)=>{
    let cocktail=element.drinks[0]
    let divrecette=document.getElementById("recette")

    //ajout de l'image
    let img=document.createElement("img")
    img.className="cocktail-img"
    img.src=cocktail.strDrinkThumb
    divrecette.appendChild(img)

    //ajout du nom
    let nom=document.createElement("h1")
    nom.className="cocktailTitle"
    nom.textContent=cocktail.strDrink
    divrecette.appendChild(nom)
    
    //ajout des ingrdient
    let ings=document.createElement("ul")
    let ingsDiv=document.createElement("div")
    ingsDiv.className="cocktail-ings"
    for(let i=1; i<=15 ;i++){
        adding(ings, cocktail, i);
    }
    ingsDiv.appendChild(ings)
    divrecette.appendChild(ingsDiv)
    
    //ajout de la recette
    let instruction=document.createElement("div")
    instruction.className="cocktail-recette"
    instruction.textContent=cocktail.strInstructions
    divrecette.appendChild(instruction)


    })

}

adding=(divrecette, cocktail, num)=>{
    if(cocktail['strIngredient'+num]){
        let ing=document.createElement("li")
        ing.className="cocktail"
        let measure = cocktail['strMeasure'+num] || "";
        divrecette.appendChild(ing)
        ing.textContent=cocktail['strIngredient'+num]+" "+measure
    }
}