const AirtablePlus = require('airtable-plus');  
const airtableBRAND = new AirtablePlus({
    baseID: process.env.AIR_TABLE_BASE_ID_BRAND_BUSINESS,
    apiKey: process.env.AIR_TABLE_API_KEY,
});

class PromotionEntity {
    helloWorld = () => {
        console.log("helloworld")
    }

    getActivePromotionByBrandID = async(brandID) => {        
        const res = await airtableBRAND.read({
            filterByFormula: `AND(Brand = "${brandID}", status = "1")`,
            maxRecords: 1
        },{tableName:"Brand_Promotion"});
        console.log("Brand_Promotion: ", res)    
        
        var temp = res[0].fields
        if (res[0].fields.promotionAttachments) {
            temp.promotionAttachments = res[0].fields.promotionAttachments[0].url
        }
        

        return temp
    }
}

module.exports = PromotionEntity;