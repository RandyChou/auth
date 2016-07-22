function uniq(array) {
    var n = {}, r=[]; //n为hash表，r为临时数组
    for(var i = 0; i < array.length; i++) //遍历当前数组
    {
        if (!n[array[i]]) //如果hash表中没有当前项
        {
            n[array[i]] = true; //存入hash表
            r.push(array[i]); //把当前数组的当前项push到临时数组里面
        }
    }
    return r;
}

export default {
    uniq
};