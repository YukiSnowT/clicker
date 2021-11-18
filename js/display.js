
    //mypriceのcanvas表示
    const displayMyprice = () =>{
        let n = [0,0,0]
        for(i=myPrice.length-1;i>0;i--){
            if(myPrice[i]>0){
                n[2]=myPrice[i];
                n[1]=myPrice[i-1];
                n[0]=i-1;
                break;
            }
        }
        if(n[0]==0&&n[1]==0&&n[2]==0){
            n[1]=myPrice[0];
        }
        ctx.clearRect(0, 0,cvx,cvy/8);

        ctx.fillStyle='#000';
        ctx.fillRect(0,0,cvx,cvy/8);
        ctx.fillStyle='#fff';
        ctx.fillRect(1,1,cvx-2,cvy/8-2);
        ctx.fillStyle='#000';
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        if(myPrice[13]<100&&myPrice[14]==0&&myPrice[15]==0&&myPrice[16]==0&&myPrice[17]==0){
            ctx.font = mojisizeB + "px sans";////ココノセイ！！
        }else if(myPrice[14]<1000&&myPrice[15]==0&&myPrice[16]==0&&myPrice[17]==0){
            ctx.font = "10px sans";
        }else{
            ctx.font = "0px sans";
        }
        ctx.fillText("所持金：",5,cvy/16);
        ctx.font = mojisizeB + "px sans";/////ココノセイ！
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(priceText(n), cvx-5,cvy/16);
        ctx.font = "bold" +  Math.max(cvy/20,10) + "px sans";
    }

    //NowLoading画面の描画
    const displayNowLoading = () =>{
        ctx.clearRect(0, 0,cvx,cvy);
        ctx.fillStyle='#fff';
        ctx.font = mojisizeA + "px sans";
        ctx.textAlign = "right";
        ctx.textBaseline = "ideographic";
        ctx.fillText("Now Loading...",cvx-2,cvy);
    }

    //メインゲーム画面の描画
    const displayMainGame = () =>{
        ctx.clearRect(0, 0,cvx,cvy);
        //データ読み込み
        if(continuefrag){
            dataLoad();
        }
        if(autoSpeedLevel[0]===undefined){
            putMenu(0);
        }else{
            for(x=0;x<autoSpeedLevel.length;x++){
                putMenu(x);
            }
            continuefrag = false;
        }
        displayMyprice();
        displayClickLevel();
        
    }

    //click関連のcanvas表示
    const displayClickLevel = () =>{
        // let fsize = Math.max(cvy/22,8);
        ctx.fillStyle='#000';
        ctx.fillRect(0, cvy/1.5,cvx-2,cvy/3);
        if(subcheck(clickPrice)&&clickLevel<100){
            ctx.fillStyle=goodColor;
        }else{
            ctx.fillStyle='#fff';
        }
        ctx.fillRect(1,cvy/1.5+1,cvx-2,cvy/3-2);
        ctx.fillStyle='#000';
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.font = "bold " + mojisizeB + "px sans";
        ctx.fillText("『" + degree[Math.floor((clickLevel-1)/3)] + "勇者』",10,cvy/1.5+5);
        ctx.font = "normal " + mojisizeB + "px sans";
        ctx.fillText("現在のレベル：" + clickLevel,10,cvy/1.5+5+mojisizeB+cvy/25);
        ctx.fillText("クリック１回の報酬：" + priceText(clickGet),5,cvy/1.5+5+mojisizeB*2+cvy/25*2);
        if(clickLevel<100){
            ctx.fillText("次のレベルに必要な金額：" + priceText(clickPrice) ,5,cvy/1.5+5+mojisizeB*3+cvy/25*3);
        }else{
            ctx.fillText("LEVELMAX!",5,cvy/1.5+5+mojisizeB*3+cvy/25*3);
        }

        ctx.fillRect(3,cvy/1.5+8+mojisizeB*2+cvx/25,cvx-6,1);
        ctx.fillRect(3,cvy/1.5+8+mojisizeB*3+cvy/25*2,cvx-6,1);
    }


    //クリック箇所にパンチアニメ表示
    const displayAnimePunch = () =>{
        if(animationM>50){
            if(animationP>25){
                ctx.globalAlpha=1
            }else{
                ctx.globalAlpha=animationP/25;
            }
            ctx.drawImage(loadSystemImage[1],animationPXY[0],animationPXY[1],cvy/5,cvy/5);
            animationP--;
            if(animationP<0){
                animationP = 0
            }
            ctx.globalAlpha=1;
        }else{
            ctx.globalAlpha=1;
            animationP=0;
        }
    }

    //モングラ表示
    const displayMonster = (monsterImgNum,msg1,msg2,smallsize=true) =>{
        if(msg2!=="を倒した！"){
            const cotcv = cvx/cvy/13*24;
            const cotimg = loadMonsterImage[monsterImgNum].width/loadMonsterImage[monsterImgNum].height;
            ctx.globalAlpha=1
            if(cotcv>=cotimg&&smallsize){
                //縦長→heightに合わせる
                ctx.drawImage(loadMonsterImage[monsterImgNum],(cvx-cvy*13/24*cotimg)/2,cvy/8,cvy*13/24*cotimg,cvy*13/24);
            }else if(smallsize){
                //横長→widthに合わせる
                ctx.drawImage(loadMonsterImage[monsterImgNum],0,cvy*19/48-cvx/cotimg/2,cvx,cvx/cotimg);
            }else{
                ctx.drawImage(loadMonsterImage[monsterImgNum],0,0,cvx,cvx/cotimg);
            }    
        }
        ctx.fillStyle='#fff';
        // ctx.strokeStyle='#000';
        ctx.textAlign = "center";
        ctx.textBaseline = "ideographic";
        ctx.font = "bold" +  mojisizeA + "px sans";
        ctx.fillText(msg1 + monsterName[monsterImgNum] + msg2,cvx/2,cvy/1.5,cvx)
        // ctx.strokeText(monsterName[monsterImgNum] + msg,cvx/2,cvy/1.5,cvx)
    }


    //顔グラ表示。引数は画像番号、内部番号、描画場所、透明度。内部番号は上が1234、下が5678
    const displayFace = (faceImgNum,inImgNum,context,alp=1) =>{
        const face = loadFaceImage[faceImgNum];
        const faceX = face.width;
        const faceY = face.height;
        const sWidth = faceX/4;
        const sHeight = faceY/2;
        const sx = sWidth * ((inImgNum-1)%4);
        const sy = sHeight * Math.floor((inImgNum-1)/4);
        context.globalAlpha = alp;
        context.clearRect(0,0,faceSize,faceSize);
        context.drawImage(face,sx,sy,sWidth,sHeight,0,0,faceSize,faceSize);
        context.globalAlpha = 1;
    }

    //HPバーの表示
    const displayHP = (x,y,wid) =>{
        const pic1 = loadSystemImage[6];
        const pic2 = loadSystemImage[7];
        const pic3 = loadSystemImage[8];
        const xxx = pic1.width;
        const yyy = pic1.height;
        let barlong = monsterHP();
        ctx.drawImage(pic3,x,y,wid,wid*yyy/xxx);
        ctx.drawImage(pic2,0,0,xxx*barlong,yyy,x,y,wid*barlong,wid*yyy/xxx);
        ctx.drawImage(pic1,x,y,wid,wid*yyy/xxx);
    }