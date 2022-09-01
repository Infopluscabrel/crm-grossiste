//fonction pour ajouter une ligne de commande et commande

const path = "http://localhost:5000";


$('#SaveLigneCommande').livequery('submit',   function(e){ e.preventDefault() ; 
   

  return false;

});


$('#entree').livequery('change',   function(e){ 
 id = $('#entree').val(); 
  console.log(id);
  
$.get("http://localhost:5000/article/profile/"+id, function(puerto){
  
  $("#prix_unitaire").val(puerto.data[0].prix) ;
}, 'json');

return false;

});

$('#quantity').livequery('change',   function(e){ 
  id = $('#entree').val(); 
   console.log(id);
  qte = document.getElementById("quantity").value;
  console.log(qte);
 
 $.get("http://localhost:5000/article/profile/"+id, function(puerto){
   
   $("#prix_total").val(puerto.data[0].prix * qte ) ;
   }, 'json');
 return false;
 
 });
let commande = [];
let panier = [];
let i=1;

$('#AjouterProduit').livequery('click', function(e){
  if(document.getElementById("entree").value == "" || document.getElementById("quantity").value == ""){
    alert("vous n'avez pas choisi le produit");
  }else{
   var nom = document.getElementById("entree").value;
    var quantite = document.getElementById("quantity").value;
    var prix = document.getElementById("prix_unitaire").value; 
    var prix_total = document.getElementById("prix_total").value;
    var data  = {id_produit: nom, id_vente: "1", quantite: quantite};
    console.log(data);

    $.post("http://localhost:5000/lignecommande/new", data, function(puerto){
    console.log(puerto);
    
  }, 'json');

  var vente = new Object();
  vente.status = "0";
  vente.payement_status = "0";
  user = JSON.parse( localStorage.getItem('user'));
  vente.user_id = user.ID_USER || "1"  ;
  vente.total = ""; 
  var data  = {lignes: vente.ligne, status: vente.status, payement_status: vente.payement_status, user_id: vente.user_id, total: vente.total};
  console.log(data);
  console.log("creation de vente ");  
  console.log(localStorage.getItem("commande")); 

  if (!localStorage.getItem("commande")) {
    console.log("vente crée");     
    $.post("http://localhost:5000/vente/new", data, function(puerto){
      console.log("vente crée");
      console.log(puerto);
      puerto.data[0].push;
      localStorage.setItem("puerto", JSON.stringify(puerto));
      commande.push(vente);
      localStorage.setItem("commande", JSON.stringify(commande));
    }, 'json');
  }else
  {
    commande.push(vente);
    localStorage.setItem("commande", JSON.stringify(commande));
    console.log( JSON.parse(localStorage.getItem("commande")) ) ;
  }  
  

  
  var product = new Object();
  product.num = i;
  
  id = $('#entree').val(); 
  product.nom =  $(`[value="${id}"]`).html() ;
  product.quantite = document.getElementById("quantity").value;
  product.prix_total = document.getElementById("prix_total").value; 
  i = i++;

  panier.push(product)
  

  localStorage.setItem("panier", JSON.stringify(panier));

  document.getElementById("entree").value = "";
  document.getElementById("quantity").value ="";
  document.getElementById("prix_unitaire").value ="";
  document.getElementById("prix_total").value ="";

  console.log( JSON.parse(localStorage.getItem("panier")) ) ;}
  return false;
}); 

$('#ValiderCommande').livequery('click', function(e){
  if (localStorage.getItem("panier") === null) {
    alert("ajouter un produit avant de valider");
  }else{
  window.location.href="facture.html";}
});