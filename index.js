//(function(){
//
//})();
let frameCount = 0;
let budtenderList = {};
let clientList = {};
let inventoryList = {};
let timeWhenGameStarted = Date.now();  // return time in ms
let paused = false;

let canvas = document.getElementById("ctx");
let ctx = document.getElementById("ctx").getContext("2d");
ctx.font = "30px Arial"

let WIDTH = 1400;
let HEIGHT = 800;

let Img = {};
Img.register = new Image();
Img.register.src = "img/register.svg";

Img.dispIcon = new Image();
Img.dispIcon.src = "img/dispIcon.svg";

Img.abctBackground = new Image();
Img.abctBackground.src = "img/abctBackground.svg";

Img.dispBuilding = new Image();
Img.dispBuilding.src = "img/dispBuilding.svg";

Img.manufacturing = new Image();
Img.manufacturing.src = "img/manufacturing.svg";

Img.flower = new Image();
Img.flower.src = "img/flower.svg";

Img.flowerGreen = new Image();
Img.flowerGreen.src = "img/flowerGreen.svg";

Img.flowerGreenAll = new Image();
Img.flowerGreenAll.src = "img/flowerGreenAll.svg";

Img.flowerRed = new Image();
Img.flowerRed.src = "img/flowerRed.svg";

Img.tincture = new Image();
Img.tincture.src = "img/tincture.svg";

Img.tinctureUpShadow = new Image();
Img.tinctureUpShadow.src = "img/tinctureUpShadow.svg";

Img.tinctureOnHover = new Image();
Img.tinctureOnHover.src = "img/tinctureOnHover.svg";

Img.edible = new Image();
Img.edible.src = "img/edible.svg";

Img.edibleUpShadow = new Image();
Img.edibleUpShadow.src = "img/edibleUpShadow.svg";

Img.edibleOnHover = new Image();
Img.edibleOnHover.src = "img/edibleOnHover.svg";

Img.beverage = new Image();
Img.beverage.src = "img/beverage.svg";

Img.beverageUpShadow = new Image();
Img.beverageUpShadow.src = "img/beverageUpShadow.svg";

Img.beverageOnHover = new Image();
Img.beverageOnHover.src = "img/beverageOnHover.svg";

Img.topical = new Image();
Img.topical.src = "img/topical.svg";

Img.topicalUpShadow = new Image();
Img.topicalUpShadow.src = "img/topicalUpShadow.svg";

Img.topicalOnHover = new Image();
Img.topicalOnHover.src = "img/topicalOnHover.svg";

let drawBuildings = function(){
    ctx.save();
    ctx.font = "10px Arial"
    ctx.fillStyle = "skyblue";
//    ctx.drawImage(Img.register, 0, 0, Img.register.width, Img.register.height, 1000, 60, Img.register.width, Img.register.height);
    ctx.drawImage(Img.dispIcon, 0, 0, Img.dispIcon.width, Img.dispIcon.height, 1000, 60, Img.dispIcon.width, Img.dispIcon.height);
    ctx.drawImage(Img.manufacturing, 0, 0, Img.manufacturing.width, Img.manufacturing.height, 1000, 180 , Img.manufacturing.width, Img.manufacturing.height);
    ctx.restore();
}

let PRODUCT = ["flower", "tincture", "edible", "beverage", "topical"];
let PRODUCT_PRICE = [150, 125, 150, 100, 350];

let JOB = ["admin", "constructor", "designer", "guard", "grower"];
let JOB_2WK_PAY = [1500, 1000, 1250, 1000, 1400];

// Added these in the Inventory method so that it works on first load.
let buttonX1 = 20;
let buttonY1 = 50;
let buttonW1 = Img.flower.width;
let buttonH1 =  Img.flower.height;

let buttonX2 = 20;
let buttonY2 = 200;
let buttonW2 = Img.tincture.width;
let buttonH2 =  Img.tincture.height;

let buttonX3 = 20;
let buttonY3 = 350;
let buttonW3 = Img.edible.width;
let buttonH3 =  Img.edible.height;

let buttonX4 = 20;
let buttonY4 = 500;
let buttonW4 = Img.beverage.width;
let buttonH4 =  Img.beverage.height;

