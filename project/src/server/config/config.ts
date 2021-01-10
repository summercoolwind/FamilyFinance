const CONFIG = {
    apiHost:'127.0.0.1',
    apiPort:3030,
    protocol:'http',
    dbName:'Finance',
    dbHost:"127.0.0.1",
    dbPort:27017,
    app:{
        title:"Family Finance",
        description:'Family Finance System',
        head:{
            titleTemplate:'Finance',
            meta:[
                {
                    name:"描述",
                    content:"家庭金融管理系统"
                },
                {charset:"utf-8"}
            ]
        }
    }
}

export default CONFIG;