// components/Loader.tsx
import { Spin } from "antd";

export default function Loader() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "24px" }}>
      <Spin size="large" />
    </div>
  );
}
