use Finance
db.Right.drop()
db.Right.insert({"name" : "AddUser","id":1})
db.Right.insert({"name" : "QueryUser","id":2})
db.Right.insert({"name" : "DeleteUser","id":3})
db.Right.insert({"name" : "UpdateUser","id":4})
db.Right.insert({"name" : "AddFamily","id":5})
db.Right.insert({"name" : "QueryFamily","id":6})
db.Right.insert({"name" : "DeleteFamily","id":7})
db.Right.insert({"name" : "UpdateFamily","id":8})
db.Right.insert({"name" : "AddUserMoney","id":9})
db.Right.insert({"name" : "QueryUserMoney","id":10})
db.Right.insert({"name" : "DeleteUserMoney","id":11})
db.Right.insert({"name" : "UpdateUserMoney","id":12})
db.Right.insert({"name" : "AddFamilyMoney","id":13})
db.Right.insert({"name" : "QueryFamilyMoney","id":14})
db.Right.insert({"name" : "DeleteFamilyMoney","id":15})
db.Right.insert({"name" : "UpdateFamilyMoney","id":16})
db.Role.drop()
db.Role.insert({"name" : "Admin","id":0});
db.Role.insert({"name" : "Guest","id":1})
db.RoleRight.drop()
db.RoleRight.insert({"rightId":1,"roleId":0,"id":0})
db.RoleRight.insert({"rightId":2,"roleId":0,"id":0})
db.RoleRight.insert({"rightId":3,"roleId":0,"id":0})
db.RoleRight.insert({"rightId":4,"roleId":0,"id":0})
db.RoleRight.insert({"rightId":5,"roleId":0,"id":0})
db.RoleRight.insert({"rightId":6,"roleId":0,"id":0})
db.RoleRight.insert({"rightId":7,"roleId":0,"id":0})
db.RoleRight.insert({"rightId":8,"roleId":0,"id":0})
db.RoleRight.insert({"rightId":9,"roleId":0,"id":0})
db.RoleRight.insert({"rightId":10,"roleId":0,"id":0})
db.RoleRight.insert({"rightId":11,"roleId":0,"id":0})
db.RoleRight.insert({"rightId":12,"roleId":0,"id":0})
db.RoleRight.insert({"rightId":13,"roleId":0,"id":0})
db.RoleRight.insert({"rightId":14,"roleId":0,"id":0})
db.RoleRight.insert({"rightId":15,"roleId":0,"id":0})
db.RoleRight.insert({"rightId":16,"roleId":0,"id":0})
db.FinanceType.insert({"typeName": "指数基金","dayRateReturn": 0,"isPeriod": false,"isCompound": false,})
db.FinanceType.insert({"typeName": "房产","dayRateReturn": 0,"isPeriod": false,"isCompound": false,})