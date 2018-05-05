<?php
  #This class takes json files
  class Order{

    function get($file){
      #Grab file
      $content=file_get_contents($file);

      #Convert to json
      $json=json_decode($content,true);
      return $json;
    }
  }


?>
