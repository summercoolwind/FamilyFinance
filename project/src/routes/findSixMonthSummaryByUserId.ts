export { };
const mongoose = require('mongoose');
// 查询最近6个月的收入或支出
const findSixMonthSummaryByUserId = async (userId, Model) => { 
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let incomes = [];
    month = month - 1;
     try {
        for (let index = 0; index < 6; index++) {
            if (month <= 0) {
                year -= 1;
                month += 12;
            }
            const preDate = new Date();
            preDate.setFullYear(year);
            preDate.setMonth(month);
            let total = await Model.aggregate([{
                $match: {
                    user: mongoose.Types.ObjectId(userId)
                }
            }, {
                $match: {
                    day: {
                        "$gte": preDate,
                        "$lte": date
                    }
                }
            }, {
                $group: {
                    _id: "$user",
                    total: { $sum: "$value" }
                }
            }]);
            month = month - 1;
            date = preDate;
            let totalNum = 0;
            total.forEach((element) => {
                totalNum += element.total;
            });
            incomes.push(totalNum);
        }
     } catch (err) { 
         console.log(err);
        return [0, 0, 0, 0, 0, 0].toString();
     }
    return incomes.reverse().toString();
}

module.exports = findSixMonthSummaryByUserId;