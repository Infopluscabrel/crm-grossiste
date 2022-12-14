const path = "http://localhost:5000";

//fonction pour enregistrer un stock
$('#saveStock').livequery('submit',   function(e){ e.preventDefault() ; 
    var nom = document.getElementById("entree").value;
	console.log(nom);
    var quantite = document.getElementById("yourEmail").value;
    var user = JSON.parse( localStorage.getItem('user'));
    	console.log(user);
    var proprietaire = user.ID_USER;  
          console.log(proprietaire);
 	var data  = {id: nom, quantite: quantite, proprietaire: proprietaire};
 	 console.log(data);

  	$.post("http://localhost:5000/article/stock/entree", data, function(puerto){

   console.log(puerto) ;
   document.getElementById("entree").value = "";
   document.getElementById("yourEmail").value ="";
   window.location.href="stocks-list.html";
  }, 'json');

  return false;

});

//fonctionpour lister tout les articles en stock
const getArticle_url =
	"http://localhost:5000/article/stock/entree/all";

// Defining async function
async function getapi() {
	
	// Storing response
	//const response = await fetch(url);
	
	// Storing data in form of JSON
	var user = JSON.parse( localStorage.getItem('user'));
    console.log(user);
    var propriétaire = user.ID_USER;
        
   var data  = { proprietaire: ""+propriétaire};
    console.log(data);
	$.get("http://localhost:5000/article/stock/entree/all", data, function(puerto){
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
	 for (let r of data.data) {
		tab += `<tr>
    <td>${r.id} </td>      
	<td>${r.NOM_PRODUIT} </td>
	<td>${r.quantite}</td>
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
	document.getElementById("stock").innerHTML = tab;
}