const supabase = require('../config/supabaseClient');

// how to get GET ALL EVENTS (Admin + User) 
exports.getAllEvents = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });

    if (error) throw error;

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// how to GET SINGLE EVENT (Admin + User) 
exports.getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Event not found' });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// how to CREATE EVENT (Admin only) 
exports.createEvent = async (req, res) => {
  const { title, description, location, date, capacity } = req.body;

  try {
    const { data, error } = await supabase
      .from('events')
      .insert([{ title, description, location, date, capacity }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ message: 'Event created successfully', event: data });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// how to UPDATE EVENT (Admin only) 
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, location, date, capacity } = req.body;

  try {
    const { data, error } = await supabase
      .from('events')
      .update({ title, description, location, date, capacity })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Event not found' });

    res.status(200).json({ message: 'Event updated successfully', event: data });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// this is how to DELETE EVENT (for the Admin only) 
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};