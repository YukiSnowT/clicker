//読み込み
const start = () =>{
    displayNowLoading();
    setMonsterImage();
    imgLoad(systemImages,loadSystemImage);
    imgLoad(monsterImages,loadMonsterImage);
    imgLoad(faceImages,loadFaceImage);
    setSpeed();
    const times = setInterval(function (){
        if(loadTime==0){
            //読み込み完了
            clearInterval(times);
            opening();
        }
    },1)
}

//読み込み完了後の動作
const opening = () =>{
    clickView();
    clickEvent();
    displayOpening();
}


//オープニング画面の描画
const displayOpening = () =>{
    openingAnime = setInterval(openingAnimation,1000/30)

}

//オープニングアニメ総合
const openingAnimation = () =>{
    ctx.clearRect(0, 0,cvx,cvy);
    openingTitle();
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    ctx.fillStyle="#000"
    ctx.font = "normal " + cvy/16 + "px serif";
    openingButton(cvx*2/3,0,cvx/3,cvy/10,1);
    ctx.fillText("HOW TO PLAY", cvx*5/6, cvy/20, cvx/3*0.8);
    openingButton(cvx*2/3,cvy/10,cvx/3,cvy/10,1);
    ctx.fillText("クレジット", cvx*5/6, cvy/20*3, cvx/3*0.8);
    openingButton(0,0,cvx/4,cvy/12,2);
    ctx.fillStyle="#fa0"
    ctx.font = "bold " + cvy/20 + "px sans";
    ctx.fillText("データ削除", cvx/8, cvy/24, cvx/4*0.8);
    ctx.globalAlpha=0.85
    ctx.fillStyle="#000"
    openingMsg(openingMessage);
}

//タイトル画面とTAP TO STARTの表記
const openingTitle = () =>{
    const xx = loadSystemImage[0].width;
    const yy = loadSystemImage[0].height;
    ctx.globalAlpha=1;
    ctx.drawImage(loadSystemImage[0],(yy*cvx-xx*cvy)/2/yy,0,xx/yy*cvy,cvy);
    openingCount++;
    if(openingCount>60){
        openingCount = 0;
    }
    ctx.globalAlpha = (openingCount>=30) ? 1 : Math.abs((openingCount-15)/15);
    ctx.font = "bold " + Math.max(cvy/8,12) + "px Impact";
    ctx.fillStyle="#fff"
    ctx.strokeStyle="#000"
    ctx.textAlign='center';
    ctx.textBaseline='ideographic';
    ctx.lineWidth = 2;
    ctx.fillText("T A P   T O   S T A R T", cvx/2, cvy-5, cvy);
    ctx.strokeText("T A P   T O   S T A R T", cvx/2, cvy-5, cvy);
}

//ボタンの表示。x位置、y位置、幅、高さ、ボタン番号1or2
const openingButton = (x,y,wid,hei,numb,alp=1) =>{
    ctx.globalAlpha=alp;
    const xxx = loadSystemImage[numb+2].width;
    const yyy = loadSystemImage[numb+2].height
    ctx.drawImage(loadSystemImage[numb+2],0,0,xxx/3,yyy,x,y,xxx*hei/3/yyy,hei);
    ctx.drawImage(loadSystemImage[numb+2],xxx*2/3,0,xxx/3,yyy,x+wid-xxx*hei/3/yyy,y,xxx*hei/3/yyy,hei);
    ctx.drawImage(loadSystemImage[numb+2],xxx/3,0,xxx/3,yyy,x+xxx*hei/3/yyy,y,wid-xxx*hei/3/yyy*2,hei);
}

