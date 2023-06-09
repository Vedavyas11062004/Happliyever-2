const DeanSlot=require('../Models/DeanSlotSchema.js')
const BookSlot=require('../Models/BookSlotSchema.js')

const SlotBook = async (req, res) => {
  const { date, studentName } = req.body;
  const selectedSlot = await DeanSlot.findOneAndDelete({
    date,
  });
  console.log(selectedSlot);
  if (!selectedSlot) {
    return res.status(400).json({ message: "Invalid slot index" });
  }
  const slotBooking = await BookSlot.create({
    studentName,
    date,
    day: selectedSlot.day,
    time: selectedSlot.time,
  });

  res.json({ message: "Slot booked successfully" });
};
module.exports=SlotBook