let buttonX5 = 20;
let buttonY5 = 650;
let buttonW5 = Img.topical.width;
let buttonH5 =  Img.topical.height;


let dateY_M_D = function(){
    let today = new Date();
    let dateYMD = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    return dateYMD;
}

let timeH_M_S = function(){
    let today = new Date();
    let timeHMS = today.getHours()+':'+(today.getMinutes()+1)+':'+today.getSeconds()
    return timeHMS;
}

class Entity{
    constructor(id, funds, x, width, y, height, color){
        this.id = id;
        this.funds = funds;
        this.x = x;
        this.width = width;
        this.y = y;
        this.height = height;
        this.color = color;
    }

    update(){
        this.draw();
    }

    testTransaction(entity2){
         let ent1 = {
            funds:this.funds,
         }

         let ent2 = {
            funds:entity2.funds,
            regularity:entity2.regularity,
            spent:entity2.spent,
            color:entity2.color,
         }
         return testTransactionEntEnt(ent1, ent2);
    }

    draw(){
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.restore();
    }
 }

// ent1 is the register. ent2 is client.
testTransactionEntEnt = function(ent1, ent2){
    if (frameCount % ent2.regularity === 0){
        if (ent2.funds <= 0){
            return false
        } else if (ent2.funds){
            return true
        }
    }
}

let budtenderUpExpRate = 2;

class Budtender extends Entity{
    constructor(id, funds, x, width, y, height, color, biWkPay, salesExp){
        super(id, funds, x, width, y, height, color);
        this.timer = 0;
        this.biWkPay = biWkPay; 
        this.salesExp = salesExp; //Sales experience
        budtenderList[id] = this;
    }

    testSalesExpUp(){
        if(this.timer % budtenderUpExpRate === 0){
            budtenderUpExpRate = budtenderUpExpRate**2;
//            alert(budtenderUpExpRate)
            this.draw()
            this.timer = 0;
            return true
        } else {
            return false
        }
    }

    draw(){
        ctx.save();
        ctx.font = "9px Arial"
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2 + 10, this.timer/budtenderUpExpRate*100, this.height);
        ctx.fillStyle = "green";
        ctx.globalAlpha = .1;
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2 + 10, 100, this.height);
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2, 100, this.height);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2, 100*(this.salesExp/10), this.height);
        ctx.fillText("SalesExp: " + this.salesExp, this.x - this.width/2, this.y - this.height/2-10);
        ctx.font = "14px Arial"
        ctx.fillStyle = "white";
        ctx.globalAlpha = 1;
        ctx.restore();
    }

}

// Basic Display
function numWCommas(num){
    return "$" + num.toLocaleString('en', {useGrouping:true});
}

let randGenClient = document.getElementById("randGenClient");
randGenClient.onclick = function(){
    randomlyGenClient();
}

let clientDetailsDiv = document.getElementById("clientDetailsDiv");
let fadeAway = function(){
    clientDetailsDiv.innerHTML = "";
}
class Client extends Entity{
    constructor(id, funds, x, width, y, height, color, bisExp, regularity){
        super(id, funds, x, width, y, height, color);
        this.bisExp = bisExp;
        this.regularity = regularity;
        this.timer = 0;
        this.spentItemType = PRODUCT[rand(5)];
        this.numOfItemsBought = this.numOfItemsBought();
        this.spent = this.fundsSpent();
        this.color = this.spentColor();
        this.job = JOB[rand(5)];
        this.job2wkPay = this.job2wkPay();
        clientList[id] = this;
        this.detailsOnHover(this.x -100, this.width, this.y, this.height+10, this);
    }

    drawDetails(thisY){
        ctx.save();
        ctx.font = "8px Arial"
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x-this.width/2, this.y+this.height, this.width+10, 1);
        ctx.font = "14px Arial"
        clientDetailsDiv.style.display = "block";
        clientDetailsDiv.style.top = thisY+"px";
        clientDetailsDiv.style.left = this.x+this.width-20+"px";
        clientDetailsDiv.style.color = this.color;
        clientDetailsDiv.innerHTML  =   "Funds:" + this.funds + "<br>" +
                                        "bisExp:" + this.bisExp + "<br>" +
                                        "regularity:" + this.regularity + "<br>" +
                                        "timer:" + this.timer + "<br>" +
                                        "spentType:" + this.spentItemType + "<br>" +
                                        "numOfItemsBought:" + this.numOfItemsBought + "<br>" +
                                        "spent:" + this.spent + "<br>" +
                                        "color:" + this.color + "<br>" +
                                        "job:" + this.job + "<br>" +
                                        "job2wkPay:" + this.job2wkPay  + "<br>";

