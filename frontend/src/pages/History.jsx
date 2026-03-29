import { useState, useEffect } from "react";

function History() {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:8085/api/history")
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => b.id - a.id);
        setHistory(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredHistory = history.filter(item => {
    const s = search.toLowerCase();
    const email = item.emailContent ? item.emailContent.toLowerCase() : "";
    const reply = item.generatedReply ? item.generatedReply.toLowerCase() : "";
    return email.includes(s) || reply.includes(s);
  });

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center", color: "#5f6368" }}><h2>Loading AI History...</h2></div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: '"Google Sans", "Inter", sans-serif', maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ color: "#1a73e8", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
        📝 Reply History
      </h1>
      
      <input 
        type="text" 
        placeholder="🔍 Search past emails or replies (e.g. 'meeting' or 'invoice')..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%", padding: "14px", marginBottom: "24px", 
          borderRadius: "8px", border: "1px solid #dadce0", fontSize: "16px",
          outline: "none", boxSizing: "border-box", transition: "border 0.2s"
        }}
      />

      {filteredHistory.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#80868b", background: "#f8f9fa", borderRadius: "8px" }}>
          No history found matching your search. Generate some emails using the Chrome Extension!
        </div>
      ) : (
        filteredHistory.map(item => (
          <div key={item.id} style={card}>
            <div style={{ marginBottom: "12px", paddingBottom: "12px", borderBottom: "1px solid #f1f3f4" }}>
              <p style={{ margin: "0 0 4px 0", color: "#5f6368", fontSize: "14px" }}><b>Original Email:</b></p>
              <p style={{ margin: 0, color: "#202124" }}>{item.emailContent}</p>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <p style={{ margin: "0 0 4px 0", color: "#1a73e8", fontSize: "14px" }}><b>✨ Generated Reply:</b></p>
              <p style={{ margin: 0, color: "#202124", whiteSpace: "pre-wrap" }}>{item.generatedReply}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <span style={badge}>{item.tone?.toUpperCase() || "FORMAL"}</span>
                <span style={badge}>{item.length?.toUpperCase() || "SHORT"}</span>
              </div>
              <span style={{ color: "#80868b", fontSize: "12px" }}>
                {new Date(item.id).toLocaleString()}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const card = {
  border: "1px solid #dadce0",
  borderRadius: "8px",
  padding: "20px",
  margin: "16px 0",
  boxShadow: "0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
  backgroundColor: "#ffffff"
};

const badge = {
  background: "#e8f0fe",
  color: "#1a73e8",
  padding: "4px 8px",
  borderRadius: "12px",
  fontSize: "11px",
  fontWeight: "bold",
  letterSpacing: "0.5px"
};

export default History;