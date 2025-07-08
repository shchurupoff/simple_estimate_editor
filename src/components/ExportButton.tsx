// components/ExportButton.tsx
"use client";

import { Button } from "antd";
import { useAppSelector } from "../hooks/useAppSelector";

export default function ExportButton() {
  const estimate = useAppSelector((state) => state.estimate);

  const handleExport = () => {
    const dataStr = JSON.stringify(estimate);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
      dataStr
    )}`;

    const link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute(
      "download",
      `смета-${new Date().toISOString().split("T")[0]}.json`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button type="primary" onClick={handleExport}>
      Скачать JSON
    </Button>
  );
}
