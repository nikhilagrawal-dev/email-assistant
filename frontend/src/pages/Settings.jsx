import { useState, useEffect } from "react";

function Settings() {
  const [tone, setTone] = useState("formal");
  const [length, setLength] = useState("short");

  // 🔥 LOAD SETTINGS FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:8085/api/settings")
      .then(res => res.json())
      .then(data => {
        setTone(data.defaultTone);
        setLength(data.defaultLength);
      })
      .catch(err => console.error(err));
  }, []);

  // 🔥 SAVE SETTINGS TO BACKEND
  const handleSave = () => {
    fetch("http://localhost:8085/api/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        defaultTone: tone,
        defaultLength: length
      })
    })
      .then(res => res.json())
      .then(() => {
        alert("Settings saved successfully!");
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>⚙️ Settings</h1>

      <h3>Default Tone</h3>
      <button
        style={tone === "formal" ? selected : normal}
        onClick={() => setTone("formal")}
      >
        🎩 Formal
      </button>
      <button
        style={tone === "casual" ? selected : normal}
        onClick={() => setTone("casual")}
      >
        😊 Casual
      </button>

      <h3 style={{ marginTop: "20px" }}>Default Length</h3>
      <button
        style={length === "short" ? selected : normal}
        onClick={() => setLength("short")}
      >
        📝 Short
      </button>
      <button
        style={length === "long" ? selected : normal}
        onClick={() => setLength("long")}
      >
        📄 Long
      </button>

      <br /><br />

      <button onClick={handleSave} style={saveBtn}>
        💾 Save Settings
      </button>
    </div>
  );
}

const normal = {
  margin: "5px",
  padding: "10px",
  background: "white",
  border: "1px solid #ccc",
  cursor: "pointer"
};

const selected = {
  ...normal,
  background: "#1a73e8",
  color: "white"
};

const saveBtn = {
  padding: "10px 20px",
  background: "green",
  color: "white",
  border: "none",
  cursor: "pointer"
};

export default Settings;`1      `