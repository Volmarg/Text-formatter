<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<!-- colorPicker-master !-->

<link href="/skrypty/colorPicker-master/index.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="/skrypty/colorPicker-master/colorpicker.js"></script>

<!-- colorPicker-mini !-->

	<link href="/skrypty/colorPicker-master/javascript_implementation/jsColor.css" media="all" rel="stylesheet" type="text/css" />

<!-- RangeSlider !-->
<script type="text/javascript" src="/skrypty/rangeslider/rangeslider.js"></script>
<link href="/skrypty/rangeslider/rangeslider.css" media="all" rel="stylesheet" type="text/css" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

<link href="style.css" rel="stylesheet" type="text/css" />

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">

</head>
<body id="body_tag">

<?php
    @include_once('includes/curl.php');
?>


<style>

</style>

<div class="control_panel">

    <!-- Controll Panell !-->

            <!-- Główne opcje !-->
    <div class="center_panel" id="center_panel">
			<div class="row">
				<a id="button_clicker" href="#B1" onclick="wstaw_tag(this.firstElementChild.id)"><div class="btn btn-info" id="strong" onmousedown="button_wduszony(this.id)" onmouseup="button_puszczony(this.id)">B</div> </a>
				<a id="button_clicker" href="#I1" onclick="wstaw_tag(this.firstElementChild.id)"><div class="btn btn-info" id="i" onmousedown="button_wduszony(this.id)" onmouseup="button_puszczony(this.id)">I</div> </a>
				<a id="button_clicker" href="#U1" onclick="wstaw_tag(this.firstElementChild.id)"><div class="btn btn-info" id="u" onmousedown="button_wduszony(this.id)" onmouseup="button_puszczony(this.id)">U</div> </a>


				<a id="button_clicker" href="#H1" onclick="wstaw_tag(this.firstElementChild.id)"><div class="btn btn-info" id="h1" onmousedown="button_wduszony(this.id)" onmouseup="button_puszczony(this.id)">H1</div> </a>
				<a id="button_clicker" href="#H2" onclick="wstaw_tag(this.firstElementChild.id)"><div class="btn btn-info" id="h2" onmousedown="button_wduszony(this.id)" onmouseup="button_puszczony(this.id)">H2</div> </a>
				<a id="button_clicker" href="#H3" onclick="wstaw_tag(this.firstElementChild.id)"><div class="btn btn-info" id="h3" onmousedown="button_wduszony(this.id)" onmouseup="button_puszczony(this.id)">H3</div> </a>

				<a id="button_clicker" href="#P1" onclick="wstaw_tag(this.firstElementChild.id)"><div class="btn btn-info" id="p" onmousedown="button_wduszony(this.id)" onmouseup="button_puszczony(this.id)">P</div> </a>
				<a id="button_clicker" href="#a1" ><div onclick="wstaw_tag(this.id)" class="btn btn-info" id="a" onmousedown="button_wduszony(this.id)" onmouseup="button_puszczony(this.id)">a</div> </a>
				<a id="button_clicker" href="#img1" ><div onclick="wstaw_tag(this.id)" class="btn btn-infobtn btn-info" id="img" onmousedown="button_wduszony(this.id)" onmouseup="button_puszczony(this.id)">img</div> </a>

				<a id="button_clicker" href="#li1" onclick="wstaw_tag(this.firstElementChild.id)"><div class="btn btn-info" id="li" onmousedown="button_wduszony(this.id)" onmouseup="button_puszczony(this.id)">Li</div> </a>
				<!--Dodatkowe opcje !-->
		    <span style="float:right;">

				<a id="button_clicker" href="#tagi1" onclick="remove_tags()"><div class="btn btn-warning" id="tagi_remove" onmousedown="button_wduszony(this.id)" onmouseup="button_puszczony(this.id)" >Usuń tagi</div> </a>

				<a id="button_clicker" href="#galeria1" onclick="stworz_galerie()"><div class="btn btn-warning" id="stworz_galerie" onmousedown="button_wduszony(this.id)" onmouseup="button_puszczony(this.id)" style="color:red;">Stwórz galerię</div> </a>

				<a id="button_clicker" href="#zajawki" onclick="generuj_panel_dodawania_zajawek()"><div class="btn btn-danger" id="generuj_zajawke" onmousedown="button_wduszony(this.id)" onmouseup="button_puszczony(this.id)" style="">Stwórz zajawki</div> </a>

		    </span>

					<div style="clear:both"></div>
			</div>




        <!-- Style !-->

    <br/>

	<hr>
	<p class="naglowek">Dodatkowe style</p>


	<div class="row" style="margin-top:-30px;">
		<input type="checkbox"  onclick="zbierz_style_checboxy(this.id)" value="text-align:justify;" id="text_justify">Text-justify
		<input type="checkbox"  onclick="zbierz_style_checboxy(this.id)" value="float:left;" id="float_left">Float:left
		<input type="checkbox"  onclick="zbierz_style_checboxy(this.id)" value="float:right;" id="float_right">Float:right


	</div>
</div>

</div>

   <!-- Input text !-->

<!-- LEWY PANEL !-->
	<div class="left_side">


		<p class="naglowek">Original text	</p>

		<textarea value="" id="tresc_wprowadzana" class="tresc_wprowadzana" placeholder=""></textarea>

	</div>

<!-- PANEL SRODKOWY !-->

	<div class="center_panel_fast_acces">

            <a id="button_clicker" href="#odswiez" onclick="odswiez_podglad()">
                <div class="btn btn-info" id="odswiezanie" onmousedown="button_wduszony(this.id)" onmouseup="button_puszczony(this.id)" style="color:black;">
                    <p>↺</p>
                </div>
           </a>



    </div>


<!-- PRAWY PANEL !-->
	<div class="right_side">

		<p class="naglowek">Preview</p>

		<div class="tresc_wyjsciowa" id="tresc_wyjsciowa">

        <?php
            #Sprawdzam czy curl był wywoływany
            if(isset($content_strony) && $content_strony!=null && $content_strony!=false)
            {
                echo $body_strony;
            }

        ?>
        </div>

	</div>

<script src="skrypty.js"></script>

<script src="testy.js"></script>

<script>

</script>

</body>
</html>
