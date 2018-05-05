
/*
====================================================
= POBIERANIE ZAZNACZONEGO TESKTU  				   =
====================================================
*/
var poczatek_zaznaczenia;
var koniec_zaznaczenia;
var caly_tekst;
var text_w_zmiennej;
var zmodyfikowany_zaznaczony_tekst;

var blocker_selector = 0;

function text_do_zmiennej() {
    document.getElementById('tresc_wprowadzana').innerHTML = document.getElementById('tresc_wprowadzana').value;

    caly_tekst = document.getElementById('tresc_wprowadzana');
    poczatek_zaznaczenia = caly_tekst.selectionStart;
    koniec_zaznaczenia = caly_tekst.selectionEnd;

    return caly_tekst.value.substring(poczatek_zaznaczenia, koniec_zaznaczenia);
}

/*
====================================================
= DODANIE TAGÓW DO ZAZNACZONEGO TESKTU	   		   =
====================================================
*/

var dlugosc_textu = '';
var zawartosc_pola_texarea_caly_tekst = '';
var przed_zaznaczeniem = '';
var za_zaznaczeniem = '';
var id_kliknietego_znacznika = '';

var zebrane_style_z_checkboxow = '';

wstawianie_tagu: function wstaw_tag(id_znacznika) {


    id_kliknietego_znacznika = id_znacznika;
    //Pobieranie zaznaczenia i dodawanie do niego znaczników
    text_w_zmiennej = text_do_zmiennej();
    generuj_znacznik(id_kliknietego_znacznika);

    //Tylko dla dopisywania znaczników

    if (znacznik_do_dopisania.indexOf("ul") != '-1' || znacznik_do_dopisania.indexOf("li") != '-1') {//Dla list
        //Tutaj trzeba trochę poprawić, co jeśli ostatni nie jest enter? Co jeśli nic nie zaznaczę?
        // W przyszłości można się pokusić o checkbox z UL/OL
        //Przekazać zmienną do funkcji opovieraną w if
        //zmodyfikowany_zaznaczony_tekst="<ul>\n"+"<"+znacznik_do_dopisania+">"+text_w_zmiennej.replace(/\n/g,"</"+znacznik_do_dopisania+">\n"+"<"+znacznik_do_dopisania+">")+"\n</ul>";

        zmodyfikowany_zaznaczony_tekst = "<ul>\n" + "<" + znacznik_do_dopisania + ">" + text_w_zmiennej.replace(/\n/g, "</" + znacznik_do_dopisania + ">\n" + "<" + znacznik_do_dopisania + ">") + "\n</li></ul>";

        //zmodyfikowany_zaznaczony_tekst.replace('</li>\n</li>','</li></ul');

    }
    else if (znacznik_do_dopisania.indexOf("a") != '-1') {
        //Wywołanie ustawień
        dopisz_formularz(id_kliknietego_znacznika);
        return;

    }
    else if (znacznik_do_dopisania.indexOf("img") != '-1') {
        //Wywołanie ustawień
        dopisz_formularz(id_kliknietego_znacznika);
        return;

    }
    else {//Dla zwykłych elementów blokowych i linikowych
        zmodyfikowany_zaznaczony_tekst = "<" + znacznik_do_dopisania + " style='" + zebrane_style_z_checkboxow + "'" + ">\n" + text_w_zmiennej + "\n</" + znacznik_do_dopisania + ">";
    }

    //Sklejanie całości

    zwracany_tekst_po_sklejeniu = sklej_zmodyfikowany_tekst(zmodyfikowany_zaznaczony_tekst);

    //Wyświetlanie zmodyfikowanego tekstu
    wyswietl_zmodyfikowany_tekst(zwracany_tekst_po_sklejeniu);

}

