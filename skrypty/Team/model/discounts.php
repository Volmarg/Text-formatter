<?php

  #For products amount based discounts
  class qunatity{

    public function discountCheapProduct($json){

      #no category provided in json so i skip this part
      #For tools, if 2 or more bought, make 20% discount on cheapest
      $cheapestInOrder=''; #price
      $cheapestNum=''; #array id
      $quantity=false; #if any product has above trshold then will store info

      #iterate over all product
      foreach($json['items'] as $num => $itemz){

        #Check if any product has treshold
        if($itemz['quantity']>=2){
          $quantity=true;
        }

        #Find Cheapest one
            #Pick a price on start
            if($num==0){
              $cheapestInOrder=$itemz['unit-price'];
              $cheapestNum=$num;
            }

            #now go on with checking if any other product is cheper
            if($itemz['unit-price']<$cheapestInOrder){
              $cheapestInOrder=$itemz['unit-price'];
              $cheapestNum=$num;
            }
      }

      #now if the treshold is ok
      if($quantity==true){

        #Recalculate prices
          #For that one item
          $cheapstSingle=$json['items'][$cheapestNum]['unit-price'];
          $discount=2*($json['items'][$cheapestNum]['unit-price']/10); #20%
          $newSinglePrice=round($cheapstSingle-$discount,2);

          #For totall for that one item
          $oldTotal=$json['items'][$cheapestNum]['total'];
          $total=$newSinglePrice*$json['items'][$cheapestNum]['quantity'];
          $diff=$oldTotal-$total;

          #Rewrite Json
          $json['items'][$cheapestNum]['unit-price']=$newSinglePrice;
          $newSinglePrice*$json['items'][$cheapestNum]['total']=$total;
          $json['total']=$json['total']-$diff;

          $result=array(true,'Discounts for min. 2 tools: granted',$json);
      }else{

          $result=array(false,'Discounts for min. 2 tools: not granted',$json);
      }

      return $result;
    }


    public function freeProduct($json){

      $newItems=array();

      #iterate over all products
      foreach($json['items'] as $id => $item){

        #no category provided in json so i skip this part - so it will be granted all the time
        #For switches on 5 bought, 6th for free
        if($item['product-id']=='B102'){ #check if this are the switches
          $freeItems=floor($item['quantity']/5);

          #Rewrite Json
          $json['items'][$id]['quantity']=$item['quantity']+$freeItems;
          $result=array(true,'Discounts for each 5 switches granted',$json);

          break;
        }else{
          $result=array(false,'Discounts for each 5 switches not granted',$json);
        }
      }

      return $result;
    }
  }

  #For money spent based discounts
  class payment extends qunatity{

    public function aboveTreshold($json){
      $totalPrice=$json['total'];

      #Above 1000$
      if($totalPrice>1000){
        #Calculate discount
        $discounted=round($totalPrice/10,2);
        $totalPrice=$totalPrice-$discounted;

        #Rewrite json
        $json['total']=$totalPrice;

        $result=array(true,'Discounts for total money above treshold 1000$: granted',$json);
      }else{
        $result=array(false,'Discounts for total money above treshold 1000$: not granted',$json);
      }

      return $result;

    }
  }

  #Generall class for using all the discounts aviable
  class discounts extends payment{

    #Used to check if specific order qulaifies for any discounts
    public function qualify($json){
      $_this = $this;
      $discountsArray = array(
        '1' => function($jsons) use($_this){
                $res=$_this->aboveTreshold($jsons);
                return $res;
        },
        '2' => function($jsons) use($_this){
                $res=$_this->freeProduct($jsons);
                return $res;
        },
        '3' => function($jsons) use($_this){
                $res=$_this->discountCheapProduct($jsons);
                return $res;
           }
      );

      return $discountsArray;

    }

  }



?>
