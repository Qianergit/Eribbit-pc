getdata=(skus)=>{
    const pathMap={}
   skus.forEach(sku=>{
    if(sku.inventory){
        const valueArr = sku.specs.map(val=>val.name)
        const valueArrPowerSet = powerset(valueArr)
        valueArrPowerSet.forEach(arr=>{
            const key = arr.join('h')
            if(pathMap[key]){
                pathMap[key]=sku.id
            }else{
                pathMap[key].push(sku.id)
            }
        })
    }
   })
   return(pathMap)
}
const getselec = (specs)=>{
    let arr=[]
    specs.forEach(item=>{
        const selecval = item.values.find(val=>val.selected)
        arr.push(selecval? selecval.name : undefined)
    })
}
const updataDIsabled = (specs)=>{
    const selecval = getselec(specs)
    specs.forEach(item=>{
        item.values.forEach(val=>{
            if(val.selected) return 
            selecval[i]=val.name
            const key = selecval.filter(valuess=>valuess).join('h')
            val.disable=!pathMap[key]
        })
    })
}