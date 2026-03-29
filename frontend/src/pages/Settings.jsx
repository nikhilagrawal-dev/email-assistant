import { useState, useEffect } from "react";

function Settings() {
  const [tone, setTone] = useState("FORMAL");
  const [length, setLength] = useState("SHORT");

  useEffect(() => {
    fetch("http://localhost:8085/api/settings")
      .then(res => res.json())
      .then(data => {
        setTone(data.defaultTone);
        setLength(data.defaultLength);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSave = () => {
    fetch("http://localhost:8085/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ defaultTone: tone, defaultLength: length })
    })
      .then(res => res.json())
      .then(() => alert("Settings saved successfully!"))
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "30px", fontFamily: '"Google Sans", sans-serif', maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ color: "#1a73e8" }}>⚙️ Personalization</h1>
      <p style={{ color: "#5f6368", marginBottom: "30px" }}>Tune the default behavior of your AI assistant.</p>

      <div style={sectionBox}>
        <h3 style={sectionTitle}>Default Tone</h3>
        <p style={sectionDesc}>Choose a standard tone or type your own custom personality!</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
            <button style={tone === "FORMAL" ? selected : normal} onClick={() => setTone("FORMAL")}>
              🎩 Formal
            </button>
            <button style={tone === "CASUAL" ? selected : normal} onClick={() => setTone("CASUAL")}>
              😊 Casual
            </button>
            <input 
              type="text" 
              placeholder="✍️ Custom (e.g. Witty)..." 
              value={tone !== "FORMAL" && tone !== "CASUAL" ? tone : ""}
              onChange={(e) => setTone(e.target.value)}
              style={inputBox}
            />
        </div>
      </div>

      <div style={sectionBox}>
        <h3 style={sectionTitle}>Default Length</h3>
        <p style={sectionDesc}>How long should your responses usually be?</p>
        <div style={{ display: "flex", gap: "10px" }}>
            <button style={length === "SHORT" ? selected : normal} onClick={() => setLength("SHORT")}>
              📝 Short
            </button>
            <button style={length === "LONG" ? selected : normal} onClick={() => setLength("LONG")}>
              📄 Detailed
            </button>
        </div>
      </div>

      <button onClick={handleSave} style={saveBtn}>
        💾 Save Settings
      </button>
    </div>
  );
}

const sectionBox = {
    background: "#fff", border: "1px solid #e8eaed", borderRadius: "12px",
    padding: "24px", marginBottom: "20px", boxShadow: "0 2px 5px rgba(0,0,0,0.02)"
};
const sectionTitle = { margin: "0 0 6px 0", color: "#202124", fontSize: "18px" };
const sectionDesc = { margin: "0 0 16px 0", color: "#5f6368", fontSize: "14px" };
const inputBox = { padding: "10px 14px", borderRadius: "8px", border: "1px solid #dadce0", fontSize: "14px", minWidth: "220px", outline: "none" };
const normal = { padding: "10px 18px", background: "white", border: "1px solid #dadce0", borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: "500", color: "#3c4043" };
const selected = { ...normal, background: "#e8f0fe", color: "#1a73e8", borderColor: "#1a73e8" };
const saveBtn = { padding: "12px 24px", background: "#1a73e8", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "16px", fontWeight: "bold", width: "100%", marginTop: "10px" };

export default Settings;