/*
========================================================================
= DODANIE TAGÓW DO ZAZNACZONEGO TESKTU - WDUSZENIE SUBMITA  		   =
========================================================================
*/
function wstaw_tag_dla_interakcji_z_okienkiem(znacznik_do_dopisania, element1, element2) {
    if (znacznik_do_dopisania.indexOf("a") != '-1') {
        //Wywołanie ustawień
        zmodyfikowany_zaznaczony_tekst = "<" + znacznik_do_dopisania + " href='" + element1 + "' style='" + zebrane_style_z_checkboxow + "'>" + element2 + '</' + znacznik_do_dopisania + '>';
    }
    if (znacznik_do_dopisania.indexOf("img") != '-1') {
        //Wywołanie ustawień
        zmodyfikowany_zaznaczony_tekst = "<" + znacznik_do_dopisania + " alt='" + element2 + "' src='" + element1 + "' style='" + zebrane_style_z_checkboxow + "'/>";
    }
    //Sklejanie całości
    zwracany_tekst_po_sklejeniu = sklej_zmodyfikowany_tekst(zmodyfikowany_zaznaczony_tekst);

    //Wyświetlanie zmodyfikowanego tekstu
    wyswietl_zmodyfikowany_tekst(zwracany_tekst_po_sklejeniu);


}

/*
====================================================
= SKLEJANIE ZMODYFIKOWANEGO TEKSTU             =
====================================================
*/
function sklej_zmodyfikowany_tekst(zmodyfikowany_zaznaczony_tekst) {

    dlugosc_textu = document.getElementById('tresc_wprowadzana').innerHTML.length;
    zawartosc_pola_texarea_caly_tekst = document.getElementById('tresc_wprowadzana').value;


    przed_zaznaczeniem = zawartosc_pola_texarea_caly_tekst.substring(0, poczatek_zaznaczenia);
    za_zaznaczeniem = zawartosc_pola_texarea_caly_tekst.substring(koniec_zaznaczenia, dlugosc_textu);

    return przed_zaznaczeniem + zmodyfikowany_zaznaczony_tekst + za_zaznaczeniem;

}



/*
====================================================
= WYŚWIETLANIE ZMODYFIKOWANEGO TEKSTU              =
====================================================
*/

function wyswietl_zmodyfikowany_tekst(co_zwrocic) {
    document.getElementById('tresc_wprowadzana').value = co_zwrocic;
    document.getElementById('tresc_wyjsciowa').innerHTML = co_zwrocic;
}

/*
=============================================
= TWORZENIE GALERII 					    =
=============================================
*/
function stworz_galerie() {
    var obrazki = '';
    var podmieniony = '';
    var sklejka = '';
    var tablica_obrazkow = new Array();
    var rozmiar_tablicy_obrazkow = '';
    var grafika_sklejona = '';

    //Od ręki style do galerii
    // Tutaj trzeba w przyszłości zrobić dodatkowe okienko, które zgromadzi style do skopiowania i może jakieś slidery
    var style = "<style>\n .additional_small_gallery_on_page\n{\n display:flex; \n content-justify:flex-start; \n flex-wrap:wrap;\n}\n .additional_small_gallery_on_page>img\n{\n width:30%; \n margin:10px; \n} \n</style>\n";

    //Pobieranie urli + robienie z nich tablicy
    obrazki = text_do_zmiennej();
    tablica_obrazkow = obrazki.split("\n");
    rozmiar_tablicy_obrazkow = tablica_obrazkow.length;

    //Przeróbka urli na tag grafiki
    for (var x = 0; x <= rozmiar_tablicy_obrazkow - 1; x++) {
        if (x == 0) {
            tablica_obrazkow[x] = '<div class="additional_small_gallery_on_page" /> <img src="' + tablica_obrazkow[x] + '"/>\n';
        }
        else if (x == rozmiar_tablicy_obrazkow - 1) {

            tablica_obrazkow[x] = '<img src="' + tablica_obrazkow[x] + '"/>\n</div>';

        }
        else {

            tablica_obrazkow[x] = '<img src="' + tablica_obrazkow[x] + '"/>\n';

        }

    }

    //sklejanie tablicy urli do stringa
    grafika_sklejona = style + '\n' + tablica_obrazkow.join('');

    //Sklejanie całości

    sklejka = sklej_zmodyfikowany_tekst(grafika_sklejona);

    //Wyświetlanie zmodyfikowanego tekstu
    wyswietl_zmodyfikowany_tekst(sklejka);

}

