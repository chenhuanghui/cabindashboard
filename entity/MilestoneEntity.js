const AirtablePlus = require('airtable-plus');  
const airtableBRAND = new AirtablePlus({
    baseID: process.env.AIR_TABLE_BASE_ID_BRAND_BUSINESS,
    apiKey: process.env.AIR_TABLE_API_KEY,
});

class MilestoneEntity {
    helloWorld = () => {
        console.log("helloworld")
    }

    getActiveMilestoneByBrandID = async(brandID) => {        
        const res = await airtableBRAND.read({
            filterByFormula: `AND(Brand = "${brandID}", status = "1")`,
            sort: [ {field: 'milestoneDuedate', direction: 'asc'},]
        },{tableName:"Brand_Milestone"});
        
        var temp = []
        for(var i=0; i<res.length; i++) {
            temp.push(res[i].fields)
        }
        console.log("Brand_Milestone: ", temp)    
        
        return temp
    }
}

module.exports = MilestoneEntity;