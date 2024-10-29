const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors())
const { run } = require("./pdfGenerator")




app.post('/generatePdf', async (req, res) => {
    try {
        await run(req.body.data, req.body.id);
        res.status(200).json({ status: true })
    } catch (error) {
        res.status(500).json({ status: false })
    }

});


app.listen(3000, () => {
    console.log("Server started..");

})