/*
=============================================
= GENEROWANIE ZAJAWEK					    =
=============================================
*/

//RAW zmienne globalne dla podfunkcji
var ilosc_zajawek = '';
var tablica_definiujaca_element_zajawek = [1, 2, 3];

function generuj_panel_dodawania_zajawek() {

    //Przygotuj okienko z ustawieniami
    wywolaj_okienko_z_ustawieniami('center_panel');
    odwolaj_sie_do_aktulanego_okienka();

    //Dodaj elementy budujące generator zajawek
    document.getElementById("okienko_container").innerHTML += "<div id='panel_generatora_zajawek'><div id='lewa_strona_panel_generatora_zajawek'></div></div>";
    document.getElementById("lewa_strona_panel_generatora_zajawek").innerHTML += "<div class='all_zajawki_form' id='all_zajawki_form' style='display:flex;flex-wrap:wrap;'></div>";

    //Dodaj style do okienka
    document.getElementById("single_window").style.width = "80%";
    document.getElementById("single_window").style.height = "80%";

    //Wywołaj funkcje odpowiedzialne za tworzenie generatora
    przygotuj_dane_do_generowania_zajawek();
    generuj_zajawki();
    generuj_panel_ustawien_generatora_zajawek();

}

function przygotuj_dane_do_generowania_zajawek(ile_zajawek, nowa_tablica_kolejnosci_elementow) {
    //Przygotuj zmienne odpowiedzialne za generowanie zajawki
    if (ile_zajawek === undefined) {
        ile_zajawek = 3;
    }

    ilosc_zajawek = ile_zajawek;

    if (nowa_tablica_kolejnosci_elementow === undefined) {

    }
    else {
        tablica_definiujaca_element_zajawek = nowa_tablica_kolejnosci_elementow;
    }
    /*
        [url,text,grafika]
    */
}

function generuj_zajawki(id_docelowe) {
    if (id_docelowe === undefined) {
        id_docelowe = "all_zajawki_form";
        var jedna_zajawka_do_ustawien = "";

        //Koniecznosc czyszczenia panelu w przypadku dodawania kolejnych zajawek
        document.getElementById("all_zajawki_form").innerHTML = "";
    }
    else {
        var jedna_zajawka_do_ustawien = "_zajawki_settings";
    }


    // LEWA STRONA

    //Petla okreslajaca ile zajawek bedzie
    for (var x = 0; x < ilosc_zajawek; x++) {

        /*
        ########### BUGI #########

        # Znika zawartość inputów po przesunięciu elementów lub dodaniu zajawek - pewnie wartość nie jest szczytywana

        */

        document.getElementById(id_docelowe).innerHTML += "<div id='single_zajawka_form" + (x + 1) + jedna_zajawka_do_ustawien + "'/ style='margin:10px;'></div>";
        document.getElementById("single_zajawka_form" + (x + 1) + jedna_zajawka_do_ustawien).innerHTML += "Zajawka nr: " + (x + 1);


        stworz_jedna_zajawke(x, jedna_zajawka_do_ustawien);

    }
}


//Zmienne na potrzeby pobierania zawartości inputów zajawek
var id_inputow_zajawek_do_tablicy_zawartosci = [];
var value_inputow_zajawek_do_tablicy_zawartosci = [];

