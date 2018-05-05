<?php

  include_once '../model/order.php';
  include_once '../model/discounts.php';
  include_once '../view/print.php';

  #for json fetching
  $path='../json/';
  $file=$_GET['file'];
  $request=$_GET['type'];

  #for json parsing
  $bill= new Order();
  $json=$bill->get($path.$file);

  #for showing result
  $res=new view();
  $result=$res->grabResult($json,$request);

  echo json_encode($result,true);

?>
