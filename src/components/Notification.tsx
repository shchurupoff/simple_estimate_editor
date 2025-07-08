"use client";

import { useAutoSave } from "../hooks/useAutoSave";
import { useAppSelector } from "../hooks/useAppSelector";
import styled from "styled-components";

const StatusIndicator = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  font-size: 0.875rem;
  color: #6b7280; /* аналог text-gray-500 */
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export default function Notification() {
  const estimate = useAppSelector((state) => state.estimate);

  const { isSaving, contextHolder } = useAutoSave(estimate);

  return (
    <>
      {contextHolder}
      <StatusIndicator>
        {isSaving ? "Сохранение..." : "Сохранено"}
      </StatusIndicator>
    </>
  );
}
