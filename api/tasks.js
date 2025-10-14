// Vercel Serverless Function - Turso Proxy
// Löst CORS-Problem

const TURSO_URL = 'https://dpolg-cleaning-maxwellbadger-1.aws-eu-west-1.turso.io';
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NTk4NDI1MzcsImlkIjoiZjY1ZWY2YzMtYWNhMS00NjZiLWExYjgtODU0MTlmYjlmNDNiIiwicmlkIjoiMTRjNDc4YjAtYTAwMy00ZmZmLThiYTUtYTZhOWIwYjZiODdmIn0.JSyu72rlp3pQ_vFxozglKoV-XMHW12j_hVfhTKjbEGwSyWnWBq2kziJNx2WwvvwD09NU-TMoLLszq2Mm9OlLDw';

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { action, taskId, newStatus } = req.body;

    let requests;

    if (action === 'getTasks') {
      // GET all tasks
      requests = [
        {
          type: "execute",
          stmt: {
            sql: "SELECT * FROM cleaning_tasks ORDER BY priority DESC, room_name ASC"
          }
        },
        {
          type: "close"
        }
      ];
    } else if (action === 'toggleTask') {
      // UPDATE task status (nur status, ohne completed_at da Spalte nicht existiert)
      requests = [
        {
          type: "execute",
          stmt: {
            sql: "UPDATE cleaning_tasks SET status = ? WHERE id = ?",
            args: [
              { type: "text", value: String(newStatus) },
              { type: "integer", value: String(taskId) }  // ← WICHTIG: value muss String sein!
            ]
          }
        },
        {
          type: "close"
        }
      ];
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }

    // Forward request to Turso
    const response = await fetch(`${TURSO_URL}/v2/pipeline`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TURSO_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ requests })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Turso error:', data);
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: error.message });
  }
};
