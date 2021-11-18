    //レベル帯作成
    const putMenu = (num) =>{
        //レベル帯の配置場所作成
        let levelDiv = document.createElement("div");
        levelDiv.setAttribute("id", "level" + num);
        levelDiv.setAttribute("class", "menuLevel");

        //レベル帯のキャンバス作成
        let levelcvs = document.createElement("canvas");
        levelcvs.setAttribute("id","img" + num);
        levelcvs.setAttribute("class","imgLevel");
        levelcvs.setAttribute("width",faceSize);
        levelcvs.setAttribute("height",faceSize);
        ctxm.push(levelcvs.getContext('2d'));

        //レベル帯の中身作成
        let levelDivInner = document.createElement("div");
        levelDivInner.setAttribute("id", "levelInner" + num);
        levelDivInner.setAttribute("class", "menuLevelInner");

        //レベル帯のキャラ名表示作成
        let levelText1 = document.createElement("div");
        levelText1.setAttribute("id", "text1_" + num);
        levelText1.setAttribute("class", "textLevel");
        levelText1.innerHTML=faceName[num][0] + " " + priceText(workerSpeed[num]) + "/秒";
        if(workerSpeed[num][0]>=12){
            levelText1.setAttribute("style","font-size:8px; padding-top:3px; padding-bottom:4px");
        }

        //レベル帯の文章表示作成
        let levelText2 = document.createElement("div");
        levelText2.setAttribute("id", "text2_" + num);
        levelText2.setAttribute("class", "textLevel");
        if(autoSpeedLevel[num]==undefined||autoSpeedLevel[num]==0){
            levelText2.innerText="🔓";
        }else{
            levelText2.innerText="LEVEL:" + autoSpeedLevel[num];
        }

        //レベル帯の購入ボタン作成
        let levelButton = document.createElement("div");
        levelButton.setAttribute("id","button" + num);
        levelButton.setAttribute("class", "buttonLevel");
        if(autoSpeedLevel[num]==undefined||autoSpeedLevel[num]<100){
            levelButton.textContent = priceText(priceLevel[num]);
        }else{
            levelButton.textContent = "LEVEL MAX";
            levelButton.setAttribute("class", "buttonLevelM");
        }
        levelButton.setAttribute("style", "width:210px")


        //設置
        levelDivInner.appendChild(levelText1);
        levelDivInner.appendChild(levelText2);
        levelDivInner.appendChild(levelButton);
        levelDiv.appendChild(levelcvs);
        levelDiv.appendChild(levelDivInner);
        document.querySelector("#menu").appendChild(levelDiv);
        clickButton("button" + num);
        if(!continuefrag){
            autoSpeedLevel.push(0);
            priceLevel.push(nextLevel(priceLevel[priceLevel.length-1]));
        }
        if(num+2==priceLevel.length||autoSpeedLevel[faceName.length-1]==0){
            displayFace(faceName[num][1],faceName[num][2],ctxm[num],0.5);
            ctxm[num].drawImage(loadSystemImage[2],0,0,faceSize,faceSize);
        }else{
            displayFace(faceName[num][1],faceName[num][2],ctxm[num]);
        }
    }


    //レベル帯のボタンの色変化
    const menuLevelAble = () =>{
        for(j=0;j<autoSpeedLevel.length;j++){
            const e = document.getElementById("button"+j);
            if(e!==null){
                if(subcheck(priceLevel[j])&&autoSpeedLevel[j]<100){
                    e.className = "buttonLevelG"
                }else if(autoSpeedLevel[j]<100){
                    e.className = "buttonLevel"
                }else{
                    e.className = "buttonLevelM"
                }
            }
        }
    }