        setTimeout(fadeAway, 5000)
        clientDetailsDiv2.innerHTML  = clientDetailsDiv.innerHTML;
        clientDetailsDiv2.style.backgroundColor = this.color;
        ctx.restore();
    }

    detailsOnHover(thisX, width, thisY, height, client){
        canvas.addEventListener('mousemove', respondMouseOver);
            function respondMouseOver(e){
                    let canvasRect = canvas.getBoundingClientRect();  // get element's absolute position.
                    let x = e.clientX - canvasRect.left;
                    let y = e.clientY - canvasRect.top;
                    if (
                    x > thisX &&
                    x < thisX + width &&
                    y > thisY &&
                    y < thisY + height
                    ){
        //                alert(thisY)
                        client.drawDetails(thisY);
                    }

    }
    }


    job2wkPay(){
        if (this.job === "admin"){
            return JOB_2WK_PAY[0];
        } else if(this.job === "constructor"){
            return JOB_2WK_PAY[1];
        } else if(this.job === "designer"){
            return JOB_2WK_PAY[2];
        } else if(this.job === "guard"){
            return JOB_2WK_PAY[3];
        } else if(this.job === "grower"){
            return JOB_2WK_PAY[4];
        }
    }

    draw(){
        ctx.save();
        ctx.font = "8px Arial"
//        ctx.fillStyle = "blue";
//        ctx.fillRect(this.x - this.width/2, this.y - this.height/2, 110, 20);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.width/2-12, this.y - this.height/2, 3, 15);
        ctx.fillStyle = "green";
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2, 100*(this.funds/1000), this.height);  // funds_bar
//        ctx.globalAlpha = .1;
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2 + 11, this.regularity*7, this.height);  // reg_bar
        ctx.globalAlpha = 1;
        ctx.fillStyle = "white";
//        ctx.fillText(numWCommas(this.funds), this.x - this.width/2, this.y - this.height/2 + this.height);
//        ctx.fillText(this.regularity, this.x - this.width/2, this.y - this.height/2 + this.height+ 10);
        ctx.font = "10px Arial"


        ctx.globalAlpha = .7;
        if(this.timer % 14 === 0){  // biWk pay
            if(this.funds < 1100){  // Cap funds at $3,000
                this.funds += Math.floor(this.job2wkPay/6);  // Use 1/6 of biWk Income for green expenses.
                if(this.funds > 1100){
                    this.funds = 1100;
                }
                ctx.fillRect(this.x - this.width/2, this.y - this.height/2, 100*(this.funds/1000), this.height);  // funds_bar
                ctx.fillStyle = "lightgreen";
                ctx.fillText("+" + numWCommas((this.job2wkPay/6).toFixed(2)), this.x - this.width/10+30, this.y - this.height/2);
            }
            this.timer = 0;
        }
        ctx.fillStyle = "white";
        ctx.globalAlpha = 1;
        ctx.restore();
    }

    numOfItemsBought(){
        if (this.spentItemType === "flower"){
            return rand(2)+1;
        } else if(this.spentItemType === "tincture"){
            return rand(2)+1;
        } else if(this.spentItemType === "edible"){
            return rand(2)+1;
        } else if(this.spentItemType === "beverage"){
            return rand(2)+1;
        } else if(this.spentItemType === "topical"){
            return rand(2)+1;
        }
    }

    fundsSpent(){
        if (this.spentItemType === "flower"){
            return this.numOfItemsBought*PRODUCT_PRICE[0];  // for an Oz or 28g ~ 30 g limit (1438) is $150
        } else if(this.spentItemType === "tincture"){
            return this.numOfItemsBought*PRODUCT_PRICE[1]; // 100mg for $25, limit 500mg so 5*$25 = $125
        } else if(this.spentItemType === "edible"){
            return this.numOfItemsBought*PRODUCT_PRICE[2]; // 100mg for $30, limit 500mg so 5*$30 = $150
        } else if(this.spentItemType === "beverage"){
            return this.numOfItemsBought*PRODUCT_PRICE[3];  // 100mg for $20, limit 500mg so 5*$20 = $100
        } else if(this.spentItemType === "topical"){
            return this.numOfItemsBought*PRODUCT_PRICE[4];  // 100mg for $70, limit 500mg so 5*$70 = $350
        }
    }

    spentColor(){
        if (this.spentItemType === "flower"){
            return "lightgreen";
        } else if(this.spentItemType === "tincture"){
            return "skyblue";
        } else if(this.spentItemType === "edible"){
            return "pink";
        } else if(this.spentItemType === "beverage"){
            return "orange";
        } else if(this.spentItemType === "topical"){
            return "white";
        }
    }
}

