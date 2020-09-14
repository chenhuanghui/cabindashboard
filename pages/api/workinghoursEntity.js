const AirtablePlus = require('airtable-plus');  
const airtableBRAND = new AirtablePlus({
    baseID: process.env.AIR_TABLE_BASE_ID_BRAND_BUSINESS,
    apiKey: process.env.AIR_TABLE_API_KEY,
});

class WorkingHoursEntity {
    helloWorld = () => {
        console.log("helloworld")
    }

    getWorkingHoursByBrandID = async(brandID) => {
        console.log("______ get brand by ID = ", brandID)    
        
        const res = await airtableBRAND.read({
            filterByFormula: `Brand = "${brandID}"`,
            maxRecords: 1
        },{tableName:"WorkingHours"});

        var temp = []
        for(var i=0; i<res.length; i++) {
            temp.push(res[i].fields)
        }
        console.log("WorkingHours information: ", temp)    
        return temp[0]
    }
}

module.exports = WorkingHoursEntity;