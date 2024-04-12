class Gallery {
    galleryDiv;
    images;
    modalImg;
    galleryModalDiv;
    imgFrameDiv;

    constructor() {
        this.galleryDiv = document.querySelector("#gallery");
        this.galleryModalDiv = document.querySelector("#gallery-modal");
        this.modalImg = document.querySelector("#modal-img");
        this.imgFrameDiv = document.querySelector("#img-frame");
        this.images = ["car.png", "cargo-ship.png", "cheese.png", "flower.png",
            "phone.png", "plane.png", "tree.png", "ux.png", "lake.jpg"];

        this.showImages();
    }

    showImages() {
        for (const fileName of this.images) {
            const img = document.createElement("img");
            img.src = `kepek/${fileName}`;

            const div = document.createElement("div");
            div.appendChild(img);
            div.classList.add("gallery-img");
            this.galleryDiv.appendChild(div);

            this.showImageModal(img);
        }
    }

    showImageModal(img) {
        img.addEventListener("click", () => {
            this.modalImg.src = img.src;
            this.galleryModalDiv.classList.remove("display-none");

            const newImg = new Image();

            newImg.onload = () => {
                const height = newImg.height;
                const width = newImg.width;
                this.imgFrameDiv.style.maxWidth = width + "px";
                this.imgFrameDiv.style.maxHeight = height + "px;;"
            }

            newImg.src = img.src;
        });
    }
}

