
function loadJson(evt){
  var json=grabFile(evt);
  var parsed=JSON.parse(json);
  var preview=buildPreview(parsed,'previewLocal');

}

function grabFile(evt){
  var file=$(evt).data('id')+'.json';
  var url='json/'

  var ajax=new XMLHttpRequest();
  ajax.open('GET',url+file,false);
  ajax.send();

  var returned=ajax.responseText;
  $('#selected').html(file);

  return returned;
}

function buildPreview(json,className){
  $('.'+className+' #id').html(json.id);
  $('.'+className+' #customer').html(json['customer-id']);
  $('.'+className+' #total').html(json.total);

  var stringable='';
  for(var x=0;x<=json.items.length-1;x++){
    stringable+=`
      <div> <i>product-id: </i> `+json.items[x]['product-id']+`    </div>
      <div> <i>quantity: </i>   `+json.items[x].quantity+`        </div>
      <div> <i>unit-price: </i> `+json.items[x]['unit-price']+`   </div>
      <div> <i>total: </i>      `+json.items[x].total+`  </div>
      <hr/>
    `;


    json.items[x].quantity
  }
  $('.'+className+' #items').html(stringable);

}

function grantDiscounts(){
  var file=$('#selected').html();

  if(file=='' || file==undefined || file=='No filed was selected...'){
    alert('Select file!');
  }else{

    var url='controller/ajax.php?file='

    //Get json
    var ajax=new XMLHttpRequest();
    ajax.open('GET',url+file+'&type=json',false);
    ajax.send();

    var json=ajax.responseText;
    var parsed=JSON.parse(json);
    buildPreview(parsed,'discountsLocal');

    //Get messages
    ajax.open('GET',url+file+'&type=info',false);
    ajax.send();
    var messages=ajax.responseText;
    var parsed=JSON.parse(messages);

    var allMessages='<hr/>';
    for(var x=0;x<=parsed.length-1;x++){
      allMessages+='<p>'+parsed[x]+'</p>';
    }

    $('#discounts').html(allMessages);
  }
}
