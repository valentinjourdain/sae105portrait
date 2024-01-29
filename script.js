document.addEventListener("DOMContentLoaded", () => { // attend que le DOM soit chargé pour exécuter le script
    const container = document.getElementById("analogies"); // déclaration de la variable container à laquelle on attribue l'id analogies
    const modal = document.getElementById("modalMentionLegale"); // déclaration de la variable modal à laquelle on attribue l'id modalMentionLegale
    const spanCloseModal = document.querySelector(".close"); // déclaration de la variable spanCloseModal à laquelle on attribue la classe close


    document.querySelectorAll('.modalButton, .fermeture').forEach(function (e) { // pour chaque élément ayant la classe modalButton ou fermeture
      e.addEventListener('click', function () { // on ajoute un événement au clic
        let mentionsModal = document.querySelector('.volet'); // déclaration de la variable mentionsModal à laquelle on attribue la classe volet
        mentionsModal.classList.toggle('volet-visible'); // on ajoute la classe volet-visible à la variable mentionsModal
      }); 
    })

    fetch('db.json').then(function (response) { // on récupère le fichier db.json
        response.json().then(function (data) { // on le transforme en objet JS
          function ajouteanal(item) { // on crée une fonction ajouteanal à laquelle on attribue la variable item
            item.forEach(function (item, i) { // pour chaque élément de la variable item
              const idSuivant = i < data.length - 1 ? data[i + 1].id : "formulaire"; // déclaration de la variable idSuivant à laquelle on attribue la valeur de l'id suivant
              var analogie = document.createElement("section"); // déclaration de la variable analogie à laquelle on attribue la création d'une section
              analogie.setAttribute("id", item.id); // on attribue à la variable analogie l'id de l'item
                analogie.innerHTML =
                '<article class="bloc">' + 
                '<h4>Si j\'étais ' + '<span class="extra">' +item.analogies + '</span>, je serais ' + '<span class="extra">' + item.valeurAnalogies + '</span> </h4>' +
                '<p>' + item.text + '</p>' +
                '</div>' +
                '<div class="creds"> <p>Crédits photographiques : ' + item.credits + '</p> </div>' +
                '</article>' +
                '<img src="'+ item.url +'" class="img">'; // création des blocs
              container.append(analogie); // ajoute la variable analogie à la variable container
            });
          }
          ajouteanal(data) // on appelle la fonction ajouteanal
        })
      })

      var envoyer = document.querySelector(".send"); // déclaration de la variable envoyer à laquelle on attribue la classe send
      envoyer.addEventListener("click", function () { // on ajoute un événement au clic
      var urlPG = // déclaration de la variable urlPG
        "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=valentin.jourdain&courriel=" +
        document.querySelector("input#mail").value +
        "&message=Si j'étais " +
        document.querySelector("input#analogie").value +
        ", je serais " +
        document.querySelector("input#valeurAnalogie").value +
        "parce que" +
        document.querySelector("textarea#pourquoi").value +
        "url de l'illustration: " +
        document.querySelector("input#lienimage").value; // on récupère les valeurs des inputs
      fetch(urlPG).then(function (response) { // on récupère l'url de l'API
        response.json().then(function (data) { // on le transforme en objet JS
          console.log("response: "); // on affiche dans la console
          console.log(data);
        });
      });
      
      var blocAna = document.querySelector('#analogies'); // déclaration de la variable blocAna à laquelle on attribue l'id analogies

      blocAna.innerHTML = blocAna.innerHTML + 
      '<section><article class="bloc"><div class="bloc"><div class="container-flex"><h4>Si j\'étais ' 
      + '<span class="extra">' 
      + document.querySelector("input#analogie").value +'</span>, je serais ' 
      + '<span class="extra">' 
      + document.querySelector("input#valeurAnalogie").value 
      + '</span> </h4>' 
      + '<p>' +document.querySelector("textarea#pourquoi").value 
      + '</p></article>' 
      + '<img src="' 
      + document.querySelector('input#lienimage').value +'" class="img"></img></section>'


});

});
