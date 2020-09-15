const AirtablePlus = require('airtable-plus');  
const airtableFEED = new AirtablePlus({
    baseID: process.env.AIR_TABLE_BASE_ID_FEED,
    apiKey: process.env.AIR_TABLE_API_KEY,
});

class FeedEntity {
    helloWorld = () => {
        console.log("helloworld")
    }

    getFeedByID = async(id) => {
        console.log("______ get brand by ID = ", id)    
        
        const feed = await airtableFEED.read({
            filterByFormula: `brandID = "${id}"`
        },{tableName:"Post"});
        console.log("brand information: ", feed)    
        
        var temp = []
        for(var i=0; i<feed.length; i++) {
            temp.push(feed[i].fields)
        }

        return temp
    }
}

module.exports = FeedEntity;