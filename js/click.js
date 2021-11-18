
    //クリック位置の取得
    const clickView = () =>{
        cvs.addEventListener("mousemove",e=>{
            const rect = e.target.getBoundingClientRect();
            viewXY[0] = e.clientX - rect.left+0.5;
            viewXY[1] = e.clientY - rect.top;
        })
    }



//キャンバスクリックレベルアップ処理
const clickLevelUp = () =>{
    if(subcheck(clickPrice)&&clickLevel<100){
        subPrice(clickPrice);
        clickLevel++;
        clickGet[1] = Math.floor(clickGet[1]*(4.2+clickLevel/100));
        clickGet[2] = Math.floor(clickGet[2]*(4.2+clickLevel/100));
        clickGet = advprice(clickGet);
        clickPrice[1] *= 5;
        clickPrice[2] *= 5;
        clickPrice = advprice(clickPrice);
        displayClickLevel();
    }
}

//キャンバスクリックで発生するイベント
const clickEvent = () =>{
    cvs.addEventListener("click",function(){
        if(gameStart){ //ゲーム開始後
            if(viewXY[1]>cvy/1.5){
                clickLevelUp()
            }else if(viewXY[1]>cvy/8&&animationM>49){
                animationP = 30;
                animationPXY[0] = viewXY[0]-Math.floor(Math.random()*(cvx/5+1));
                animationPXY[1] = viewXY[1]-Math.floor(Math.random()*(cvx/5+1));
                addPrice(clickGet);
                addPrice(clickGet,sumMyPrice);
            }
            displayMyprice();
            displayClickLevel();
        }else{//ゲーム開始前
            //コンテニュー、データ消去の分岐
            if(openingMessage==0){
                if(viewXY[0]>cvx*2/3&&viewXY[1]<cvy/10){
                    //HOW TO PLAY
                    openingMessage = 1;
                }else if(viewXY[0]>cvx*2/3&&viewXY[1]<cvy*2/10){
                    //クレジット
                    openingMessage = 2;
                }else if(viewXY[0]<cvx/4&&viewXY[1]<cvy/12){
                    //データ削除確認
                    openingMessage = 3;
                }else{
                    //ゲーム開始
                    clearInterval(openingAnime)
                    gameStart = true;
                    displayMainGame();
                    loopEvent = setInterval(mainAct,1000/30)////加速テスト後は1000/30に変更→baseも
                }
            }else{
                if(openingMessage==3&&viewXY[0]>cvx/8&&viewXY[0]<cvx/8*3&&viewXY[1]>cvx/18*7+40&&viewXY[1]<cvx/18*10+40){
                    // openingButton(cvx/8,cvx/18*7+40,cvx/4,cvy/6,1);
                    localStorage.removeItem("mydata",JSON.stringify(savedata));

                    openingMessage = 4;
                }else{
                    openingMessage = 0;
                }

            }

        }
    })
}