class Register extends Entity {
    constructor(id, funds, x, width, y, height, color){
        super(id, funds, x, width, y, height, color)
    };
}

// ent1 is the inventory. ent2 has to be a client.
testTransactionInvEnt = function(ent1, ent2){
    let invArrOfBooleans = [];
    if (ent1.flower <= 0){
        invArrOfBooleans.push(false)
    } else{
        invArrOfBooleans.push(true)
    }
    if (ent1.tincture <= 0){
        invArrOfBooleans.push(false)
    } else{
        invArrOfBooleans.push(true)
    }
    if (ent1.edible <= 0){
        invArrOfBooleans.push(false)
    } else{
        invArrOfBooleans.push(true)
    }
    if (ent1.beverage <= 0){
        invArrOfBooleans.push(false)
    } else{
        invArrOfBooleans.push(true)
    }
    if (ent1.topical <= 0){
        invArrOfBooleans.push(false)
    } else{
        invArrOfBooleans.push(true)
    }

    return invArrOfBooleans
}

class Inventory extends Entity {
    constructor(id, funds, x, width, y, height, color){
        super(id, funds, x, width, y, height, color);
        this.maxFunds = 1000;
        this.flower = 100;
        this.tincture = 100;
        this.edible = 100;
        this.beverage = 100;
        this.topical = 100;
        this.invOnClick();
        this.invOnHover();

        inventoryList[id] = this;
    };

    draw(){
        let _y = 150;
        let x_spacing = 20;
        let y_spacing = 170;
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.font = "14px Arial"

        ctx.fillStyle = "lightgreen";
        ctx.drawImage(Img.flower, 0, 0, Img.flower.width, Img.flower.height, x_spacing, 50 , Img.flower.width, Img.flower.height);
        ctx.fillRect(x_spacing, 170, this.flower, 10);
        ctx.fillText("Flower " + this.flower, x_spacing, 170);

        ctx.fillStyle = "skyblue";
        ctx.drawImage(Img.tincture, 0, 0, Img.tincture.width, Img.tincture.height, x_spacing, 50 + _y, Img.tincture.width, Img.tincture.height);
        ctx.fillRect(x_spacing, y_spacing + _y, this.tincture, 10);
        ctx.fillText("Tincture " + this.tincture, x_spacing, y_spacing + _y);

        ctx.fillStyle = "pink";
        ctx.drawImage(Img.edible, 0, 0, Img.edible.width, Img.edible.height, x_spacing, 50 + _y*2, Img.edible.width, Img.edible.height);
        ctx.fillRect(x_spacing, y_spacing + _y*2, this.edible, 10);
        ctx.fillText("edible: " + this.edible, x_spacing, y_spacing + _y*2);

        ctx.fillStyle = "orange";
        ctx.drawImage(Img.beverage, 0, 0, Img.beverage.width, Img.beverage.height, x_spacing, 50 + _y*3, Img.beverage.width, Img.beverage.height);
        ctx.fillRect(x_spacing, y_spacing + _y*3, this.beverage, 10);
        ctx.fillText("beverage: " + this.beverage, x_spacing, y_spacing + _y*3);

        ctx.fillStyle = "white";
        ctx.drawImage(Img.topical, 0, 0, Img.topical.width, Img.topical.height, x_spacing, 50 + _y*4, Img.topical.width, Img.topical.height);
        ctx.fillRect(x_spacing, y_spacing + _y*4, this.topical, 10);
        ctx.fillText("topical: " + this.topical, x_spacing, y_spacing + _y*4);

        ctx.globalAlpha = 1;
        ctx.restore();
    }

