let mainBlock = document.getElementById("mainBlock");
let searchPanel = document.getElementById("searchPanel");
let inpt = document.getElementById("inpt");
let rangeValue = document.getElementById("rangeValue");
let All = document.getElementById("All");
let Ikea = document.getElementById("Ikea");
let Marcos = document.getElementById("Marcos");
let Caressa = document.getElementById("Caressa");
let Liddy = document.getElementById("Liddy");
let cartIcon = document.getElementById("cartIcon");
let cartOn = document.getElementById("cartOn");
let alternativeDiv = document.getElementById("alternativeDiv");
let lightblueSpan = document.getElementById("lightblueSpan");
let checkout = document.getElementById("checkout");
let close = document.getElementById("close");


let imgArr = [];
let iconArr = [];
let titleArr = [];
let priceArr = [];
let leftIconArr = [];
let rightIconArr = [];
let benjiArr = [];

let indx = 0;
let i = 1;


for(i;i<13;i++){
    imgArr[indx] = document.getElementById(`photos${i}`);
    iconArr[indx] = document.getElementById(`shouldHover${i}`);
    titleArr[indx] = document.getElementById(`detTitle${i}`);
    priceArr[indx] = document.getElementById(`detPrice${i}`);
    leftIconArr[indx] = document.getElementById(`leftIcon${i}`);
    rightIconArr[indx] = document.getElementById(`rightIcon${i}`);
    benjiArr[indx] = document.getElementById(`benjamin${i}`);
    indx++;
}


let sorting = () => {

    for(let benji of benjiArr){

        rangeValue.innerText = "Value: $" + inpt.value;

        let trimmedVal = rangeValue.innerText.slice(8);

        if(trimmedVal <
        parseInt(benji.getAttribute('data-value')) )

        {
            benji.style.display="none";
        }

        else{
            benji.style.display = "block";
        }

    }  
}


let interval = -1;

inpt.addEventListener("mousedown", function(){
    if(interval !== -1)
        clearInterval(interval);
        interval = setInterval(sorting, 1);
});

inpt.addEventListener("mouseup",function(){
    if(interval !== -1)
        clearInterval(interval);
});


let cartItems = 0;

let cartAnimation = () =>{
    
    cartOn.style.opacity="1";
    cartOn.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
    cartIcon.style.opacity="0";
    
    let containerDiv = document.getElementById("containerDiv");
    
    document.body.style.top = '0';
    document.body.style.left = '0';
    document.body.style.backgroundColor = "lightgray";
    alternativeDiv.className = "lightgrayDiv";
    alternativeDiv.style.transition = "ease-in-out 0.8s";
    document.body.style.transition = "ease-in-out 0.8s";
    containerDiv.style.opacity = "0.3";
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    cartOn.style.position = "relative";
    cartOn.style.zIndex = "9999";
    cartOn.style.background = "white";
    document.body.style.position = "relative";
    document.body.style.zIndex = '9998';

    cartOn.style.position = 'fixed';
    cartOn.style.top = '0';
    cartOn.style.height = '100vh';
}

cartIcon.addEventListener("click",cartAnimation);


let initialPosition = 10;
let isFollowing = false;

document.addEventListener('scroll', function() {
let scrollPosition = window.scrollY;

if (scrollPosition > initialPosition && !isFollowing) {
    isFollowing = true;
    cartOn.style.position = 'fixed';
    cartOn.style.top = '0';
    cartOn.style.height = '100vh';
} 

});


close.addEventListener("click",()=>{
    cartOn.style.opacity="0";
    document.body.style.backgroundColor = "white";
    alternativeDiv.className = "lightblueDiv";
    containerDiv.style.opacity = "1";
    cartIcon.style.opacity = "1";
})


let countingDollars = 0;

