import { useState, useEffect } from "react";

function History() {
  const [loading, setLoading] = useState(true);

  const [history] = useState([
    {
      id: 1,
      email: "Meeting tomorrow?",
      reply: "Sure, I'm available!",
      tone: "casual",
      date: "2024-01-01"
    },
    {
      id: 2,
      email: "Project update needed",
      reply: "I'll send the update shortly.",
      tone: "formal",
      date: "2024-01-02"
    }
  ]);

  useEffect(() => {
    // simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading history...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>📝 Reply History</h1>

      {history.map(item => (
        <div key={item.id} style={card}>
          <p><b>Email:</b> {item.email}</p>
          <p><b>Reply:</b> {item.reply}</p>
          <p><b>Tone:</b> {item.tone}</p>
          <p><b>Date:</b> {item.date}</p>
        </div>
      ))}
    </div>
  );
}

const card = {
  border: "1px solid #ddd",
  padding: "10px",
  margin: "10px 0"
};

export default History;