    testTransaction(entity2){
         let ent1 = {
            flower:this.flower,
            tincture:this.tincture,
            edible:this.edible,
            beverage:this.beverage,
            topical:this.topical,
         }

         let ent2 = {
            spentItemType:entity2.spentItemType,
            numOfItemsBought:entity2.numOfItemsBought,
         }
         return testTransactionInvEnt(ent1, ent2);
    }

    // Add event listener to canvas element
    invOnClick(){
        canvas.addEventListener('click', function(e){
            buttonX1 = 20;
            buttonY1 = 50;
            buttonW1 = Img.flower.width;
            buttonH1 =  Img.flower.height;

            buttonX2 = 20;
            buttonY2 = 200;
            buttonW2 = Img.tincture.width;
            buttonH2 =  Img.tincture.height;

            buttonX3 = 20;
            buttonY3 = 350;
            buttonW3 = Img.edible.width;
            buttonH3 =  Img.edible.height;

            buttonX4 = 20;
            buttonY4 = 500;
            buttonW4 = Img.beverage.width;
            buttonH4 =  Img.beverage.height;

            buttonX5 = 20;
            buttonY5 = 650;
            buttonW5 = Img.topical.width;
            buttonH5 =  Img.topical.height;
            let canvasRect = canvas.getBoundingClientRect();  // get element's absolute position.
            let x = e.clientX - canvasRect.left;
            let y = e.clientY - canvasRect.top;
            console.log("X: " + x + "- Y: " +y)
            if (
            x > buttonX1 &&
            x < buttonX1 + buttonW1 &&
            y > buttonY1 &&
            y < buttonY1 + buttonH1
            ){
//                ctx.drawImage(Img.flowerRed, 0, 0, Img.flowerRed.width, Img.flowerRed.height, 20, 50 , Img.flowerRed.width, Img.flowerRed.height);
                  ctx.drawImage(Img.flowerGreenAll, 0, 0, Img.flowerGreenAll.width, Img.flowerGreenAll.height, 20, 50 , Img.flowerGreenAll.width, Img.flowerGreenAll.height);
                register.funds -= PRODUCT_PRICE[0]/2;
                console.log(x + "-" + y);
                inventory.flower += 1;
            }
            if (
            x > buttonX2 &&
            x < buttonX2 + buttonW2 &&
            y > buttonY2 &&
            y < buttonY2 + buttonH2
            ){
                ctx.drawImage(Img.tinctureUpShadow, 0, 0, Img.tinctureUpShadow.width, Img.tinctureUpShadow.height, 20, 200 , Img.tinctureUpShadow.width, Img.tinctureUpShadow.height);
                register.funds -= PRODUCT_PRICE[1]/2;
                console.log(x + "-b-" + y);
                inventory.tincture += 1;
            }
            if (
            x > buttonX3 &&
            x < buttonX3 + buttonW3 &&
            y > buttonY3 &&
            y < buttonY3 + buttonH3
            ){
                ctx.drawImage(Img.edibleUpShadow, 0, 0, Img.edibleUpShadow.width, Img.edibleUpShadow.height, 20, 350 , Img.edibleUpShadow.width, Img.edibleUpShadow.height);
                register.funds -= PRODUCT_PRICE[2]/2;
                console.log(x + "-c-" + y);
                inventory.edible += 1;
            }
            if (
            x > buttonX4 &&
            x < buttonX4 + buttonW4 &&
            y > buttonY4 &&
            y < buttonY4 + buttonH4
            ){
                ctx.drawImage(Img.beverageUpShadow, 0, 0, Img.beverageUpShadow.width, Img.beverageUpShadow.height, 20, 500 , Img.beverageUpShadow.width, Img.beverageUpShadow.height);
                register.funds -= PRODUCT_PRICE[3]/2;
                console.log(x + "-" + y);
                inventory.beverage += 1;
            }
            if (
            x > buttonX5 &&
            x < buttonX5 + buttonW5 &&
            y > buttonY5 &&
            y < buttonY5 + buttonH5
            ){
                ctx.drawImage(Img.topicalUpShadow, 0, 0, Img.topicalUpShadow.width, Img.topicalUpShadow.height, 20, 650 , Img.topicalUpShadow.width, Img.topicalUpShadow.height);
                register.funds -= PRODUCT_PRICE[4]/2;
                console.log(x + "-" + y);
                inventory.topical += 1;
            }
        });
    }

