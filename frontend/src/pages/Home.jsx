function Home() {
  return (
    <div style={styles.container}>
      <h1>Welcome to Smart Email Assistant 🤖</h1>
      <p>Your AI powered Gmail reply generator</p>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3>🎩 Tone Control</h3>
          <p>Choose formal or casual tone</p>
        </div>

        <div style={styles.card}>
          <h3>📝 Length Control</h3>
          <p>Short or long replies</p>
        </div>

        <div style={styles.card}>
          <h3>⚡ Instant Reply</h3>
          <p>AI reply in seconds</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px"
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "30px"
  },
  card: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "200px",
    backgroundColor: "#f9f9f9"
  }
};

export default Home;