//HOWTOPLAYは1、クレジットは2、データ削除確認は3、データ削除完了は4
const openingMsg = (num) =>{
    if(num === 1){
        ctx.drawImage(loadSystemImage[5],0,0,cvx,cvy);
        ctx.textAlign='center';
        ctx.textBaseline='top';
        ctx.globalAlpha=1
            ctx.fillStyle="#000"
        ctx.font = "bold " + cvy/15 + "px sans";
        ctx.fillText("HOW TO PLAY",cvx/2,8);
        ctx.textAlign='left';
        ctx.textBaseline='top';
        ctx.font = "normal " + cvy/20 + "px sans";
        ctx.fillText("①　モンスターをタップしてぶん殴ります。",10,cvx/18+20,cvx-10);
        ctx.fillText("　　殴れば殴るほどお金がもらえます。",10,cvx/18*2+20,cvx-10);
        ctx.fillText("②　お金が溜まったらレベル枠をタップ。",10,cvx/18*3+20,cvx-10);
        ctx.fillText("　　レベルアップするともらえるお金が増えます。",10,cvx/18*4+20,cvx-10);
        ctx.fillText("　　この世界では経験値はお金で買えます。",10,cvx/18*5+20,cvx-10);
        ctx.fillText("③　溜まったお金を使って下画面から人を雇えば",10,cvx/18*6+20,cvx-10);
        ctx.fillText("　　放っておいても勝手にお金が増えます。",10,cvx/18*7+20,cvx-10);
        ctx.fillText("　　ついでに雇った人もお金でレベルアップできます。",10,cvx/18*8+20,cvx-10);
        ctx.fillText("④　約10秒ごとにオートセーブ。いつでも中断できます。",10,cvx/18*9+20,cvx-10);
        ctx.font = "bold " + cvy/8 + "px HGP行書体";
        ctx.textAlign='center';
        ctx.fillText("殴って、雇って、稼ぎまくれ！",cvx/2,cvx/18*10+20,cvx-10);
    }else if(num === 2){
        ctx.drawImage(loadSystemImage[5],0,0,cvx,cvy);
        ctx.textAlign='center';
        ctx.textBaseline='top';
        ctx.globalAlpha=1
            ctx.fillStyle="#000"
        ctx.font = "bold " + cvy/15 + "px sans";
        ctx.fillText("クレジット",cvx/2,10);
        ctx.textAlign='left';
        ctx.textBaseline='top';
        ctx.font = "normal " + cvy/20 + "px sans";
        ctx.fillText("七三ゆきのアトリエ　様",10,cvx/18+25,cvx-10);
        ctx.fillText("https://nanamiyuki.com/",10,cvx/18*2+25,cvx-10);
        ctx.fillText("森の奥の隠れ里　様",10,cvx/18*4+25,cvx-10);
        ctx.fillText("http://fayforest.sakura.ne.jp/",10,cvx/18*5+25,cvx-10);
        ctx.fillText("いらすとや　様",10,cvx/18*7+25,cvx-10);
        ctx.fillText("https://www.irasutoya.com/",10,cvx/18*8+25,cvx-10);
    }else if(num === 3){
        ctx.drawImage(loadSystemImage[5],0,0,cvx,cvy);
        ctx.textAlign='center';
        ctx.textBaseline='top';
        ctx.globalAlpha=1
            ctx.fillStyle="#f63"
        ctx.font = "bold " + cvy/10 + "px sans";
        ctx.fillText("!!CAUTION!!",cvx/2,10);
        ctx.textAlign='left';
        ctx.textBaseline='top';
        ctx.fillStyle="#000"
        ctx.font = "normal " + cvy/20 + "px sans";
        ctx.fillText("・保存されたデータをすべて削除します。",10,cvx/18+30,cvx-10);
        ctx.fillText("・レベル、所持金、雇った人や倒した敵も初期化されます。",10,cvx/18*2+30,cvx-10);
        ctx.fillText("・削除されたデータを復元することは出来ません。",10,cvx/18*3+30,cvx-10);
        ctx.fillText("・周回特典などは一切ありません。",10,cvx/18*4+30,cvx-10);
        ctx.textAlign='center';
        ctx.font = "bold " + cvy/15 + "px sans";
        ctx.fillText("本当に削除してよろしいですか？",cvx/2,cvx/18*6+30,cvx-10);
        openingButton(cvx/8,cvx/18*7+40,cvx/4,cvy/6,1);
        openingButton(cvx*5/8,cvx/18*7+40,cvx/4,cvy/6,1);
        ctx.textBaseline='middle';
        ctx.fillText("はい",cvx/4,cvx/18*7+40+cvy/12,cvx/6);
        ctx.fillText("いいえ",cvx*3/4,cvx/18*7+40+cvy/12,cvx/6);
    }else if(num === 4){
        openingButton(0,cvy/3,cvx,cvy/3,2)
        ctx.textAlign='center';
        ctx.textBaseline='top';
        ctx.globalAlpha=1
            ctx.textBaseline='middle';
        ctx.fillStyle="#fff"
        ctx.font = "bold " + cvy/10 + "px sans";
        ctx.fillText("☠データを削除しました☠",cvx/2,cvy/2,cvy-10);
    }
}