function pobierz_zawartosc_zajawek() {
    var table_filler = 0;
    id_inputow_zajawek_do_tablicy_zawartosci = [];
    value_inputow_zajawek_do_tablicy_zawartosci = [];

    //Pobierz zawartość zajawek
    var cala_zawartosc_panelu_zajawek = document.getElementById('all_zajawki_form').children;

    for (var z = 0; z < cala_zawartosc_panelu_zajawek.length; z++) {   //Odwołaj się do jednego Diva - jedna zajawka
        var pojedynczy_div_zajawki = cala_zawartosc_panelu_zajawek[z].children;

        for (var c = 0; c < pojedynczy_div_zajawki.length; c++) {   //Odwołaj się do jednego inputa w danej zajawce
            var zawartosc_pojedynczego_inputa = pojedynczy_div_zajawki[c].value;

            //Wpisz ID i value jednego inputa do tablicy
            id_inputow_zajawek_do_tablicy_zawartosci[table_filler] = pojedynczy_div_zajawki[c].id;
            value_inputow_zajawek_do_tablicy_zawartosci[table_filler] = pojedynczy_div_zajawki[c].value;

            table_filler++;
        }


    }

}

function wyswietl_zawartosc_zajawek() {

    var table_filler = 0;
    var zajawki_do_wyswietlenia = '';

    //Pęta po wszystkich elementach tablicy
    for (var z = 0; z < id_inputow_zajawek_do_tablicy_zawartosci.length; z++) {
        zajawki_do_wyswietlenia += "<div class='all_zajawki'>\n\n";

        //Petal do ustalania numeru zajawki
        for (var v = 0; v < id_inputow_zajawek_do_tablicy_zawartosci.length / 4; v++) {
            zajawki_do_wyswietlenia += "<div class='single_zajawka' id='zajawka_" + v + "'>\n\n";
            var element_zajawki = '';
            var wszystkie_elementy_jednej_zajawki = '';
            // Dodatkowa tablica odpowiedzialna za generowanie zawartosc pojedynczej zajawki
            for (var q = 0; q < 4; q++) {
                //@@Generowanie ciała jednej zajawki@@//
                //Sprawdzanie jaki element zajawki jest generowany by dobrac odpowiedni TAG

                if (id_inputow_zajawek_do_tablicy_zawartosci[table_filler].match(/url/)) {
                    element_zajawki = '<a href="' + value_inputow_zajawek_do_tablicy_zawartosci[table_filler] + '">' + value_inputow_zajawek_do_tablicy_zawartosci[table_filler+3] + '</a>\n';
                    wszystkie_elementy_jednej_zajawki += element_zajawki;
                }
                else if (id_inputow_zajawek_do_tablicy_zawartosci[table_filler].match(/grafika/)) {
                    element_zajawki = '<img src="' + value_inputow_zajawek_do_tablicy_zawartosci[table_filler] + '"/>\n';
                    wszystkie_elementy_jednej_zajawki += element_zajawki;
                }
                else if (id_inputow_zajawek_do_tablicy_zawartosci[table_filler].match(/text/)) {
                    element_zajawki = '<p>' + value_inputow_zajawek_do_tablicy_zawartosci[table_filler] + '</p>\n';
                    wszystkie_elementy_jednej_zajawki += element_zajawki;
                }

                z++;
                table_filler++;
            }
            zajawki_do_wyswietlenia += wszystkie_elementy_jednej_zajawki + "</div>\n\n";

            /* test */
            document.getElementById("kosnola_testowa").innerHTML = id_inputow_zajawek_do_tablicy_zawartosci.length + '+' + value_inputow_zajawek_do_tablicy_zawartosci.length;
        }

        zajawki_do_wyswietlenia += "</div>";
    }

    return zajawki_do_wyswietlenia;

}

function wygeneruj_kod_zajawek() {
    /* Tutaj generowany jest kod dodawany do <textarea>
       # Trzeba przekazac jeszcze miejsce w ktorym ostatnio kliknalem by w dobrym miejscu wstawic zajawki
    */
    pobierz_zawartosc_zajawek();
    var wyswietl_kod_zajawek = wyswietl_zawartosc_zajawek();

    document.getElementById("tresc_wprowadzana").value += wyswietl_kod_zajawek;

}

