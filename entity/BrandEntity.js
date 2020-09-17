const AirtablePlus = require('airtable-plus');  
const airtableBRAND = new AirtablePlus({
    baseID: process.env.AIR_TABLE_BASE_ID_BRAND_BUSINESS,
    apiKey: process.env.AIR_TABLE_API_KEY,
});
const airtableFEED = new AirtablePlus({
    baseID: process.env.AIR_TABLE_BASE_ID_FEED,
    apiKey: process.env.AIR_TABLE_API_KEY,
});
const airtableUSER = new AirtablePlus({
    baseID: process.env.AIR_TABLE_BASE_ID_USER,
    apiKey: process.env.AIR_TABLE_API_KEY,
});
const airtableSOPERATION = new AirtablePlus({
    baseID: process.env.AIR_TABLE_BASE_ID_SOPERATION,
    apiKey: process.env.AIR_TABLE_API_KEY,
});

class BrandEntity {
    helloWorld = () => {
        console.log("helloworld")
    }

    getBrandByID = async(id) => {
        console.log("______ get brand by ID = ", id)    
        
        const brandData = await airtableBRAND.read({
            filterByFormula: `ID = "${id}"`,
            maxRecords: 1
        },{tableName:"Brand"});
        console.log("brand information: ", brandData)    
        
        return brandData[0].fields
    }

    getFirstBrandByUserID = async(uID) => {
        const brandData = await airtableBRAND.read({
            filterByFormula: `userID = "${uID}"`,
            maxRecords: 1
        },{tableName:"Brand_User"});
        
        console.log("Brand_User information: ", brandData)      
        if (brandData.length > 0) return brandData[0].fields
        return []
    }
}

module.exports = BrandEntity;