<?php

include_once '../model/discounts.php';

  class parse{

    protected function getPartialData($json){
      $discount=new discounts();
      $functions=$discount->qualify($json);

      $granted=array();

      #Since there are no informations if discounts sumUp i made it so it sums up
      foreach($functions as $num=>$function){
        $result=call_user_func($function,$json);

        #get all discounts messages
        if($result[0]==true){
          array_push($granted,$result[1]);
        }

        #overwrite json with last result of json with discounts
        $json=$result[2];
      }
      $returnable=array($granted,$json);
      return $returnable;

    }

  }

  class view extends parse{

    public function grabResult($json){
      $result=$this->getPartialData($json);

      if(@$_GET['type']=='json'){
        return $result[1];
      }elseif(@$_GET['type']=='info'){
        return $result[0];
      }

    }


    }


?>
