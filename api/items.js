const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

module.exports = async function handler(req, res) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
 res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
 res.setHeader('Cache-Control', 'no-store');

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      res.status(200).json(data);

    } else if (req.method === 'POST') {
      const { data, error } = await supabase
        .from('items')
        .insert([req.body])
        .select()
        .single();
      if (error) throw error;
      res.status(200).json(data);

    } else if (req.method === 'PUT') {
      const { id, ...updates } = req.body;
      const { data, error } = await supabase
        .from('items')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      res.status(200).json(data);

    } else if (req.method === 'DELETE') {
      const { id } = req.body;
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id);
      if (error) throw error;
      res.status(200).json({ success: true });

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