/*
Mi történik itt
-> 
ez a metódus vár egy img-t, amit majd megkap mivel meghívjuk a showImages-ben, ennek az img-nek az src-je ugyanaz az lesz, mint a képnek 
amire rákattintottunk, ezért jelenik meg
galleryModalDiv-et ugy jelenítjük meg, hogyha rákattintunk ugyre a képre, akkor a gallery-modal-on rajta van egy display-none class, ami 
csak annyit tesz, hogy ne jelenjen meg, de ezt itt levesszük róla a classList.remove-val, tehát meg fog jelenni az a css beállítás alapján, amit 
adtunk neki 
Ez newImg-es valami meg annyit tesz, hogyha a kép betöltödött, akkor max akkora legyen, mint ugye a képnek a felobontása 
const height = newImg.height;
const width = newImg.width;
Ezekkel megkapja a kép alap magasságát illetve szélességét, amit lementünk a width és a height változóban, majd csináltunk egy div-et 
amiben van a kép és annak pedig itt style-val megadjuk a max magasságot, tehát amit megszereztünk az onLoad-val és ugyanigy a szélességet is 
csak annyi, hogy itt amit kapunk a newImg.height-ra az egy szám csak, ezért kell majd odaírni, hogy "px"!!!!
végén meg csak megadjuk a newImg-nek a src-jének a img.src-t 

így néz ki most a html szerkezet
-> 
    <div class="container">
        <div class="gallery-modal display-none" id="gallery-modal">
            <div class="img-frame" id="img-frame">
                <div class="close" id="close"></div>
                <div class="arrow prev" id="prev"></div>
                <div class="arrow next" id="next"></div>

                <img id="modal-img" src="kepek/car.png">
            </div>
        </div>

        <div class="gallery-grid" id="gallery">

        </div>
    </div>

A showImages() esetében, ami itt van alul a <div class="gallery-grid" id="gallery">
ezt lementettük, ez egy grid szerkezet és ebbe raktuk bele úgy a képeket, hogy végigmentünk az images tömbbön, ami tartalmazta a 
fileneveket és mindegyik képnek csináltunk egy img tag-et és annak megadtuk az adott src-t éppen, ahol járt a loop 
meg persze img-nek is van egy div-je, amit ugyanugy minden loopnál beletesszük ezt az img-t ebbe a div-be, legvégén pedig 
belerakjuk a galleryDiv-ben amit itt lementettünk, tehát ide -> <div class="gallery-grid" id="gallery">
tehát megy a loop a images-re, első elem car.png csinálunk egy img-t ennek megadjuk az src-jének a car.png-t belerakjuk egy div-be 
jön a második elem, mondjuk a cargo-ship ennek is csinálunk egy img-t 

Így fogja ezeket legyártani a <div class="gallery-grid" id="gallery">-ben
mintha ezt csináltuk volna html-ben de ez így sokkal könnyebb, mert itt lehetne rengeteg elem is nem csak 8 
    <div class="gallery-img">
        <img src="kepek/car.png">
    </div>
    <div class="gallery-img">
        <img src="kepek/cargo-ship.png">
    </div>
stb.........
Itt oldalt lementettünk egy prev.png, next.png-t meg egy close.png-t )ezek ilyen arrow-ok jobbra és balra meg egy bezárás 
Ezeknek adtunk mindegyiknek egy id-t és az alapján lementjük őket 
class Gallery {
    többi dolog
    nextDiv;
    prevDiv;
    closeDiv;
    imgIndex;

    constructor() {
        többi dolog
        this.nextDiv = document.querySelector("#next");
        this.prevDiv = document.querySelector("#prev");
        this.closeDiv = document.querySelector("#close");
        this.imgindex = 0;
    }

    csinálunk egy prev meg a next-re is egy metódust 
    next() {
        this.nextDiv.addEventListener("click", ()=> {
            this.imgIndex++;
        });
    }

    prev() {
        this.prevDiv.addEventListener("click", ()=> {
            this.imgIndex--;
        });
    }
}

Mivel, hogy váltogatni akarjuk a képeket ezért szükségünk lesz egy számlálóra, ami megmondja, hogy hányadik képnél tartunk
ez lesz az imgIndex, amit fent le is mentünk meg értéket adunk neki, ott fog indulni, hogy ennek az értéke nulla lesz -> this.imgindex = 0;
a next-nél azt mondjuk az imgIndex-re, hogy ++ és a prev-nél meg azt, hogy -- -> this.imgIndex++;

Van nekünk ez a modal-img-s -> <img id="modal-img" src="kepek/car.png">
és ez alapból nem jelenik meg, hanem ha rákattintunk egy képre, akkor ő a képnek az src-jét leszedi, ez van a showModalImage-ben
fogja az img-t arra rak egy eventListener-t az összesre!!
leszedi az src-jét és a modalImg-nek meg megadja!!!!
showImageModal(img) {
    img.addEventListener("click", ()=> {
        this.modalImg.src = img.src;

Így jelenik meg az a kép, amire konkrétan rákattintottunk 
az onLoad-val meg azt is meg lehet szerezni, hogy milyen széles meg milyen magas a kép, ami olyan szempontból jó, hogy olyan 
szélességű és magasságú kép fog nekünk itt előjönni, ami biztosan kifér illetve nem biztosan, mert ha 4k-s képernyőnk van meg full hd 
kijelző, akkor megint egy probléma adódik, de innentől kezdve már ezt is lehet kezelni, mert meg tudjuk nézni, hogy mekkora a screen-nek 
a width-je és azt mondjuk, hogyha ennél nagyobb, akkor maximum a screen width-nek meg height-nak a 80%-a 
-> elmagyarazas.js
    next() {
        this.nextDiv.addEventListener("click", ()=> {
            this.imgIndex++;

            this.modalImg.src = `kepek${this.images[imgIndex]}`
        });
    }

ezzel majd egy hiba lesz, hogy this.images[imgIndex];
Most azzal ne törödjünk, hogy egy idő után kifogyunk az indexekből és majd újra kell kezdeni a nullával 
Rákktintunk a az első képre és szépen lehet menni előre, de viszont rákattintunk a harmadik képre és onnan szeretnénk továbbmenni akkor 
második kép jön utána a harmadik 
Miért 
-> 
Az a probléma, hogy amikor rákattintunk a képre, akkor nekünk alapból nulla ez az imgIndex-ünk és mindig a nulladiktól fogja kezdeni!!!!!!
tehát emiatt -> this.imgindex = 0;
De amikor rákattintunk a harmadik képre akkor nekünk nem nullától hanem 2-től kéne kezdenünk!!!!!!!!!!!!!!
Ezért fontos, hogy melyik képre kattintottunk rá, mert aszerint kell beállítani az index-et!!!

és ezt úgy tudjuk megtenni, hogy van nekünk a showImages()
    showImages() {
        for(const fileName of this.images){
            const img = document.createElement("img");
            img.src = `kepek/${fileName}`;

Amit mi egy for-of-val oldottunk meg, itt lehet, hogy jobb lenne a másik for-t használni
a fileName-re meg azt mondani, hogy az this.images[i]-dik
->
showImages() {
    for(let i = 0; i < this.images.length; i++){
        const fileName = this.images[i];
        const img = document.createElement("img");
        img.src = `kepek/${fileName}`;
        stb..

        this.showImageModal(img, i);
    }
}
Ez azért jó, mert van nekünk egy i-nk, ami az adott képnek az index-e!!!!!!!!!!!!!!!!
és ezt fogjuk átadni paraméterként a showImagesModal-nek!!!! meghívásnál -> this.showImageModal(img, i);
itt meg azt fogjuk mondani, hogy az imgIndex ez az index lesz!!!!!!! -> this.imgIndex = index;
showImageModal(img, index) {
    img.addEventListener("click", ()=> {
        this.modalImg.src = img.src;
        this.galleryModalDiv.classList.remove("display-none");
        this.imgIndex = index;
        console.log(index);
        stb...
    });
}
console.log(index);
Innentől kezdve ha rákattintunk a képre, akkor láthatóvá válik az, hogy hányadik indexen van 
Rákattintunk a harmadik képre, akkor console.log(index) -> 2
*********************************
Visszatérünk ide 
-> 
next() {
    this.nextDiv.addEventListener("click", ()=> {
        this.imgIndex++;

        this.modalImg.src = `kepek${this.images[imgIndex]}`
    });
}
Az imgIndexnél meg kell nézni, hogy csak akkor fogunk továbbmenni 
Tehát ha nincsen több kép akkor ne menjen tovább, hanem mondjuk kezdje el a nullás indexűtől újra

Ha a ingIndex az kisebb, mint a images.length akkor fogjuk ezt megjeleníteni
->
this.modalImg.src = `kepek${this.images[imgIndex]}

if(this.imgIndex < this.images.length)
    this.modalImg.src = `kepek${this.images[imgIndex]}

és utána meg beállítjuk az imgIndex-et nulláról és így akkor körbe megyünk 
else {
    this.imgIndex = 0;
    this.modal.src = `kepek/${this.images[this.imgIndex]}`;
}
Itt arról van szó ha eléri az image.length-et, utána már azért nem jó, mert olyan indexű már nincsen 
és az else ágban lenullázuk az imgIndex-et!!!! 
és akkor a nulladikat jelenítjük meg és úgy megyünk addig amig nem éri el az images.length-et, utána meg megint nulláról indulunk 

Átmegyünk a prev()-re, ez nagyon hasonló lesz csak itt azt szeretnénk, hogy akkor ne menjen tovább ha nullánál kisebb lesz az index és akkor 
ott ugorjon vissza az utolsó képre 

prev() {
    this.prevDiv.addEventListener("click", ()=> {
        this.imgIndex--;

        if(this.imgIndex >= 0) 
            this.modalImg.src = `kepek/${this.images[this.imgIndex]}`;
        else {
            this.imgIndex = this.images.length - 1;
            this.modalImg.src = `kepek/${this.images[this.imgIndex]}`;
        }

    });
}

Ha kész van, akkor tudjuk ezeket a metódusokat regisztrálni, meghívni őket a constructor-ban 

class Gallery {
    többi dolog
    nextDiv;
    prevDiv;
    closeDiv;
    imgIndex;

    constructor() {
        többi dolog
        this.nextDiv = document.querySelector("#next");
        this.prevDiv = document.querySelector("#prev");
        this.closeDiv = document.querySelector("#close");
        this.imgindex = 0;

        this.images = ["car.png", "cargo-ship.png", "chese,png", "flower.png", "phone.png", "plane.png",
        "tree.png", "ux.png", "lake.jpg"];

        this.showImages();
        this.next();
        this.prev();
    }


Ez a betöltéses dolog azért nem jó ilyen formában, mert ha rákattintunk akkor betölti, akkor jelen esetben ezt nem a képre rakja rá 
hanem az img-frame-s div-re 
tehát erre 
-> 
<div class="img-frame" id="img-frame" style:"max-width: 1200px; meax-height: 600px;"></div>
és nem erre 
-> 
<img id="modal-img" src="valami.jpg">

Tehát az image-frame-re rakja rá és akkor ha betölt az első kép az 1200*600-as lesz de viszont az összes többi kép is akkara 
Mi meg azt szeretnénk, hogy mindegyik kép akkora legyen, amilyen alapból és nem amilyen alapból az első!!!!

Minden eggyes képváltásnál ezt az onLoad-ot meg kellene csinálnunk 

erre csinálunk egy föggvény adjustImgSize 
-> 
adjustImgSize(src) {
        const newImg = new Image();

        newImg.onload = ()=> {
            const height = newImg.height;
            const width = newImg.width;
            this.imgFrameDiv.style.maxWidth = width + "px";
            this.imgFrameDiv.style.maxHeight = height + "px;;"
        }

         newImg.src = src;
}
és akkor ez a dolog nem kell nekünk a showImageModal-ban ahol eddig volt eredetileg, hanem, majd ott meghívjuk 
és megadjuk neki az img.src-t 
most így néz ki a showImageModal(img, src) {
    img.addEventListener("click", ()=> {
        this.modalImg.src = img.src;
        this.galleryModalDiv.classList.remove("display-none");
        this.imgIndex = index;

        this.adjustImgSize(img.src);
    });
}

Elvileg ugyanannak kell végbemennie, mert csak kiraktuk egy metódusba 
És ezt a dolgot mindenhol meg kell hívnunk, ahol a képnek a betöltése megtörténik!!!!!
Tehát nem csak a showImageModal()-ban, hanem a prev() illetve a next()-ben is!!!!!!
next() {
    this.nextDiv.addEventListener("click", ()=> {
        this.imgIndex++;

        if(this.imgIndex < this.images.length)
            this.modalImg.src = `kepek/${this.images[this.imgIndex]}`;
        else {
            this.imgIndex = 0;
            this.modalImg.src = `kepek/${this.images[this.imgIndex]}`;
        }

        this.adjustImgSize()
    });
}

viszont itt meg az a baj, hogy mit adjunk meg az adjustImgSize()-nak paraméterként, mert az vár egy src-t 
ezért van értelme egy src változót csinálni 
const src = `kepek/${this.images[this.imgIndex]}`;

next() {
    this.nextDiv.addEventListener("click", ()=> {
        this.imgIndex++;
        let src = `kepek/${this.images[this.img]}`;

        if(this.imgIndex < this.images.length){
            this.modalImg.src = src;
        } else {
            this.imgIndex = 0;
            this.modalImg.src = `kepek/${this.images[this.imgIndex]};
        }

        this.adjustImgSize(src);
    });
}
Mindenhol ennek az src változónak az értékét fogja megkapni!!!!!!!!!!!!!!!!
Az elsőnél az src változó értékét kell, hogy megkapja a másodikban viszont nem!!!!
Mert akkor rakja össze az src-t változót let src = `kepek/${this.images[this.img]}`;
Tehát az elsőnél jó 
->
    if(this.imgIndex < this.images.length){
        this.modalImg.src = src;
de viszont ha másodikban is ezt írnánk, akkor az lenne a probléma 
itt az else-ben nem ez lenne 
-> 
this.imgIndex = 0;
this.modalImg.src = `kepek/${this.images[this.imgIndex]};
hanem 
->
this.imgIndex = 0;
this.modalImg.src = src;
Akkor itt az lenne a probléma, hogy a korábbi index alapján határozza meg ezt az értéket és olyan kép nem lesz 
pedig itt a nulladik alapján kell, hogy meghatározza 
Tehát a végén az a konkluzió, hogy az elsőben lehet azt írni, hogy this.modalImg = src;
a másodikban is lehet azt írni, csak ott felül kell definiálni az új index-vel a nullával!!!
next() {
    this.nextDiv.addEventListener("click", ()=> {
        this.imgIndex++;
        let src = `kepek/${this.images[this.imgIndex]}`;

        if(this.imgIndex < this.images.length) {
            this.modalImg.src = src;
        } else {
           this.imgIndex = 0;
           let src = `kepek/${this.images[this.imgIndex]}`;
           this.modalImg.src = src;
        }

        this.adjustImgSize(src);
    })
}

Itt is hasonlóképpen kell megoldanunk a dolgot a prev()-nél 
prev() {
    prevDiv.addEventListener("click", ()=> {
        this.imgIndex--;
        let src = `kepek/${this.images[this.imgIndex]}`;

        if(this.imgIndex >= 0) {
            this.modalImg.src = src;
        } else {
            this.imgIndex = this.images.length - 1;
            src = `kepek/${this.images[this.imgIndex]}`;
            this.modalImg.src = src;
        }

        this.adjustImgSize(src);
    });
}
és akkor itt visszafele váltunk akkor változik a style
első képnél
-> 
<div class="img-frame" id="img-frame" style:"max-width: 1200px; max-height: 600px;"></div>
második képnél 
->
<div class="img-frame" id="img-frame" style:"max-width: 500px; max-height: 500px;"></div>
*******************************************************************************************************
Következő dolog, hogy amikor rákattintunk az x-re, be kellene zárni
closeDiv-et mentettük le erre 
close() {
    this.closeDiv.addEventListener("click", ()=> {
        this.galleryModalDiv.classList.add("display-none");
    });
}
és ezt is meghívjuk a constructor-ban 
this.close();
*********************************************************************************************************************************
Hogyan lehet nyilakkal írányítani ezt a dolgot, ha rányomunk a jobbra nyílra, akkor jobbra menjen, ha pedig a balra nyílra, akkor balra
erre csinálunk egy nextArrow függvényt 
nextArrow() {
    window.addEventListener("keydown", (e)=> {
        const keyCode = e.which|e.keyCode;
        console.log(keyCode);
    });
}
A window-ra csináltunk egy addEventListener-t, ebben van egy keydown vagy egy keyup, ezt azt jelenti, hogy lenyomunk egy billentyűt és utána 
felengedjük 
ilyenkor keletkezik nekünk egy keyCode
->
megmondja nekünk, hogy melyik billentyűt nyomtuk le, pl. az enter-nek 13-as a kódja 
akkor ha regisztráljuk ezt a metódust, meghívjuk a constructor-ban a this.nextArrow()-t 
console.log(keyCode);
Ha lenyomjuk a balra gombot, akkor erre visszakapunk annyit, hogy -> 37
ha meg a jobbra gombot nyomjuk le, akkor meg -> 39

Csinálunk egy if-et, és ha ez a keyCode amit visszakapunk az 39 lesz, tehát a jobb gomb, akkor meghívjuk a next()-et 
ha meg a bal, tehát 37, akkor meg meghívjuk a prev()-et 

if(keyCode === 39) {
    this.next();
} else if(keyCode === 37) {
    this.prev();
}

ez így nem jó, mert az kell amit benne van az eventListener-ben 
tehát csinálunk egy nextImg metódust, amiben csak az lesz ami a next() eventListner-jében volt 
és akkor ezt a nextImg-t hívjuk meg akkor is mikor a gomb-val szeretnénk váltani, meg akkor is amikor a billentyűzettel 
-> 
nextImg() {
    this.imgIndex++;
    let src = `kepek/${this.images[this.imgIndex]}`;

    if(this.imgindex < this.images.length) {
        this.modalImg.src = src;
    } else {
        this.imgIndex = 0;
        src = `kepek/${this.images[this.imgIndex]}`;
        this.modalImg.src = src;
    }

    this.adjustImgSize(src);
}

next() {
    nextDiv.addEventListener("click", ()=> {
        this.nextImg;
    });
}
nextArrow() {
    window.addEventListener("keyup", (e)=> {
        const keyCode = e.keyCode|e.which;

        if(keyCode === 39) {
            this.nextImg();
        }
    })
}

Mert itt mi most csak az eseménykezelőt regisztráljuk és ami nekünk fontos az az a rész, ami benne van a nextImg()-ben,
hogy váltsunk!!!!!!!

ugyanígy ennek megfelelően lesz egy prevImg() is 
prevImg() {
    this.imgIndex--;
    let src = `kepek/${this.images[this.imgIndex]}`;

    if(this.imgIndex <= 0) {
        this.modalImg.src = src;
    } else {
        this.imgIndex = this.images.length - 1;
        src = `kepek/${this.images[this.imgIndex]}`;
        this.modalImg.src = src;
    }

    this.adjustImageSize(src);
}

prev() {
    prevDiv.addEventListener("click", ()=> {
        this.prevImg();
    });
}
nextArrow() {
    window.addEventListener("keydown", (e)=> {
        cosnt keyCode = e.which|e.keyCode;

        if(keyCode === 39) {
            this.nextImg();
        } else if(keyCode === 37) {
            this.prevImg();
        }
    });
}
*****************************************************************************************************************************
Amit még nem csináltunk meg hogy kéne valami, ami jelzi, hogy hányadik képnél tartunk 
mondjuk így 1/10 utána 2/10
ezt ide a arrow next alá megcsináljuk a html szerkezetben 
<div class="close"></div>
<div class="arrow prev"></div>
<div class="arrow next"></div>
<div id="img-counter"></div>
megformáztuk css-ben 
#img-counter {
    width: 80px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.517);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 15px;
    margin: auto;
    border-radius: 10px;
}
lementjük ezt a img-counter-t cosntructor-ban 
this.imgCounterDiv = document.querySelector("#img-counter");

Itt az lesz a lényeg, hogy amikor váltunk meg amikor alapból megjelenítjük a képeta showImageModal-nál 
this.imgCounter.innerText = `${index + 1}/${this.images.length}`;

showImageModal(img, index) {
    img.addEventListener("click", ()=> {
        this.modalImg.src = img.src;
        this.galleryModalDiv.classList.remove("display-none");
        this.imgIndex = index;
        this.adjustImgSize(img.src);

        this.imgCounterDiv.innerText = `${index + 1}/${this.images.length}`;
    })
} 

ha most rákkatintunk a képre akkor látszani fog, hogy melyik pl. 4. kép aakkor 4/9 
de ez még váltáskor nem fog megváltozni, szóval hogyha az arrow-kal megyünk, akkor nem fog ez változni ezért csinákunk egy metódust rá!!!
fontos, hogy a függvényben az index nem az index lesz hanem a imgIndex!!!!!!!!!!!!!!!!!!!!!!

showImageNumber() {
    this.imgCounterDiv.innerText = `${this.imgIndex + 1}/${this.images.length}`;
}
és akkor ezt hívjuk meg a showImageModal-ban!!!!
-> 
showImageModal(img, index) {
    img.addEventListener("click", ()=> {
        this.modalImg.src = img.src;
        this.galleryModalDiv.classList.remove("display-none");
        this.imgIndex = index;
        this.adjustImgSize(img.src);

        this.showImageNumber();
    })
} 
és ezt meghívjuk még a prevImg és a nextImg-ben is 
prevImg() {
    this.imgIndex--;
    let src = `kepek/${this.images[this.imgIndex]}`;

    if(this.imgIndex <= 0) {
        this.modalImg.src = src;
    } else {
        this.imgIndex = this.images.length - 1;
        src = `kepek/${this.images[this.imgIndex]}`;
        this.modalImg.src = src;
    }

    this.adjustImageSize(src);
    this.showImageNumber();
}

nextImg() {
    this.imgIndex++;
    let src = `kepek/${this.images[this.imgIndex]}`;

    if(this.imgindex < this.images.length) {
        this.modalImg.src = src;
    } else {
        this.imgIndex = 0;
        src = `kepek/${this.images[this.imgIndex]}`;
        this.modalImg.src = src;
    }

    this.adjustImgSize(src);
    this.showImageNumber();
}
**********************************************************************************************************
Az adjustImgSize-ban a képnek a szélességét és a magasságát tudjuk meghatározni a kép metaadatai alapján
A fájloknál is létezik ilyen
Vannak különböző fájlformátumok mint pl. a png, mp3, mindenféle ilyen audio meg video, képformátumok 
Ezek a fájlok ezek nem csak a bináris adatokat tartalmazzák a megfelelő kódolásban 
Hanem az első pár bájt azt fogja megmondani, hogy milyen formátumú adatról van szó, azért, hogy az operációs rendszer meg a különböző 
videolejátszok, zenelejátszok, képmegjelenítők tudják, hogy milyen módon kezeljék a dolgot 

Mert egy png-t nem biztos, hogy úgy kell megjeleníteni, mint egy másik fájlt, merthogy másképpen vannak az információk 
Metaadatok ezt írják le, hogy pontosan mi a formátum de ilyen dolgok is meg vannak a metaadatokban, mint a képnek a szélessége és 
magassága!!!!!!!!
MIME type, ebben van leírva, hogy milyen formátumok léteznek, képek, hang, video ilyesmi 
*************************************************************************
window.addEventListener("keydown", (e)=> {
    const keyCode = e.which|e.keyCode|e.key

    if(keyCode === 39) {
        this.nextImg();
    } else if(keyCode === 37) {
        this.prevImg();
    }
})
Miért van a | ebben keyCode-ban 
e.which|e.keyCode;
Van ez az event objektumunk és a which megadja, hogy mi az adott lenyomott billentyűnek a kódja 
a keyCode ugyanezt teszi, de mindegy, hogy melyik böngészőben melyik müködik 
Van olyan böngésző ahol a which, van olyan böngésző, ahol a keyCode 
És azért van ez a | 
->
mert ha van which akkor az fog lefutni, viszont ha nincs akkor a vagy jel (|) után megyünk tovább és akkor valamilyen formában biztos, 
hogy megkapjuk ezt a keyCode-ot 

e.key
De van olyan, hogy e.key, az e.which és az a e.keyCode-ra azt írja, hogy depricated, szóval már nem ez van használva az 
újabb verziókban
***********************************************************
Azért kell a position: absolute, mert akkor nem lesz rajt, hanem mondjuk felette lesz vagy alatta, attól függően, hogy hol van a flow-ban
*/
class Gallery {
    galleryDiv;
    images;
    modalImg;
    galleryModalDiv;
    imgFrameDiv;
    nextDiv;
    prevDiv;
    closeDiv;
    imgIndex;
    imgCounterDiv;

