"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import EstimateTable from "../components/EstimateTable";
import AddItemForm from "../components/AddItemForm";
import { loadEstimate } from "../lib/estimateSlice";
import Notification from "../components/Notification";
import styled from "styled-components";
import ExportButton from "@/components/ExportButton";

export default function Home() {
  const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  `;

  const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  `;

  const ExportContainer = styled.div`
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
  `;

  useEffect(() => {
    const savedEstimate = localStorage.getItem("estimate");
    if (savedEstimate) {
      store.dispatch(loadEstimate(JSON.parse(savedEstimate)));
    }
  }, []);

  return (
    <Provider store={store}>
      <Container>
        <Title>Редактор сметы</Title>
        <AddItemForm />
        <EstimateTable />
        <ExportContainer>
          <ExportButton />
        </ExportContainer>
        <Notification />
      </Container>
    </Provider>
  );
}
