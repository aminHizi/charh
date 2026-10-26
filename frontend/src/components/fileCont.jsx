export default function FileContent({ name, description }) {
  return (
    <div style={{
      padding: "10px 16px",
      margin: "8px 0",
      border: "1px solid #d0d7de",
      borderRadius: 6,
      fontFamily: "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
    }}>
      <h2 style={{ margin: 0, fontSize: 14, color: "#0969da" }}>{name}</h2>
      <p style={{ margin: "2px 0 0", fontSize: 12, color: "#656d76" }}>{description}</p>
    </div>
  );
}