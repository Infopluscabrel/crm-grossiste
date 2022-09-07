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

// voir la liste de ses commandes


// Defining async function
async function getapi() {
		
	// Storing data in form of JSON
	var user = JSON.parse( localStorage.getItem('user'));
    console.log(user);
    var user_id = user.ID_USER;
    var data  = {user_id: user_id};
    
	$.get("http://localhost:5000/vente/all/me", data, function(puerto){
    var user = JSON.parse( localStorage.getItem('user'));
    console.log(user);
    var user_id = user.ID_USER;
    
    console.log(puerto); 
    console.log(user_id);
	if (puerto) {
		hideloader();
	}
	show(puerto);
  });
}
// Calling that async function
getapi();

// Function to hide the loader
function hideloader() {
	
}
// Function to define innerHTML for HTML table
function show(data) {
  if(user_id){
  var user = JSON.parse( localStorage.getItem('user'));
    console.log(user);
    var user_id = user.ID_USER;
        
   var data  = { user_id: ""+user_id};
    console.log(data);
    
   	let tab =
		`<tr>
        <th>#</th>
		<th>Nom</th>
        <th>Quantite</th>
        <th>Date</th>
        <th>Options</th>
		</tr>`;
	
	// Loop to access all rows
	 for (let r of data) {
		tab += `<tr>
    <td>${r.id}</td>      
	<td>${r.NOM_PRODUIT}</td>
	<td>${r.qte_grossiste}</td>
	<td>${r.CREATED_AT} </td>
       
    <td><ul class="list-inline m-0">
                      
    <li class="list-inline-item">
      <button class="btn btn-success btn-sm " type="button" data-toggle="modal" data-target="#editerStock" data-placement="top" title="Edit"
        style="margin-bottom: 10px; vertical-align: baseline;"><i class="bi bi-pencil-square"></i>Editer</button>
    </li>
    <li class="list-inline-item">
      <button class="btn btn-danger btn-sm " type="button" data-toggle="tooltip" data-placement="top"
        title="Delete"><i class="bi bi-trash"></i>Supprimer</button>
    </li>
    <li class="list-inline-item" data-toggle="modal" data-target="#plusinfo"  >
      <button type="button" class="btn btn-warning btn-sm">Voire plus</button>
    </li>
  </ul></td>  
    </tr>`;
	}
  
	// Setting innerHTML as tab variable
	document.getElementById("stock").innerHTML = tab;}else{}
}

//lister les commandes des détaillants aux grossiste

//Defining async function
async function getapi() {
		
	// Storing data in form of JSON
	var user = JSON.parse( localStorage.getItem('user'));
    console.log(user);
    var user_id = user.ID_USER;
    var data  = {user_id: proprietaire};
    
	$.get("http://localhost:5000/vente/all/detaillant", data, function(puerto){
    var user = JSON.parse( localStorage.getItem('user'));
    console.log(user);
    var user_id = user.ID_USER;
    
    console.log(puerto); 
    console.log(user_id);
	if (puerto) {
		hideloader();
	}
	show(puerto);
  });
}
// Calling that async function
getapi();

// Function to hide the loader
function hideloader() {
	
}
// Function to define innerHTML for HTML table
function show(data) {
  if(user_id){
  var user = JSON.parse( localStorage.getItem('user'));
    console.log(user);
    var user_id = user.ID_USER;
        
   var data  = { user_id: ""+user_id};
    console.log(data);
    
   	let tab =
		`<tr>
        <th>#</th>
		<th>Nom</th>
        <th>Quantite</th>
        <th>Date</th>
        <th>Options</th>
		</tr>`;
	
	// Loop to access all rows
	 for (let r of data) {
		tab += `<tr>
    <td>${r.id}</td>      
	<td>${r.NOM_PRODUIT}</td>
	<td>${r.qte_grossiste}</td>
	<td>${r.CREATED_AT} </td>
       
    <td><ul class="list-inline m-0">
                      
    <li class="list-inline-item">
      <button class="btn btn-success btn-sm " type="button" data-toggle="modal" data-target="#editerStock" data-placement="top" title="Edit"
        style="margin-bottom: 10px; vertical-align: baseline;"><i class="bi bi-pencil-square"></i>Editer</button>
    </li>
    <li class="list-inline-item">
      <button class="btn btn-danger btn-sm " type="button" data-toggle="tooltip" data-placement="top"
        title="Delete"><i class="bi bi-trash"></i>Supprimer</button>
    </li>
    <li class="list-inline-item" data-toggle="modal" data-target="#plusinfo"  >
      <button type="button" class="btn btn-warning btn-sm">Voire plus</button>
    </li>
  </ul></td>  
    </tr>`;
	}
  
	// Setting innerHTML as tab variable
	document.getElementById("commande").innerHTML = tab;}else{}
}