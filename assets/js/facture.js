var panier = JSON.parse( localStorage.getItem('panier'));
console.log(panier);
var puerto = JSON.parse(localStorage.getItem('puerto'));
console.log(puerto);
var NetApayer = 0;
$.each(panier, function(key, value){
    $('tbody').append(`<tr>
    <th>${key+1}</th>
    <th>${value.nom}</th>
    <th>${value.quantite}</th>
    <th>${value.prix_total}</th>
  </tr>`)
  NetApayer = NetApayer + parseFloat(value.prix_total);
  console.log(NetApayer);
  $('#NetApayer').html(`${NetApayer}`);

});
$('#validerfacture').livequery('click', function(e){ e.preventDefault() ;
   window.location.href="Moyenspayement.html";
  });



   