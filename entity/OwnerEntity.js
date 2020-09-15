const AirtablePlus = require('airtable-plus');  
const airtableBRAND = new AirtablePlus({
    baseID: process.env.AIR_TABLE_BASE_ID_BRAND_BUSINESS,
    apiKey: process.env.AIR_TABLE_API_KEY,
});

class OwnerEntity {
    helloWorld = () => {
        console.log("helloworld")
    }

    getOwnerByBrandID = async(brandID) => {
        console.log("______ get brand by ID = ", brandID)    
        
        const res = await airtableBRAND.read({
            filterByFormula: `Brand = "${brandID}"`,
            maxRecords: 1
        },{tableName:"Brand_Owner"});
        
        
        var temp = null
        if (res.length > 0) {temp = res[0].fields}
        console.log("Brand_Owner: ", temp)
        return temp
    }
}

module.exports = OwnerEntity;