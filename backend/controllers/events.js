const eventRouter = require("express").Router();
const Event = require("../models/event");
const User = require("../models/user");

eventRouter.get("/", async (req, res, next) => {
  const events = await Event.find({}).populate("createdBy").populate("registeredBy");
  res.json(events);
});

eventRouter.post("/create-event", async (req, res, next) => {
  const {
    title,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    location,
    createdById,
  } = req.body;

  const user = await User.findById(createdById);

  const event = new Event({
    title,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    location,
    createdBy: user.id
  });

  const savedEvent = await event.save();
  user.myCreatedEvents = user.myCreatedEvents.concat(savedEvent._id);

  await user.save();

  res.status(201).json(savedEvent);
});

eventRouter.post("/register-event", async (req, res) => {
  // event with "eventId" is being registered by the user with the "userId".
  const { eventId, userId } = req.body;

  const user = await User.findById(userId);
  const event = await Event.findById(eventId);

  event.registeredBy = event.registeredBy.concat(userId);
  await event.save();
  
  user.eventsRegisteredTo = user.eventsRegisteredTo.concat(eventId);
  await user.save();

  res.status(201).json(event);
})

module.exports = eventRouter;
