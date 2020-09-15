const AirtablePlus = require('airtable-plus');  
const airtableBRAND = new AirtablePlus({
    baseID: process.env.AIR_TABLE_BASE_ID_BRAND_BUSINESS,
    apiKey: process.env.AIR_TABLE_API_KEY,
});

class IncubatorEntity {

    getActiveService = async() => {
        
        const res = await airtableBRAND.read({},{tableName:"IncubatorService"});
        
        var temp = []
        for(var i=0; i<res.length; i++) {
            if (res[i].fields.attachments) {
                res[i].fields.attachments = res[i].fields.attachments[0].url                
            } else {
                res[i].fields.attachments = "/assets/img/avatars/projects/project-1.jpg"
            }
            temp.push(res[i].fields)
        }
        console.log("IncubatorService information: ", temp)    
        return temp
    }
}

module.exports = IncubatorEntity;   