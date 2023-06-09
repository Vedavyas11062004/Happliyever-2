const DeanSlot = require("../Models/DeanSlotSchema.js");
// const BookSlot = require("./Models/BookSlotSchema.js");

const creatingSlots = async (req, res) => {
  const now = new Date();
  const nextThursday = new Date(now);
  nextThursday.setDate(now.getDate() + ((4 - now.getDay() + 7) % 7));
  nextThursday.setHours(10, 0, 0, 0);
  const nextFriday = new Date(nextThursday);
  nextFriday.setDate(nextThursday.getDate() + 1);

  for (let i = 0; i < 4; i++) {
    const slotStart = new Date(nextThursday);
    const slotEnd = new Date(nextFriday);

    const slotinfoThursday = await DeanSlot.create({
      date:
        slotStart.getDate() +
        "-" +
        slotStart.getMonth() +
        "-" +
        slotStart.getFullYear(),
      time: "10:00 AM",
      day: "Thursday",
    });
    const slotinfoFriday = DeanSlot.create({
      date:
        slotEnd.getDate() +
        "-" +
        slotEnd.getMonth() +
        "-" +
        slotEnd.getFullYear(),
      time: "10:00 AM",
      day: "Friday",
    });

    nextThursday.setDate(nextThursday.getDate() + 7);
    nextFriday.setDate(nextFriday.getDate() + 7);
  }

  res.json({
    slots: "sucessfully created free slots",
  });
};

module.exports = creatingSlots;
