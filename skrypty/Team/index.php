  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
  <meta charset="utf-8">
      <!-- Meta section !-->
      <title>  </title>

      <!-- Additional External Styles !-->
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
      <link href="https://fonts.googleapis.com/css?family=Port+Lligat+Slab" rel="stylesheet">

      <!-- Styles section !-->
      <!-- global !-->
      <link rel="stylesheet" href="libs/styles/global.css">
      <!-- RWD !-->
      <!-- Additional External Scripts !-->
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
      <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.js"></script>

      <!-- My scripts section !-->
      <!-- External Data section !-->
  </head>
  <body>

    <section class="container">

      <section class="local">

        <section class="options">
          <h3>Selected file</h3>
          <div id="selected">No filed was selected...</div>
          <div>
            <h3>Task Jsons</h3>
            <button data-id="order1" onClick='loadJson(this)' class="btn btn-primary">Order 1</button>
            <button data-id="order2" onClick='loadJson(this)' class="btn btn-primary">Order 2</button>
            <button data-id="order3" onClick='loadJson(this)' class="btn btn-primary">Order 3</button>
          </div>

          <div>
            <h3>My Jsons</h3>
            <button data-id="myOrder1" onClick='loadJson(this)' class="btn btn-primary">Order 1</button>
            <button data-id="myOrder2" onClick='loadJson(this)' class="btn btn-primary">Order 2</button>
          </div>

          <div class="">
            <h3>Options</h3>
            <button onClick='grantDiscounts(this)' class="btn btn-danger">Check discounts</button>
          </div>

          <div class="" id="discounts">

          </div>

        </section>

        <section class="" >
          <h3>Before</h3>
          <section class="previewLocal">
            <div><b>Id: </b>            <span id="id"> </span></div>
            <div><b>Customer Id: </b>   <span id="customer"> </span></div>
            <div><b>Items: </b>         <span id="items"> </span></div>

            <div><b>Total Price: </b>   <span id="total"> </span></div>
          </section>
        </section>

        <section class="">
          <h3>After</h3>
          <section class="discountsLocal">
            <div><b>Id: </b>            <span id="id"> </span></div>
            <div><b>Customer Id: </b>   <span id="customer"> </span></div>
            <div><b>Items: </b>         <span id="items"> </span></div>

            <div><b>Total Price: </b>   <span id="total"> </span></div>

        </section>

      </section>

    </section>

    <script src="libs/scripts/interface.js"></script>

  </body>
</html>