    invOnHover(){
        canvas.addEventListener('mousemove', function(e){
            buttonX1 = 20;
            buttonY1 = 50;
            buttonW1 = Img.flower.width;
            buttonH1 =  Img.flower.height;

            buttonX2 = 20;
            buttonY2 = 200;
            buttonW2 = Img.tincture.width;
            buttonH2 =  Img.tincture.height;

            buttonX3 = 20;
            buttonY3 = 350;
            buttonW3 = Img.edible.width;
            buttonH3 =  Img.edible.height;

            buttonX4 = 20;
            buttonY4 = 500;
            buttonW4 = Img.beverage.width;
            buttonH4 =  Img.beverage.height;

            buttonX5 = 20;
            buttonY5 = 650;
            buttonW5 = Img.topical.width;
            buttonH5 =  Img.topical.height;
            let canvasRect = canvas.getBoundingClientRect();  // get element's absolute position.
            let x = e.clientX - canvasRect.left;
            let y = e.clientY - canvasRect.top;
            console.log("X: " + x + "- Y: " +y)
            if (
            x > buttonX1 &&
            x < buttonX1 + buttonW1 &&
            y > buttonY1 &&
            y < buttonY1 + buttonH1
            ){
                ctx.drawImage(Img.flowerGreen, 0, 0, Img.flowerGreen.width, Img.flowerGreen.height, 20, 50 , Img.flowerGreen.width, Img.flowerGreen.height);
/*                let imgData = ctx.getImageData(buttonX1, buttonY1, buttonW1, buttonH1);
                ctx.putImageData(imgData, buttonX1+100, buttonY1)*/
            }
            if (
            x > buttonX2 &&
            x < buttonX2 + buttonW2 &&
            y > buttonY2 &&
            y < buttonY2 + buttonH2
            ){
                ctx.drawImage(Img.tinctureOnHover, 0, 0, Img.tinctureOnHover.width, Img.tinctureOnHover.height, 20, 200 , Img.tinctureOnHover.width, Img.tinctureOnHover.height);
            }
            if (
            x > buttonX3 &&
            x < buttonX3 + buttonW3 &&
            y > buttonY3 &&
            y < buttonY3 + buttonH3
            ){
                ctx.drawImage(Img.edibleOnHover, 0, 0, Img.edibleOnHover.width, Img.edibleOnHover.height, 20, 350 , Img.edibleOnHover.width, Img.edibleOnHover.height);
            }
            if (
            x > buttonX4 &&
            x < buttonX4 + buttonW4 &&
            y > buttonY4 &&
            y < buttonY4 + buttonH4
            ){
                ctx.drawImage(Img.beverageOnHover, 0, 0, Img.beverageOnHover.width, Img.beverageOnHover.height, 20, 500 , Img.beverageOnHover.width, Img.beverageOnHover.height);
            }
            if (
            x > buttonX5 &&
            x < buttonX5 + buttonW5 &&
            y > buttonY5 &&
            y < buttonY5 + buttonH5
            ){
                ctx.drawImage(Img.topicalOnHover, 0, 0, Img.topicalOnHover.width, Img.topicalOnHover.height, 20, 650 , Img.topicalOnHover.width, Img.topicalOnHover.height);
            }
        });
    }

