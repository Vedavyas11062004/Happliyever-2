const BookSlot=require('../Models/BookSlotSchema')

const freeSlots = async (req, res) => {
  const allpendingSlots = await BookSlot.find();
  res.json({ sessions: allpendingSlots });
};

module.exports=freeSlots