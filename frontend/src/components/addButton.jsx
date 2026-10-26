export default function AddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Add file"
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        width: 48,
        height: 48,
        borderRadius: "50%",
        border: "none",
        background: "#3a9d56",
        color: "#fff",
        fontSize: 28,
        lineHeight: 1,
        cursor: "pointer",
        boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
      }}
    >
      +
    </button>
  );
}