    // Client can only buy one type of item with current code. restructure if statement later for future expansion.
    subtractFromInv(isTransactingInv, client){
        ctx.save()
        ctx.fillStyle = "red";
        if(isTransactingInv[0]){  // true if flowers in stock
            if (client.spentItemType === "flower"){
                inventory.flower -= client.numOfItemsBought;
                exchangeFunds(client);
                ctx.fillText("-" + client.numOfItemsBought, buttonX1 + 100, buttonY1 + 120);
            }
        }
        if(isTransactingInv[1]){  // true if tincture in stock
            if (client.spentItemType === "tincture"){
                inventory.tincture -= client.numOfItemsBought;
                exchangeFunds(client);
                ctx.fillText("-" + client.numOfItemsBought, buttonX2 + 100, buttonY2 + 120);
            }
        }
        if(isTransactingInv[2]){  // true if edible in stock
            if (client.spentItemType === "edible"){
                inventory.edible -= client.numOfItemsBought;
                exchangeFunds(client);
                ctx.fillText("-" + client.numOfItemsBought, buttonX3 + 100, buttonY3 + 120);
            }
        }
        if(isTransactingInv[3]){  // true if beverage in stock
            if (client.spentItemType === "beverage"){
                inventory.beverage -= client.numOfItemsBought;
                exchangeFunds(client);
                ctx.fillText("-" + client.numOfItemsBought, buttonX4 + 100, buttonY4 + 120);
            }
        }
        if(isTransactingInv[4]){  // true if topical in stock
            if (client.spentItemType === "topical"){
                inventory.topical -= client.numOfItemsBought;
                exchangeFunds(client);
                ctx.fillText("-" + client.numOfItemsBought, buttonX5 + 100, buttonY5 + 120);
            }
        }
        ctx.restore();
    }
}




let _X  = 300
let _Y = 20;
let newRow = false
randomlyGenClient = function(){
    _Y += 20;
    let id = rand(10000);
    let funds = 1000;
    let x = _X;
    let width = 100;
    let y = _Y;
    if(y> HEIGHT-100){
        _X +=150;
        _Y = 40
        newRow = true;
    }

    if(newRow){
        x = _X;
        y = _Y;
    }
    let height = 5;
    let color = "blue";
    let regularity = rand(13)+ 1; // random # from 1 to 14. See reg_bar where 7*14 =98 ~ 100 for the bars.
    let bisExp = rand(10);

    let client1 = new Client(id, funds, x, width, y, height, color, bisExp, regularity);
}

document.onkeydown = function(e){
//	if(e.keyCode === 68)	//d
//		player.pressingRight = true;
//	else if(e.keyCode === 83)	//s
//		player.pressingDown = true;
//	else if(e.keyCode === 65) //a
//		player.pressingLeft = true;
//	else if(e.keyCode === 87) // w
//		player.pressingUp = true;
//
	if(e.keyCode === 80) //p
		paused = !paused;
}

let exchangeFundsAnimate = function(client){
    ctx.save();
    ctx.fillStyle = "red";
    ctx.font = "10px Arial";
//    ctx.fillText("-" + numWCommas(client.spent), client.x - 100, client.y+10);
//    ctx.fillText(client.numOfItemsBought, client.x - 80, client.y+10);
    ctx.restore();
}

exchangeFunds = function(client){
    register.funds += client.spent;
    client.funds -= client.spent;
    exchangeFundsAnimate(client);
}

let clientSpawnRate;
let clientSpawnRateFn = function(numOfClients){
    if (numOfClients){
        clientSpawnRate  = numOfClients**2*6;
        return clientSpawnRate;
    } else {
        randomlyGenClient();
    }
};

