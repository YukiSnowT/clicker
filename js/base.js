


    //ループ処理
    const mainAct = () =>{
        //画像の描画
        ctx.clearRect(0, 0,cvx,cvy);
        ctx.globalAlpha=1;
        if(nowMonsterNum < monsterSumNum()){
            if(nowMonsterNum==0&&monsterSumNum()!==1){
                animationM = 50;
            }else{
                animationM = 0;
            }
            nowMonsterNum = monsterSumNum();
        }
        if(animationM>150){
            displayMonster(nowMonsterNum,"VS ","",(nowMonsterNum<30))
            displayHP(cvx/3,cvy/32*5,cvx/3);
        }else if(animationM>50){
            displayMonster(nowMonsterNum,"","があらわれた！",(nowMonsterNum<30))
            animationM++;
            displayHP(cvx/3,cvy/32*5,cvx/3);
        }else{
            if(nowMonsterNum == 0){
                displayMonster(nowMonsterNum,"","があらわれた！",(nowMonsterNum<30))
                animationM=51;
                displayHP(cvx/3,cvy/32*5,cvx/3);
            }else{
                displayMonster(nowMonsterNum-1,"","を倒した！",(nowMonsterNum<30))
                animationM++;
            }

        }
        if(animationP>0){
            displayAnimePunch();
        }
        displayMyprice();
        displayClickLevel();
        timeCount++;
        if(timeCount>=300){
            timeCount=0;
            dataSave()
        }
        menuLevelAble();
        culSum();
        if(timeCount%30==0){ //timeCount%30==0に変更→clickも
            for(i=0;i<myPrice.length;i++){
                myPrice[i] += autoSpeedSum[i];
                sumMyPrice[i] += autoSpeedSum[i];
            }
            advMyprice();
            advMyprice(sumMyPrice);
        }
    }


    const clickButton = (n) =>{
        document.getElementById(n).addEventListener("click",function(){
            if(n.match(/^button[0-9]{1,}/)!==null){
                let num = Number(n.split("n")[1]);
                let needMoney = priceLevel[num][2]*10000+priceLevel[num][1]
                if(subcheck(priceLevel[num])&&autoSpeedLevel[num]<100){
                    subPrice(priceLevel[num]);
                    if(autoSpeedLevel[num]===0){
                        displayFace(faceName[num][1],faceName[num][2],ctxm[num]);
                        if(num<faceName.length-1){
                            putMenu(autoSpeedLevel.length);
                        }
                    }else{
                        console.log(num)
                        let nn = [workerSpeed[num][0],workerSpeed[num][1]*(autoSpeedLevel[num]+1)*(autoSpeedLevel[num]+1),workerSpeed[num][2]*(autoSpeedLevel[num]+1)*(autoSpeedLevel[num]+1)];
                        nn = advprice(nn);
                        console.log(nn)
                        const x = document.getElementById("text1_" + num);
                        x.innerHTML=faceName[num][0] + " " + priceText(nn) + "/秒";
                        if(priceText(nn)[0]>=12){
                            x.setAttribute("style","font-size:8px; padding-top:3px; padding-bottom:4px");
                        }
                    }
                    autoSpeedLevel[num]++;
                    needMoney = Math.floor(1.5*needMoney);//レベルアップ処理
                    if(needMoney>99999999){
                        priceLevel[num][0]++;
                        needMoney = Math.round(needMoney/10000);
                    }
                    priceLevel[num][1]=Math.round(needMoney%10000);
                    priceLevel[num][2]=Math.floor(needMoney/10000);
                    if(priceLevel[num][0]>16){
                        priceLevel[num][0]=16;
                        priceLevel[num][1]=9999;
                        priceLevel[num][2]=9999;
                    }
                    if(autoSpeedLevel[num]==100){
                        document.getElementById("button" + num).setAttribute("class", "buttonLevelM");
                        document.getElementById("button" + num).textContent = "LEVEL MAX"
                    }else{
                        document.getElementById("button" + num).textContent = priceText(priceLevel[num]);
                    }
                    document.getElementById("button" + num).setAttribute("style", "width:210px")
                    document.getElementById("text2_" + num).textContent="LEVEL:" + autoSpeedLevel[num]
                    
                    displayMyprice();
                    
                }
            }
        })
    }



