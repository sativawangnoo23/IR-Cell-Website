const mongoose = require('mongoose');
const moment = require('moment');

const mongopassword="YKTKDMgSsdQSIbfV" //Hide at end

const dbUrl="mongodb+srv://web-user:"+mongopassword+"@ir-cluster.c9zhs.mongodb.net/ir?retryWrites=true&w=majority"
const contactSchema={name:String, email:String, date:String, organization:String, designation:String, subject:String, message:String}
const Contact = mongoose.model('Contact',contactSchema)

function submitContact(req,res){
  mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
  const newContact = new Contact(req.body)
  newContact.date = moment().utcOffset(330).format('YYYY MM DD HH:mm:ss')
  newContact.save()
  acknowledge(req,res,newContact)
}

function acknowledge(req,res,submittedContact){
  res.render('contactsuccess',{contact: submittedContact})
}

exports.submitContact=submitContact