function stworz_jedna_zajawke(x, jedna_zajawka_do_ustawien) {
    //Petla przechodzaca po tablicy i sprawdzajaca kolejnosc elementow do generowania
    for (var y = 0; y < tablica_definiujaca_element_zajawek.length; y++) {

        //Ustalanie jaki element jeat obecnie w tablicy i generowanie formularzy
        var nazwa_generowanego_elementu = '';
        var placeholder = '';

        if (tablica_definiujaca_element_zajawek[y] === 1) { nazwa_generowanego_elementu = "url" + (x + 1); placeholder = "Url-href <a>"; }
        else if (tablica_definiujaca_element_zajawek[y] === 2) { nazwa_generowanego_elementu = "text" + (x + 1); placeholder = "Tekst <p>"; }
        else if (tablica_definiujaca_element_zajawek[y] === 3) { nazwa_generowanego_elementu = "grafika" + (x + 1); placeholder = "Grafika <img>"; }
        else { nazwa_generowanego_elementu = "ERROR"; placeholder = "ERROR"; }


        //Generowanie formularzy dla poszczegolnych zajawek
        var nazwa_pojedynczej_zajawki_na_ktorej_dzialam = "single_zajawka_form" + (x + 1) + jedna_zajawka_do_ustawien;

        document.getElementById(nazwa_pojedynczej_zajawki_na_ktorej_dzialam).innerHTML += "<input name='" + nazwa_generowanego_elementu + "' style='display:block;' placeholder='" + placeholder + "' id='" + nazwa_generowanego_elementu + "' value='' />";
    }
    //Dopisuje pole od anchora
    document.getElementById(nazwa_pojedynczej_zajawki_na_ktorej_dzialam).innerHTML += "<input name='Anchor' style='display:block;' placeholder='Anchor <a>' id='Anchor' value='' />";
}


function ustal_ilosc_zajawek(rodzaj_zmiany) {
    if (rodzaj_zmiany == "dodaj") {
        document.getElementById('ile_zajawek_form').value++;
    }
    else {
        if (document.getElementById('ile_zajawek_form').value > 0) {
            document.getElementById('ile_zajawek_form').value--;
        }
    }

    przygotuj_dane_do_generowania_zajawek(document.getElementById('ile_zajawek_form').value);
    generuj_zajawki();
}

function ustal_kolejnosc_elementow_zajawki(rodzaj_zmiany) {
    var nowa_tablica_kolejnosci_zajawek = tablica_definiujaca_element_zajawek;

    var na_ktorym_elemencie_tablicy_dzialac = parseInt(rodzaj_zmiany.match(/([0-9])/)) - 1;

    if (rodzaj_zmiany.match(/UP/)) {
        //Zabezpieczenie by nie zejść poniżej rozmiaru tab
        if (na_ktorym_elemencie_tablicy_dzialac != 0) {
            var wartosc_miejsca_w_ktorym_dzialam = nowa_tablica_kolejnosci_zajawek[na_ktorym_elemencie_tablicy_dzialac];
            var wartosc_przed_miejsce_w_ktorym_dzialam = nowa_tablica_kolejnosci_zajawek[na_ktorym_elemencie_tablicy_dzialac - 1];

            nowa_tablica_kolejnosci_zajawek[na_ktorym_elemencie_tablicy_dzialac] = wartosc_przed_miejsce_w_ktorym_dzialam;
            nowa_tablica_kolejnosci_zajawek[na_ktorym_elemencie_tablicy_dzialac - 1] = wartosc_miejsca_w_ktorym_dzialam;

        }
    }
    else if (rodzaj_zmiany.match(/DOWN/)) {
        //Zabezpieczenie by nie wyjść powyżej rozmiaru tab
        if (na_ktorym_elemencie_tablicy_dzialac != 2) {
            var wartosc_miejsca_w_ktorym_dzialam = nowa_tablica_kolejnosci_zajawek[na_ktorym_elemencie_tablicy_dzialac];
            var wartosc_za_miejsce_w_ktorym_dzialam = nowa_tablica_kolejnosci_zajawek[na_ktorym_elemencie_tablicy_dzialac + 1];

            nowa_tablica_kolejnosci_zajawek[na_ktorym_elemencie_tablicy_dzialac] = wartosc_za_miejsce_w_ktorym_dzialam;
            nowa_tablica_kolejnosci_zajawek[na_ktorym_elemencie_tablicy_dzialac + 1] = wartosc_miejsca_w_ktorym_dzialam;
        }
    }

    przygotuj_dane_do_generowania_zajawek(document.getElementById('ile_zajawek_form').value, nowa_tablica_kolejnosci_zajawek);
    generuj_zajawki();
    generuj_panel_ustawien_generatora_zajawek();
}

