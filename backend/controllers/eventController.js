import Event from '../models/Event.js'; // Correct the import to match the model name

// Create a new event
export const createEvent = async (req, res) => {
  try {
    // Create a new event with the request body data
    const event = new Event(req.body);
    await event.save(); // Save the event to the database
    res.status(201).json(event); // Respond with the created event and status 201 (Created)
  } catch (error) {
    // Handle errors and respond with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};

// Get all events
export const getEvents = async (req, res) => {
  try {
    // Retrieve all events from the database
    const events = await Event.find();
    res.json(events); // Respond with the list of events
  } catch (error) {
    // Handle errors and respond with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
  try {
    // Retrieve the event by its ID
    const event = await Event.findById(req.params.id);
    if (!event) {
      // Respond with status 404 (Not Found) if the event does not exist
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event); // Respond with the event details
  } catch (error) {
    // Handle errors and respond with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};

// Update an event by ID
export const updateEvent = async (req, res) => {
  try {
    // Update the event with the given ID using the request body data
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      // Respond with status 404 (Not Found) if the event does not exist
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event); // Respond with the updated event details
  } catch (error) {
    // Handle errors and respond with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};

// Delete an event by ID
export const deleteEvent = async (req, res) => {
  try {
    // Delete the event with the given ID
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      // Respond with status 404 (Not Found) if the event does not exist
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted' }); // Respond with a success message
  } catch (error) {
    // Handle errors and respond with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};
