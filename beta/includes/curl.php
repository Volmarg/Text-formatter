<?php

#Pobieranie curlem

function pobierz_strone_curlem($url)
{
    $curl=curl_init();
    curl_setopt($curl,CURLOPT_URL,$url);

    curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);

    $strona=curl_exec($curl);
    curl_close($curl);

    return $strona;
}

#Sprawdzanie czy zosta³o wys³ane ¿¹danie pobrania strony

if(isset($_POST['url']) && $_POST['url']!=null && $_POST['url']!=false)
{
    $content_strony=pobierz_strone_curlem($_POST['url']);

    preg_match('#<body(.*)>(.*)</body>#Uims',$content_strony,$matches);

    $body_strony=$matches[2];


}


?>