import { parseCookies, setCookie, destroyCookie } from 'nookies'

const AirtablePlus = require('airtable-plus');  
const airtable = new AirtablePlus({
    baseID: 'appmREe03n1MQ6ydq',
    apiKey: 'keyLNupG6zOmmokND',
    tableName: 'Brand',
});

async function retrieveData(formular,tbName) {
    try {
      const readRes = await airtable.read(formular,{tableName:tbName});
      return readRes
    } catch(e) {
      console.error(e);
    }
}

export function getAllOnboarding() {
    retrieveData({
        view: `GroupByCollection1`,
        filterByFormula: {},
        sort: [{field: 'orderInCollection', direction: 'asc'}]
    },'Onboarding')
    .then(result => {
        console.log('Onboarding controller:', result);
        return result
    })
}