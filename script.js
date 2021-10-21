let lookupUrl= "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="

afficherDetail=(id)=>{
    window.location.href="./detail.html?id="+id
}

afficheResultat= (parent, url, titre)=>{
    fetch(url)
        .then((res)=>res.json())
        .then((cocktail)=>{
           creerListCocktail(parent, cocktail, titre);
        })
        .catch(()=>{
            let conteneur=document.createElement("div")
            let divTitre=document.createElement("div")
            divTitre.textContent=titre
            conteneur.className="conteneur"
            divTitre.className="titre"
            conteneur.appendChild(divTitre)
    let divcocktail=document.createElement("div")
        divcocktail.className="cocktail"
        divcocktail.innerText="not found";
        conteneur.appendChild(divcocktail)
        parent.appendChild(conteneur)
        });

}

creerListCocktail=(parent, cocktail, titre)=>{
    let conteneur=document.createElement("div")
    let divTitre=document.createElement("div")
    let list=document.createElement("div")
    list.className="resultat"
    divTitre.textContent=titre
    conteneur.className="conteneur"
    divTitre.className="titre"
        
    let {drinks} = cocktail;
    if(drinks){
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
} else{
    conteneur.appendChild(divTitre)
    let divcocktail=document.createElement("div")
        divcocktail.className="cocktail"
        divcocktail.innerText="not found";
        conteneur.appendChild(divcocktail)
        parent.appendChild(conteneur)
    
}  
}

recherche= (event) => { 
if(event.keyCode && event.keyCode===13 || !event.keyCode) {
    let el=document.getElementById('recherche');
    let divresultat =document.getElementById('resultat')
    divresultat.textContent=""
    let divLetter =document.getElementById('letter')
    divLetter.textContent='';
    afficheResultat(divresultat, "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+el.value, "cocktail whose name includes " + el.value)
    afficheResultat(divresultat, "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="+el.value, "cocktail which includes " + el.value)
    afficheResultat(divresultat, "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="+el.value, "cocktail in the category " + el.value) 
    afficheResultat(divresultat, "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a="+el.value, "Filter Alcoholic " + el.value)
    document.getElementById("onglet").style.display="flex";
    document.getElementById("recherche").blur()
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
        afficheResultat(divresultat, "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="+el.value, "cocktail which includes " + el.value)
    }
    }

rechercheParCate= (event) => { 
     if(event.keyCode && event.keyCode===13 || !event.keyCode) {
        let el=document.getElementById('recherche');
        let divresultat =document.getElementById('resultat')
        divresultat.textContent=""
        afficheResultat(divresultat, "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="+el.value, "cocktail in the category " + el.value)
    }
    }
        
rechercheParAlcoholic= (event) => { 
    if(event.keyCode && event.keyCode===13 || !event.keyCode) {
        let el=document.getElementById('recherche');
        let divresultat =document.getElementById('resultat')
        divresultat.textContent=""
        afficheResultat(divresultat, "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a="+el.value, "Filter Alcoholic " + el.value)
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

listAll=()=>{
    document.getElementById("onglet").style.display="none";
    list();
    let divresultat =document.getElementById('resultat')
        divresultat.textContent="";
        let promises =[];
    for(let l=65; l<=90 ;l++){
        let letter=String.fromCharCode(l)
        console.log(l, "=>", letter)
        let url="https://www.thecocktaildb.com/api/json/v1/1/search.php?f="+letter;
        let cocktailPromise = fetch(url)
        .then((res)=>res.json())
        promises.push(cocktailPromise);
        document.getElementById("recherche").value=""
    }

    Promise.all(promises)
    .then((tabResultat)=>{
        for(let l=65; l<=90 ;l++){
            let letter=String.fromCharCode(l);
            cocktailListLetter = tabResultat[l-65];
            creerListCocktail(divresultat, cocktailListLetter, letter);
        }
    })

}

list=()=>{
    let divresultat =document.getElementById('resultat')
    let divLetter =document.getElementById('letter')
    divLetter.textContent='';
    for(let p=65; p<=90; p++){
        let letter=String.fromCharCode(p)
        let buttonLetter=document.createElement('button');
        buttonLetter.textContent=letter;
        buttonLetter.className="noselect"
        let url="https://www.thecocktaildb.com/api/json/v1/1/search.php?f="+letter;
        buttonLetter.onclick=()=>{
            divresultat.textContent=""
            document.getElementById("recherche").value=""
            afficheResultat(divresultat, url, letter.toUpperCase());
        }
        divLetter.appendChild(buttonLetter)

       

    }
}