for(let j = 0;j<imgArr.length;j++){

    leftIconArr[j].addEventListener("click",()=>{

        window.history.pushState(null, null, window.location.href);
            window.onpopstate = function () {
            window.history.go(0);
        };  
    
        
        let imgLink = imgArr[j].alt;
        
        
        searchPanel.innerHTML = 
        `<img src=\"${imgLink}\" width=\"569px\" height=\"400px\">`;

        let newDiv = document.createElement("div");
        let hTag = document.createElement("h1");
        let priceDiv = document.createElement("p");

        let divTxt = document.createTextNode("Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge");
        let hTxt = document.createTextNode(`${titleArr[j].innerText}`);
        let priceTxt = document.createTextNode(`${priceArr[j].innerText}`);

        hTag.appendChild(hTxt);
        priceDiv.appendChild(priceTxt);
        newDiv.appendChild(hTag);
        newDiv.appendChild(priceDiv);
        newDiv.appendChild(divTxt);
        mainBlock.className="newDiv";
        mainBlock.innerHTML = newDiv.innerHTML;
        lightblueSpan.innerText = "Home / "+titleArr[j].innerText;
        
    })

    rightIconArr[j].addEventListener("click", ()=>{

    
        if(cartItems>9){
            cartAnimation();
        }

        else{
            cartItems++;

            let purchaseInfo = document.getElementById("purchaseInfo");

       
            let totalPrice = document.getElementById("totalPrice");
            let priceVariable = priceArr[j].innerText.slice(1);
           
    
            countingDollars += parseFloat(priceVariable);
            totalPrice.innerHTML = "Total "+countingDollars.toFixed(2)+"$";
            
          
            let photoCart = imgArr[j].alt
            let purchaseDiv = document.createElement("div");
            let purchaseTitle = document.createTextNode(`${titleArr[j].innerText}`);
            
        
            let photoSpan = document.createElement("span");
            let clearSpan = document.createElement("span");

            photoSpan.innerHTML = `<img src=\"${photoCart}\" width=\"100px\" height=\"54px\">`;

            clearSpan.innerHTML = 
            `<img src=\"images/recycleBin.png\" width=\"30px\" height=\"30px\">`;

            
            purchaseDiv.appendChild(photoSpan);
            purchaseDiv.appendChild(purchaseTitle);
            purchaseDiv.appendChild(clearSpan);

            purchaseDiv.style.display="flex";
            purchaseDiv.style.textAlign = "center";
            purchaseDiv.style.alignItems = "center";
            
            photoSpan.style.marginRight="21px";
            clearSpan.style.marginLeft = "20px";
            clearSpan.style.cursor = "pointer";

            clearSpan.addEventListener("click", ()=>{

                purchaseDiv.innerHTML ="";
                cartItems--;
                countingDollars -= parseFloat(priceVariable);
                totalPrice.innerHTML = 
                "Total "+ Math.abs(countingDollars).toFixed(2)+"$";

            })
            
            purchaseInfo.appendChild(purchaseDiv);
            cartAnimation();
        }
        
    })

 
    imgArr[j].addEventListener("mouseenter", ()=> {
        iconArr[j].style.opacity="1";
        iconArr[j].style.display = "flex";
        iconArr[j].style.justifyContent = "center";
        iconArr[j].style.alignItems="center";
        iconArr[j].style.gap = "20px";
        iconArr[j].style.position = "absolute";
        iconArr[j].style.transform = "translate(25%,-160%)";
    })

    imgArr[j].addEventListener("mouseout",()=>{
        iconArr[j].style.opacity="0";
    })


    iconArr[j].addEventListener("mouseover",()=>{
        iconArr[j].style.opacity="1";
        iconArr[j].style.display = "flex";
        iconArr[j].style.justifyContent = "center";
        iconArr[j].style.alignItems="center";
        iconArr[j].style.gap = "20px";
        iconArr[j].style.position = "absolute";
        iconArr[j].style.transform = "translate(25%,-160%)";
    })

    iconArr[j].addEventListener("mouseout",()=>{
        iconArr[j].style.opacity="0";
    });

}


checkout.addEventListener("click",()=>{
    alert("All products purchased successfuly");
    location.reload();
})

All.addEventListener("click", ()=>{

    for(let benji of benjiArr){

        benji.style.display="block";

    }

})

Ikea.addEventListener("click", ()=>{

    for(let benji of benjiArr){

        benji.style.display="block";

        if(parseInt(benji.getAttribute('data-value'))!=10 &&
        parseInt(benji.getAttribute('data-value'))!=11)
        {
            benji.style.display="none";
            mainBlock.style.justifyContent = "left";
            mainBlock.style.gap = "30px";
        }
    }
})


Marcos.addEventListener("click", ()=>{

    for(let benji of benjiArr){

        benji.style.display="block";

        if(parseInt(benji.getAttribute('data-value'))!=80 &&
        parseInt(benji.getAttribute('data-value'))!=9  &&
        parseInt(benji.getAttribute('data-value'))!=40)
        {
            benji.style.display="none";
            mainBlock.style.justifyContent = "left";
            mainBlock.style.gap = "30px";
        }
    }
})


Caressa.addEventListener("click", ()=>{

    for(let benji of benjiArr){

        benji.style.display="block";

        if(parseInt(benji.getAttribute('data-value'))!=26 &&
        parseInt(benji.getAttribute('data-value'))!=46  &&
        parseInt(benji.getAttribute('data-value'))!=7)
        {
            benji.style.display="none";
            mainBlock.style.justifyContent = "left";
            mainBlock.style.gap = "30px";
        }
    }
})


Liddy.addEventListener("click", ()=>{

    for(let benji of benjiArr){

        benji.style.display="block";

        if(parseInt(benji.getAttribute('data-value'))!=70 &&
        parseInt(benji.getAttribute('data-value'))!=22  &&
        parseInt(benji.getAttribute('data-value'))!=30 &&
        parseInt(benji.getAttribute('data-value'))!=60)
        {
            benji.style.display="none";
            mainBlock.style.justifyContent = "left";
            mainBlock.style.gap = "30px";
        }
    }
})


let alphabet = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ";

let textSearch = document.getElementById("textSearch");
let searchLoop = document.getElementById("searchLoop");
let userInp ;

let symbolsArr = [];

let searchSystem = (e) =>{


    if(alphabet.includes(e.key)){
        symbolsArr.push(e.key);
        userInp = symbolsArr.join('');
    }

    if((e.keyCode==13 || e.button==0) && userInp!=undefined ){
        textSearch.value = "";
        symbolsArr.length = 0;
        
        userInp = userInp.split(" ").join("").toLowerCase();

        let hiddenDetector = 0;

        for(let i = 0 ; i<titleArr.length;i++){
            let comparisonText = titleArr[i].innerText.split(" ").join("").toLowerCase();
      
            if(userInp != comparisonText && !comparisonText.includes(userInp)){
                benjiArr[i].style.display="none";
                mainBlock.style.justifyContent = "left";
                mainBlock.style.gap = "30px";
                hiddenDetector++;
                if(hiddenDetector==12){
                    mainBlock.innerHTML = "Results not found, there is no such products";
                    mainBlock.style.fontSize = "24px";
                }
            }
        }
    }
}



textSearch.addEventListener("keydown",searchSystem);
searchLoop.addEventListener("click",searchSystem);






