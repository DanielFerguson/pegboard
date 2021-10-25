export default function handler(req, res) {
    if (req.method === 'POST') {
        var Airtable = require('airtable');
        var base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE);

        base('Requests').create([{
            "fields": {
                "Name": req.query.name
            }
        }], function(err, records) {
            if (err) {
                return res.json({ message: err })
            }
            return res.json({ message: records })
        });
    }
}