    constructor() {
        this.galleryDiv = document.querySelector("#gallery");
        this.galleryModalDiv = document.querySelector("#gallery-modal");
        this.modalImg = document.querySelector("#modal-img");
        this.imgFrameDiv = document.querySelector("#img-frame");
        this.nextDiv = document.querySelector("#next");
        this.prevDiv = document.querySelector("#prev");
        this.closeDiv = document.querySelector("#close");
        this.imgCounterDiv = document.querySelector("#img-counter");
        this.imgIndex = 0;

        this.images = ["car.png", "cargo-ship.png", "cheese.png", "flower.png",
            "phone.png", "plane.png", "tree.png", "lake.jpg"];

        this.showImages();
        this.next();
        this.prev();
        this.close();
        this.arrowShift();
    }

    showImages() {
        for (let i = 0; i < this.images.length; i++) {
            const fileName = this.images[i];
            const img = document.querySelector("img");
            img.src = `kepek/${fileName}`;

            const div = document.querySelector("div");
            div.appendChild(img);
            div.classList.add("gallery-img");
            this.galleryDiv.appendChild(div);

            this.showImageModal(img, i);
        }
    }

    //ezzel csináljuk meg azt, hogy max ugyanakkora legyen a kép magassága meg szélessége, mint alapból metaadatokban van
    adjustImgSize(src) {
        const newImg = new Image();

        newImg.onload = () => {
            const height = newImg.height;
            const width = newImg.weight;
            this.imgFrameDiv.style.maxWidth = width + "px";
            this.imgFrameDiv.style.maxHeight = height + "px";
        }

        newImg.src = src;
    }

