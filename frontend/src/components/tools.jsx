import "./tools.css";
export default function Tools() {
  return (
    <div className="tools">
      <h3 className="toolsTitle">Tools</h3>

      <button className="tool">Summarize</button>
      <button className="tool">Translate</button>
      <button className="tool">Rewrite</button>
      <button className="tool">Export</button>
    </div>
  );
}