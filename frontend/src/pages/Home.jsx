import { useState, useEffect } from "react";

function Home() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8085/api/history")
      .then(res => res.json())
      .then(data => setHistory(data))
      .catch(err => console.error(err));
  }, []);

  const totalEmails = history.length;
  const timeSavedMins = totalEmails * 3; 
  const tones = history.map(h => h.tone);
  const popularTone = tones.sort((a,b) =>
      tones.filter(v => v===a).length - tones.filter(v => v===b).length
  ).pop() || "None";

  return (
    <div style={styles.container}>
      <h1 style={{ color: "#202124", fontSize: "32px", marginBottom: "8px" }}>Welcome to Smart Email Assistant 🤖</h1>
      <p style={{ color: "#5f6368", fontSize: "18px", marginBottom: "40px" }}>Your AI powered Gmail reply generator</p>

      {/* Analytics Dashboard Panel */}
      <div style={styles.metricsContainer}>
        <div style={styles.metricCard}>
            <div style={styles.metricIcon}>✉️</div>
            <div>
                <p style={styles.metricLabel}>AI Replies</p>
                <h2 style={styles.metricValue}>{totalEmails}</h2>
            </div>
        </div>
        <div style={styles.metricCard}>
            <div style={styles.metricIcon}>⏱️</div>
            <div>
                <p style={styles.metricLabel}>Est. Time Saved</p>
                <h2 style={styles.metricValue}>{timeSavedMins} <span style={{fontSize:"14px", fontWeight:"normal"}}>mins</span></h2>
            </div>
        </div>
        <div style={styles.metricCard}>
            <div style={styles.metricIcon}>🎨</div>
            <div>
                <p style={styles.metricLabel}>Top Tone</p>
                <h2 style={{...styles.metricValue, textTransform: "capitalize"}}>{popularTone.toLowerCase()}</h2>
            </div>
        </div>
      </div>

      <h2 style={{ color: "#202124", marginTop: "40px", fontSize: "24px" }}>Features Enabled</h2>
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3 style={styles.featureTitle}>🎩 Custom Tones</h3>
          <p style={styles.featureDesc}>Go to settings to create your own unique persona! Use "Sarcastic" or "Witty"!</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.featureTitle}>✨ Interactive Drafts</h3>
          <p style={styles.featureDesc}>In Gmail, you now get a smart preview modal to review what AI writes before inserting!</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.featureTitle}>🔍 Live Search</h3>
          <p style={styles.featureDesc}>Check the History page to instantly search through your old generated emails.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "40px 20px",
    fontFamily: '"Google Sans", "Inter", sans-serif',
    maxWidth: "1000px",
    margin: "0 auto"
  },
  metricsContainer: {
    display: "flex",
    gap: "16px",
    marginBottom: "32px",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  metricCard: {
    flex: "1 1 240px",
    maxWidth: "300px",
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    border: "1px solid #e8eaed",
    borderRadius: "16px",
    padding: "24px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
    textAlign: "left"
  },
  metricIcon: {
    fontSize: "36px",
    background: "#e8f0fe",
    borderRadius: "12px",
    width: "64px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  metricLabel: {
    margin: "0 0 4px 0", color: "#5f6368", fontSize: "14px", fontWeight: "600",
    textTransform: "uppercase", letterSpacing: "0.5px"
  },
  metricValue: {
    margin: "0", color: "#1a73e8", fontSize: "32px", fontWeight: "bold"
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "24px",
    marginTop: "20px"
  },
  card: {
    padding: "24px",
    border: "1px solid #dadce0",
    borderRadius: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    width: "250px",
    backgroundColor: "#ffffff",
    textAlign: "left",
    transition: "transform 0.2s"
  },
  featureTitle: { color: "#1a73e8", margin: "0 0 12px 0", fontSize: "18px" },
  featureDesc: { color: "#5f6368", margin: 0, lineHeight: "1.5", fontSize: "15px" }
};

export default Home;