function generuj_panel_ustawien_generatora_zajawek() {

    //Generowanie podłoża pod ustawienia
    //Zabezpieczenie przed ponownym dopisanie jesli element istnieje a chce tylko coś przeładować
    if (document.getElementById("panel_generatora_zajawek").innerHTML.indexOf("prawa_strona_generatora_zajawek") == -1) {
        document.getElementById("panel_generatora_zajawek").innerHTML += "<div id='prawa_strona_generatora_zajawek'></div>";
    }
    // czyszcenie panlu ustawien dla przeładowań
    document.getElementById('prawa_strona_generatora_zajawek').innerHTML = '';

    //Ustalanie liczby zajawek
    document.getElementById("prawa_strona_generatora_zajawek").innerHTML = "<p>Ilość zajawek</p><div class='ilosc_zajawek_settings'>  <div class='generator_zajawek_little_buttons' onclick='ustal_ilosc_zajawek(\"odejmij\")'>-</div><input value='" + ilosc_zajawek + "' id='ile_zajawek_form' /></input><div class='generator_zajawek_little_buttons' onclick='ustal_ilosc_zajawek(\"dodaj\")'>+</div>  </div>";

    //Ustalanie kolejności elementów
    //Przygotowanie podstaw
    document.getElementById("prawa_strona_generatora_zajawek").innerHTML += "<div class='all_zajawki_form' id='all_zajawki_form_ustawienia' style='display:flex;flex-wrap:wrap;'></div>";
    przygotuj_dane_do_generowania_zajawek(1);
    generuj_zajawki("all_zajawki_form_ustawienia");

    //Generowanie przyciskow do ustalania kolejnosci
    var inputy_zajawki_z_ustawieniami = document.querySelector("#single_zajawka_form1_zajawki_settings").children;
    //Child 1
    inputy_zajawki_z_ustawieniami[0].outerHTML += "<div id='buttons'><div class='generator_zajawek_little_buttons' id='kolejnosc_elementu_1_UP' onclick='ustal_kolejnosc_elementow_zajawki(this.id)'>↑</div><div class='generator_zajawek_little_buttons' id='kolejnosc_elementu_1_DOWN' onclick='ustal_kolejnosc_elementow_zajawki(this.id)'>↓</div></div>";

    //Child 2
    inputy_zajawki_z_ustawieniami[2].outerHTML += "<div id='buttons'><div class='generator_zajawek_little_buttons' id='kolejnosc_elementu_2_UP' onclick='ustal_kolejnosc_elementow_zajawki(this.id)'>↑</div><div class='generator_zajawek_little_buttons' id='kolejnosc_elementu_2_DOWN' onclick='ustal_kolejnosc_elementow_zajawki(this.id)'>↓</div></div>";

    //Child 3
    inputy_zajawki_z_ustawieniami[4].outerHTML += "<div id='buttons'><div class='generator_zajawek_little_buttons' id='kolejnosc_elementu_3_UP' onclick='ustal_kolejnosc_elementow_zajawki(this.id)'>↑</div><div class='generator_zajawek_little_buttons' id='kolejnosc_elementu_3_DOWN' onclick='ustal_kolejnosc_elementow_zajawki(this.id)'>↓</div></div>";

    //Submit button
    document.querySelector("#single_zajawka_form1_zajawki_settings").innerHTML += '<input type="submit" value="Generuj Zajawki" onclick="wygeneruj_kod_zajawek()">';
}

