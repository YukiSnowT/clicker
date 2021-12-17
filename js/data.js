//セーブ


// let savedata = null;//セーブデータ
// let continuefrag = true;
// let viewXY = [0,0];//canvas上でのカーソルの場所

// let autoSpeedSum = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];//秒間加算金額
// let autoSpeedLevel = [];//被雇用者のレベル
// let clickLevel = 1;//クリックレベル
// let clickGet = [0,1,0];//1クリック価格
// let clickPrice = [0,10,0];//次の必要額
// let timeCount = 0;//経過時間
// let priceLevel = [[0,100,0]];//各人の現在雇用価格[最初の桁,最初の桁の数、次の桁の数]
// let workerSpeed = [[0,10,0],[0,100,0]];//被雇用者の初期金額（不変）
// let myPrice = [0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]//所持金
// let gameStart = false;


const dataSave = () =>{
    savedata = [autoSpeedSum,autoSpeedLevel,clickLevel,clickGet,clickPrice,priceLevel,workerSpeed,myPrice,sumMyPrice]//ここに必要データを配列で格納
    localStorage.setItem("mydata",JSON.stringify(savedata));
}

const dataLoad = () => {
    if(!localStorage.getItem("mydata")){
        continuefrag = false;
        //データがない場合の処理
    }else{
        //savedataに格納されていた順番で各変数に値を戻す
        savedata = localStorage.getItem("mydata");
        savedata = JSON.parse(savedata);
        getArrayData(savedata[0],autoSpeedSum);
        getArrayData(savedata[1],autoSpeedLevel);
        clickLevel = savedata[2];
        getArrayData(savedata[3],clickGet);
        getArrayData(savedata[4],clickPrice);
        getArrayData(savedata[5],priceLevel);
        getArrayData(savedata[6],workerSpeed);
        getArrayData(savedata[7],myPrice);
        getArrayData(savedata[8],sumMyPrice);
        
    }
}

//データ専用配列への格納。入れるデータ、入れられるデータの順
const getArrayData = (arrayData,inData) =>{
    for(i=0;i<arrayData.length;i++){
        if(inData[i]===undefined){
            inData.push(arrayData[i]);
        }else{
            inData[i]=arrayData[i];
        }
    }
}