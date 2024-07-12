const express = require("express");
const path = require("path");
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/assets", express.static(path.resolve(__dirname, "assets")));

app.get("/contactus.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "contactus.html"));
});

app.get("/aboutus.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "aboutus.html"));
});

app.get("/projects.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "projects.html"));
});

app.get("/co-investment.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "co-investment.html"));
});

app.get("/project-partnership.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "project-partnership.html"));
});

app.get("/co-Ownership.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "co-Ownership.html"));
});

app.get("/Joint-Venture.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Joint-Venture.html"));
});

app.get("/data/regddc.json", (req, res) => {
    res.sendFile(path.resolve(__dirname, "data/regddc.json"));
});


app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
});

app.post('/sendmail', async (req, res) =>{
    console.log(req.body)
    var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
          user: 'segxy2708@hotmail.com',
          pass: 'se0103?2015gun'
        }
      });

      var messageBody = '<p><b>Name: </b>' + req.body.name + '<br />' +
      '<b>Email: </b>' + req.body.email + '<br />' +
      '<b>Subject: </b>' + req.body.subject + '<br />' +
      '<b>Message: </b>' + req.body.message + '</p>'
      
      var mailOptions = {
        from: 'segxy2708@hotmail.com',
        to: 'info@regenerationddc.com',
        //to: 'segun@impartlab.com',
        subject: 'Inquiry: ' + req.body.subject + ' Automation Test',
        //text: JSON.stringify(req.body)
        html: messageBody
      };
      try{

      var response = [];
      await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.status(500).end(JSON.stringify(error));
        } else {
          console.log('Email sent: ' + info.response);
          const jsonContent = JSON.stringify('request successful');
          res.status(200).end(jsonContent);
        }
      });
    
    
      }catch{
        
      }
})

app.listen(process.env.PORT || 8000, () => console.log("Server is up and running..."));