function zbierz_zawartosc_elementow_zajawek() {


}

function generuj_zajawki_z_formularzy() {


}


// jeszcze nie działa
var oczyszczony_text;

function remove_tags() {
    text_w_zmiennej = text_do_zmiennej();

    //oczyszczony_text=text_w_zmiennej.replace(/^<[\/][a-z][0-9][\"]>$/g,"aa");


    document.getElementById('tresc_wprowadzana').value = text_w_zmiennej.replace(/<[^>]+>/g, ' ');
}


/*
=============================================
= ŚRODKOWE BUTTONY - DODAWANIE ZNACZNIKÓW   =
=============================================
*/

var znacznik_do_dopisania;
var jaki_przycisk_kliknieto;

function generuj_znacznik(id_klikniete) {

    jaki_przycisk_kliknieto = document.getElementById(id_klikniete).innerHTML;

    //@@ Określenie jaki znacznik dodać na podstawie wciśniętego przycisku @@//
    znacznik_do_dopisania = id_klikniete;
    return id_klikniete;
}

/*
=============================================
= STYLE WSTAWIANE JS					    =
=============================================
*/

function button_wduszony(id_klikniete) {

    //document.getElementById(id_klikniete).style.boxShadow = '3px 3px 3px black inset, -3px -3px 3px black inset';

}

function button_puszczony(id_klikniete) {

  //  document.getElementById(id_klikniete).style.boxShadow = '5px 8px 15px gray inset,-5px -8px 5px gray inset';
}

function zbierz_style_checboxy(id_checkboxa) {

    if (document.getElementById(id_checkboxa).checked == true) {
        zebrane_style_z_checkboxow = document.getElementById(id_checkboxa).value;

    }
    else {
        zebrane_style_z_checkboxow = zebrane_style_z_checkboxow.replace(document.getElementById(id_checkboxa).value, "");
    }



}

/*
=============================================
= DODAWANE I USUWANIE ELEMENTÓW				=
=============================================
*/

var okienko = '';
var okienko_container = '';

function wywolaj_okienko_z_ustawieniami(id) {
    var element_do_ktorego_dopisuje = document.getElementById(id);

    //--Przygotowywanie elementów--//
    //@@Okienko
    var okienko_ = document.createElement("DIV");
    okienko_.className = "single_window";
    okienko_.id = "single_window";

    var okienko_container = document.createElement("Div");
    okienko_container.id = "okienko_container";

    //@@zamykanie okienka
    var x_button = document.createElement("Div");
    x_button.innerHTML = '<div onclick="usuwanie_elementu_x_button()" id="x_button">[X]</div>';

    okienko_.appendChild(okienko_container);
    okienko_container.appendChild(x_button);

    insertAfter(okienko_, element_do_ktorego_dopisuje);
    //document.getElementById("kosnola_testowa").innerHTML=element_do_ktorego_dopisuje;

    return;
}

function odwolaj_sie_do_aktulanego_okienka() {
    okienko_container = document.getElementById('okienko_container');
    okienko = document.getElementById('single_window');

    return;
}

