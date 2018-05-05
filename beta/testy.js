function testuj()
{
    var objekt = { nazwa1: "test", nazwa2: "test2" };
    alert(objekt.nazwa2);
}


// <h1> pokaż
var h1_w_kodzie=document.getElementsByTagName("h1");
var ile_h1_w_kodzie = h1_w_kodzie.length;


for (var x = 0; x <= ile_h1_w_kodzie - 1; x++)
{
    h1_w_kodzie[x].style.border = "2px red dashed";
}