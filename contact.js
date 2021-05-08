const mongoose = require('mongoose');
const moment = require('moment');

const mongopassword=process.env.mongoPassword //Hide at end

const dbUrl="mongodb+srv://web-user:"+mongopassword+"@ir-cluster.c9zhs.mongodb.net/ir?retryWrites=true&w=majority"
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});

const contactSchema={name:String, email:String, date:String, organization:String, designation:String, subject:String, message:String}
const Contact = mongoose.model('Contact',contactSchema)

function submitContact(req,res){
  const newContact = new Contact(req.body)
  newContact.date = moment().utcOffset(330).format('YYYY MM DD HH:mm:ss')
  newContact.save()
  acknowledge(req,res,newContact)
}

function acknowledge(req,res,submittedContact){
  res.render('contactsuccess',{contact: submittedContact})
}

exports.submitContact=submitContact

const subscriberSchema={email:{
    type: String,
    validate: {
      validator: function(v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      }},
    required: true
  }}

const Subscriber = mongoose.model('Subscriber',subscriberSchema)

function saveEmail(req,res){
  const newSubscriber = new Subscriber(req.body)
  newSubscriber.save()
  res.redirect('/')
}

exports.saveEmail=saveEmail
