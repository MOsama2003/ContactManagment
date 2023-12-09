
const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
//@desc Get all Contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async(req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id});
  res.status(200).json(contacts);
});

//@desc Get all Contacts
//@route GET /api/contacts
//@access public
const createContact = asyncHandler(async(req, res) => {
  console.log(req.body);
  const {name, email, phone} = req.body;
  if( !name || !email || !phone){
    res.status(400);
    throw new Error("All Fields are Mandatory")
  }
  const contact = await Contact.create(
    {
      name,
      email,
      phone,
      user_id: req.user.id
    }
  );
  res.status(201).json(contact);
});

//@desc Get all Contacts
//@route GET /api/contacts
//@access public
const getContact = asyncHandler(async(req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404)
    throw new Error("Contact Not Found")
  }
  res.status(200).json(contact);
});

//@desc Get all Contacts
//@route GET /api/contacts
//@access public
const updateContact = asyncHandler(async(req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404)
    throw new Error("Contact Not Found")
  }
  if(contact.user_id.toString() !== req.user.id){
    res.status(403)
    throw new Error("You can not update others Contacts")
  }
  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.status(200).json(updatedContact);
});

//@desc Get all Contacts
//@route GET /api/contacts
//@access public
const deleteContact = asyncHandler(async(req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404)
    throw new Error("Contact Not Found")
  }
  
  if(contact.user_id.toString() !== req.user.id){
    res.status(403)
    throw new Error("You can not delete others Contacts")
  }
  await contact.deleteOne(_id : req.params.id);
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
