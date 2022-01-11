    //myPriceから減算する
    const subPrice = (price) =>{
        let myP = myPrice[price[0]+1] * 10000 + myPrice[price[0]];
        const subP = price[2]*10000+price[1];
        let n = 0;
        if(myP<subP){
            for(i=price[0]+2;i<myPrice.length;i++){
                if(myPrice[i]>0){
                    myPrice[i]--;
                    for(j=i-1;j>price[0]+1;j--){
                        myPrice[j]=9999;
                    }
                    myP += 100000000;
                    break;
                }
            }
        }
        n = myP-subP;
        myPrice[price[0]]=n%10000;
        myPrice[price[0]+1]=Math.floor(n/10000);
    }

    //myPriceを繰り上げする
    const advMyprice = (forprice=myPrice) =>{
        for(i=0;i<forprice.length-1;i++){
            if(forprice[i]>9999){
                while(forprice[i]>9999){
                    forprice[i] -= 10000;
                    forprice[i+1]++;
                }
            }
        }
    }

    //priceを繰り上げする
    const advprice = (price) =>{
        let num = price[2]*10000+price[1];
        let q=[price[0],price[1],price[2]]
        if(q[2]>9999){
            q[1]++;
            q[2] -=10000;
        }
        if(num>99999999){
            q[0]++;
            num = Math.floor(num/10000);
        }
        q[1] = Math.round(num%10000);
        q[2] = Math.floor(num/10000);
        return q;
    }

    //myPriceに加算する
    const addPrice = (price,forprice =myPrice) =>{
        forprice[price[0]] += price[1];
        forprice[price[0]+1] += price[2];
        advMyprice(forprice);
    }


    //priceがmyPriceから減算可能かチェック
    const subcheck = (price) =>{
        let checker = false;
        let need = price[2]*10000+price[1]
        let have = 0;
        for(i=price[0]+2;i<myPrice.length;i++){
            have+= myPrice[i];
        }
        if(have>0){
            checker = true;
        }else{
            have = myPrice[price[0]+1]*10000+myPrice[price[0]];
            if(have>=need){
                checker = true;
            }
        }
        return checker;
    }

        //現在のautoSpeedSumの計算
        const culSum = () =>{
            for(i=0;i<autoSpeedSum.length;i++){
                autoSpeedSum[i]=0
            }
            for(i=0;i<faceName.length;i++){
                let n = [0,0,0];
                if(autoSpeedLevel[i]!==undefined){
                    n[0] = workerSpeed[i][0]
                    n[1] = workerSpeed[i][1]*autoSpeedLevel[i]*autoSpeedLevel[i]//加算速度
                    n[2] = workerSpeed[i][2]*autoSpeedLevel[i]*autoSpeedLevel[i]
                    n = advprice(n);
                    autoSpeedSum[n[0]] += n[1];
                    autoSpeedSum[n[0]+1] += n[2];
                }
            }
        }

    //次のレベルをセット
    const nextLevel = (price) =>{
        let p = [price[0],0,0]
        const n = autoSpeedLevel.length+1;
        let x = price[2]*10000+price[1];
        x = n*n*n*x
        if(x>99999999){
            p[0]++;
            x = Math.floor(x/10000);
        }
        p[1]=x%10000;
        p[2]=Math.floor(x/10000);
        return p;
    }

    //priceのテキスト
    const priceText = (price) =>{
        let karitext = currency;
        if(price[1]!==0){
            karitext = price[1] + digit[price[0]] + karitext; 
        }
        if(price[2]!==0){
            karitext = price[2] + digit[price[0]+1] + karitext; 
        }
        if(karitext===currency){
            karitext = "0" + currency;
        }
        return karitext;
    }

    //現在のsumMyPriceからグラ番号を求める
    const monsterSumNum = () =>{
        let b = 0;
        let num = 0;
        for(i=sumMyPrice.length;i>0;i--){
            if(sumMyPrice[i]>0){
                b = i;
                break;
            }
        }
        if(Math.floor(sumMyPrice[b]/100)>0){
            num = b*2+1;
        }else{
            num = b*2;
        }
        return num;
    }

    //現在のsumMyPriceから敵のHP割合を求める
    const monsterHP = () =>{
        let b = 0;
        let num = 0;
        for(i=sumMyPrice.length;i>0;i--){
            if(sumMyPrice[i]>0){
                b = i;
                break;
            }
        }
        if(Math.floor(sumMyPrice[b]/100)>0){
            num = Math.ceil(100-((sumMyPrice[b]-100)/99));
        }else{
            num = Math.ceil(100-((sumMyPrice[b]-1)/0.99));
        }
        return num/100;
    }