update = function(){
//	if(paused){
//	    ctx.clearRect(0, 0, WIDTH, HEIGHT);
//		ctx.fillText('Paused',WIDTH/2,HEIGHT/2);
//		ctx.fillText(dateY_M_D(),WIDTH-160,50);
//		ctx.fillText(timeH_M_S(),WIDTH-160,100);
//		return;
//	}

    ctx.clearRect(0,0, WIDTH, HEIGHT);
    ctx.drawImage(Img.abctBackground, 0, 0, Img.abctBackground.width, Img.abctBackground.height, 0, 0, Img.abctBackground.width, Img.abctBackground.height);
    drawBuildings();
//    ctx.drawImage(Img.dispBuilding, 0, 0, Img.dispBuilding.width, Img.dispBuilding.height, WIDTH/2 -Img.dispBuilding.width, HEIGHT/1.2 - Img.dispBuilding.height, Img.dispBuilding.width*2, Img.dispBuilding.height*2);
    frameCount++;
    if (frameCount % clientSpawnRate === 0){  // every 4 seconds? depends on setInterval
        randomlyGenClient();
    }

    // Looping through all clients. 1st checks if client has funds, then checks if inventory in stock.
    let keys = Object.keys(clientList)
    for(let key of keys){
        clientList[key].timer++;
        let isTransacting = register.testTransaction(clientList[key]);  // has funds if true
        let isTransactingInv = inventory.testTransaction(clientList[key]); // returns array of booleans for each item.
        if(isTransacting){
            inventory.subtractFromInv(isTransactingInv, clientList[key]);
        }
        clientList[key].update(); // draw merge with exchange
    }

    if(register.funds <= 0){
        let timeSurvived = Date.now() - timeWhenGameStarted;
        alert("You lost! You survived for " + timeSurvived + " ms.");
        startNewGame();
    }

    register.update();
    inventory.update();

    ctx.fillText(numWCommas(register.funds), 20, 35);
    ctx.fillText("Day " + frameCount, WIDTH-170, 150);

    ctx.font = "14px Arial"
    ctx.fillText("New Client Day: " + clientSpawnRateFn(keys.length), WIDTH-170, 175);
    ctx.globalAlpha = .1;
    ctx.fillStyle = "blue";
    ctx.fillRect(WIDTH-170, 180, 100, 20);
    ctx.globalAlpha = 1;

    ctx.globalAlpha = .7;
    if(frameCount % clientSpawnRateFn(keys.length) === 0){
        ctx.fillStyle = "black";
        ctx.fillRect(WIDTH-170, 180, 0, 20);
        clientSpawnTimer = 0;
    } else {
        clientSpawnTimer++;
        ctx.fillStyle = "black";
        ctx.fillRect(WIDTH-170, 180, clientSpawnTimer/clientSpawnRate*100, 20);
        ctx.restore();
    }
    ctx.globalAlpha = 1;

    ctx.fillText("Clients " + keys.length, 348, 30);
    ctx.fillStyle = "lightgreen";
    ctx.fillText(dateY_M_D(),WIDTH-160,50);
    ctx.fillText(timeH_M_S(),WIDTH-160,70);
    ctx.fillStyle = "black";

    let bud_keys = Object.keys(budtenderList);
    for(let key of bud_keys){
        budtenderList[key].timer++;
        let isSalesExpUp = budtenderList[key].testSalesExpUp(budtenderList[key]);  // increase biWkPay in testSalesExpNo in if staemen be
        if(isSalesExpUp){
            budtenderList[key].salesExp +=1
            improveClientRegularity(1);
        }
        budtenderList[key].update();
    }
}

let improveClientRegularity = function(bud_saleExp){
    let client_keys = Object.keys(clientList)
    for(let key of client_keys){
        clientList[key].regularity -= Math.floor(bud_saleExp);  // bud_saleExp limit to 1000. 1000/72 ~ 13
        if(clientList[key].regularity < 1){
            clientList[key].regularity = 1;
        }
    }

}

let clientSpawnTimer = 0;
startNewGame = function(){
    timeWhenGameStarted = Date.now();
    frameCount = 0;
    clientList = {};
    randomlyGenClient();

}

let fastFoward = document.getElementById("fastFoward");
fastFoward.addEventListener('click', function(e){
    clearInterval(originalInterval);
    updateTimer = 100;
    originalInterval = setInterval(update, updateTimer)
});


let play = document.getElementById("play");
play.addEventListener('click', function(e){
    clearInterval(originalInterval);
    updateTimer = 1000;
    originalInterval = setInterval(update, updateTimer)
});

let stop = document.getElementById("stop");
stop.addEventListener('click', function(e){
    clearInterval(originalInterval);
    updateTimer = 1000000;
    originalInterval = setInterval(update, updateTimer)
});



// Initializing the game.
let updateTimer = 1000;
paused = true;
let register = new Register(rand(1000), 200, WIDTH/2, 50, HEIGHT/2, 50, "blue");  // id, funds, x, width, y, height, color
let inventory = new Inventory(rand(1000), 200, WIDTH/2, 20, HEIGHT/2 + 50, 20, "pink");  // id, funds, x, width, y, height, color
let budtender = new Budtender(rand(1000), 200, WIDTH-170, 5, 220, 5, "yellow", 1200, 1);  // id, funds, x, width, y, height, color, biWkPay, salesExp
startNewGame();
let originalInterval = setInterval(update, updateTimer);

function rand(a){
    let num1 = Math.random()*a;
    return Math.floor(num1)
}