    //ezzel jelenítjük meg a képet, mármint a nagyobbat
    showImageModal(img, index) {
        img.addEventListener("click", () => {
            this.modalImg.src = img.src;
            this.galleryModalDiv.classList.add("display-none");
            this.imgIndex = index;
            this.adjustImgSize(img.src);

            this.showImageNumber();
        });
    }

    /*
    lapozásnál, ez azért kell egy külön metódusban, mert majd több helyen is meg kell adni, akkor is ha csak megjelenítjük a képet a 
    showImageModal-val, meg akkor is amikor lapozunk vagy az arrow-val vagy a billentyűkkel
    */
    showImageNumber() {
        this.imgCounterDiv.innerText = `${this.imgIndex + 1}/${this.images.length}`;
    }

    //itt állítjuk be az src-t meg növeljük a imgIndex-et, lapozunk 
    nextImg() {
        this.imgIndex++;
        let src = `kepek/${this.images[this.imgIndex]}`;
        //növeljük az imgIndex-et, akkor és ezt megadtuk a images-nek az index-eként 

        //kitételek 
        if (this.imgIndex < this.images.length) {
            this.modalImg.src = src; //megadjuk a modalImg.src-jének azt ami változóban, megjelenítjük az adott képet index alapján 
        } else {
            this.imgIndex = 0; //újra kell kezdeni a számolást, mert nem lesz olyan indexű kép a images-ben mint a imgIndex, ahol jár
            src = `kepek/${this.images[this.imgIndex]}`;//megadtuk a nullás indexet és akkor előlről kezdi 
            this.modalImg.src = src;//megjelenítjük a képet 
        }
        
        this.adjustImgSize(src);
        this.showImageNumber();
    }

    prevImg() {
        this.imgIndex--;
        let src = `kepek/${this.images[this.imgIndex]}`;

        if(this.imgIndex >= 0) {
            this.modalImg.src = src;
        } else {
            this.imgIndex = this.iamges.length - 1;
            src = `kepek/${this.images[this.imgIndex]}`;
            this.modalImg.src = src;
        }

        this.adjustImgSize();
        this.showImageNumber();
    }
    //ezt azért csináltuk egy külön metódusban, mert kétszer kell majd használni, meghívni!!!
    next() {
        this.nextDiv.addEventListener("click", ()=> {
            this.nextImg();
        });
    }
    prev() {
        this.prevDiv.addEventListener("click", ()=> {
            this.prevImg();
        });
    }

    close() {
        this.galleryModalDiv.classList.add("display-none");
    }

    arrowShift() {
        window.addEventListener("keydown", ()=> {
            const keyCode = e.which|e.keyCode|e.key;

            if(keyCode === 39) {
                this.nextImg();
            } else if(keyCode === 37) {
                this.prevImg();
            }
        });
    }
}
