const eventRouter = require("express").Router();
const Event = require("../models/event");
const User = require("../models/user");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");
const helpers = require("../utils/helpers");

eventRouter.get("/", async (req, res, next) => {
  const events = await Event.find({});
  // .populate("createdBy")
  // .populate("registeredBy");
  res.json(events);
});

eventRouter.get("/:eventId", async (req, res) => {
  const { eventId } = req.params;

  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(401).json({
      error: "event not found!",
    });
  }

  res.status(200).json(event);
});

eventRouter.post("/create-event", async (req, res) => {
  const {
    title,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    location,
    imgTheme,
    eventImages,
  } = req.body;

  const decodedToken = jwt.verify(helpers.getTokenFrom(req), config.SECRET_KEY);
  const user = await User.findById(decodedToken.id);

  if (!user) {
    return res.status(401).json({
      error: "token invalid",
    });
  }

  const event = new Event({
    title,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    location,
    createdBy: user.id,
    imgTheme,
    eventImages,
  });

  const savedEvent = await event.save();
  user.myCreatedEvents = user.myCreatedEvents.concat(savedEvent._id);

  await user.save();

  res.status(201).json(savedEvent);
});

eventRouter.post("/register-event", async (req, res) => {
  // event with "eventId" is being registered by the user with the "userId".
  const { eventId } = req.body;

  const decodedToken = jwt.verify(helpers.getTokenFrom(req), config.SECRET_KEY);
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(401).json({
      error: "invalid user credentials",
    });
  }

  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(404).json({
      error: "Event not found",
    });
  }
  try {
    event.registeredBy = event.registeredBy.concat(decodedToken.id);
    await event.save();

    user.eventsRegisteredTo = user.eventsRegisteredTo.concat(eventId);
    await user.save();
  } catch (err) {
    console.log(err);
  }

  res.status(201).json(event);
});

eventRouter.post("/deregister-event", async (req, res) => {
  // event with "eventId" is being registered by the user with the "userId".
  const { eventId } = req.body;

  const decodedToken = jwt.verify(helpers.getTokenFrom(req), config.SECRET_KEY);
  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(401).json({
      error: "invalid user credentials",
    });
  }

  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(404).json({
      error: "Event not found",
    });
  }
  try {
    event.registeredBy = event.registeredBy.filter(
      (id) => id.toString() !== decodedToken.id
    );
      await event.save();
      
      console.log();
    user.eventsRegisteredTo = user.eventsRegisteredTo.filter(
      (id) => id.toString() !== eventId
    );
    await user.save();
  } catch (error) {
    console.error("Error deregistering event:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }

  res.status(201).json(event);
});

eventRouter.put("/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const dataToUpdate = req.body;
  try {
    const event = await Event.findById(eventId);

    // Only the user who created this event can modify the event.
    const user = await User.find({ _id: event.createdBy });
    const decodedToken = jwt.verify(
      helpers.getTokenFrom(req),
      config.SECRET_KEY
    );

    // Check if the authenticated user is same as the one whoc created this event.
    if (user[0]._id.toString() !== decodedToken.id) {
      return res.status(401).json({
        error: "Unauthorized access: User credentials not found!",
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, dataToUpdate, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({
        error: "Event Not Found!",
      });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

eventRouter.delete("/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;

    // Find the event by ID
    const event = await Event.findById(eventId);

    // Check if the event exists
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Only the user who created this event can delete.
    const user = await User.find({ _id: event.createdBy });
    const decodedToken = jwt.verify(
      helpers.getTokenFrom(req),
      config.SECRET_KEY
    );

    // Check if the authenticated user is same as the one whoc created this event.
    if (user[0]._id.toString() !== decodedToken.id) {
      return res.status(401).json({
        error: "Unauthorized access: User credentials not found!",
      });
    }

    // Remove the event ID from eventsRegisteredTo field of all users who registered for the event
    await User.updateMany(
      { eventsRegisteredTo: eventId },
      { $pull: { eventsRegisteredTo: eventId } }
    );

    // Remove the event ID from myCreatedEvents field of the user who created the event
    await User.updateOne(
      { _id: event.createdBy },
      { $pull: { myCreatedEvents: eventId } }
    );

    // Delete the event document
    await Event.findByIdAndDelete(eventId);

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = eventRouter;