function dopisz_formularz(id_buttona) {
    wywolaj_okienko_z_ustawieniami(id_buttona);
    odwolaj_sie_do_aktulanego_okienka();

    var formularz = document.createElement("FORM");
    formularz.id = "formularz";
    formularz.method = "POST";

    var input_formularza_1 = document.createElement("INPUT");
    var input_formularza_2 = document.createElement("INPUT");

    // Ustawianie id i placeholder elementów formularza
        //#<IMG>
    if (id_buttona.match(/img/)) { input_formularza_1.id = "src"; input_formularza_1.placeholder = "Url"; }
    else if (id_buttona == 'a') { input_formularza_1.id = "Url"; input_formularza_1.placeholder = "Url" }
    else { input_formularza_1.id = "pierwszy_input"; }
      //#<a>
    if (id_buttona.match(/img/)) { input_formularza_2.id = "alt"; input_formularza_2.placeholder = "Alt"; }
    else if (id_buttona == 'a') { input_formularza_2.id = "Anchor"; input_formularza_2.placeholder = "Anchor" }
    else { input_formularza_2.id = "drugi_input"; }
    //#CURL
    if (id_buttona == 'curler') { input_formularza_1.id = "url"; input_formularza_1.placeholder = "Odnośnik strony do wczytania"; input_formularza_1.name="url"}

    var input_submit = document.createElement("submit");
    input_submit.id = "submit_input";
    var input_submit_txt = document.createTextNode("Dodaj");

    var nowa_linia = document.createElement("BR");

    okienko_container.appendChild(formularz);
    formularz.appendChild(input_formularza_1);

    formularz.appendChild(document.createElement('BR'));

    //Blokada przed dodawaniem więcej niż 1 form dla danego tagu/czynnosci
    if (id_buttona != 'curler') { formularz.appendChild(input_formularza_2); }

    //Dodawanie prawdziwego submita dla niektorych tagow/dzialan
    if (id_buttona == 'curler')
    {
        submit_prawdziwy=document.createElement('input');
        submit_prawdziwy.name = "Zatwierdz_formularz";
        submit_prawdziwy.value = "Zatwierdz";
        submit_prawdziwy.type = "submit";

        formularz.appendChild(submit_prawdziwy);
    }
    else
    {
        formularz.appendChild(input_submit);
    }
    input_submit.appendChild(input_submit_txt);

    //TEST

    //TEST

    document.getElementById("submit_input").onclick = zatwierdz_button_formularza;

    return zawartosc_formularza_w_okienku;
}




/*
--------------------
- USUWANIE		   -
--------------------
*/

function usuwanie_elementu_x_button() {
    var okienko = document.getElementById("single_window");
    var id_elementu_poprzedzającego = okienko.previousSibling.id;

    var element_do_usuniecia = document.getElementById('single_window');
    var element_z_ktorego_usuwam = document.getElementById(id_elementu_poprzedzającego).parentNode;

    element_z_ktorego_usuwam.removeChild(element_do_usuniecia);
    wstaw_tag_dla_interakcji_z_okienkiem(znacznik_do_dopisania, '','');
}

/*
--------------------
- SUBMIT		   -
--------------------
*/

var zawartosc_formularza_w_okienku = "";

function zatwierdz_button_formularza() {
    var odwolanie_do_formularza_firstelement = document.getElementById('formularz').firstElementChild;
    var odwolanie_do_formularza_secondelement=document.getElementById('formularz').firstElementChild.nextSibling;
    //----------------Usuwanie tak jak dla X button----------------//
    var okienko = document.getElementById("single_window");
    var id_elementu_poprzedzającego = okienko.previousSibling.id;

    var element_do_usuniecia = document.getElementById('single_window');
    var element_z_ktorego_usuwam = document.getElementById(id_elementu_poprzedzającego).parentNode;

    element_z_ktorego_usuwam.removeChild(element_do_usuniecia);
    //----------------Usuwanie tak jak dla X button----------------//
    pierwszy_input_formularza = odwolanie_do_formularza_firstelement.value;
    drugi_input_formularza='asd';
    wstaw_tag_dla_interakcji_z_okienkiem(znacznik_do_dopisania, pierwszy_input_formularza, drugi_input_formularza);
}

/*
=============================================
= DODATKOWE FUNKCJE						    =
=============================================
*/

// Funkcja do wstawiania elementu ZA innym elementem
function insertAfter(co, gdzie) {
    gdzie.parentNode.insertBefore(co, gdzie.nextSibling);

    return;
}

function odswiez_podglad() {
    var tekst_do_odswiezenia = text_do_zmiennej();

    //Sklejanie całości

    zwracany_tekst_po_sklejeniu = sklej_zmodyfikowany_tekst(tekst_do_odswiezenia);

    //Wyświetlanie zmodyfikowanego tekstu
    wyswietl_zmodyfikowany_tekst(zwracany_tekst_po_sklejeniu);
}
