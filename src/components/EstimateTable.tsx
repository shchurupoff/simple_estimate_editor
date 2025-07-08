"use client";

import { Table, Input, InputNumber, Button, Space } from "antd";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { updateItem, removeItem } from "../lib/estimateSlice";
import { EstimateItem } from "@/types";
import styled from "styled-components";

export default function EstimateTable() {
  const estimate = useAppSelector((state) => state.estimate);
  const dispatch = useAppDispatch();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<EstimateItem | null>(null);

  const Footer = styled.div`
    text-align: right;
    font-weight: bold;
    padding: 16px;
  `;

  const handleEdit = (item: EstimateItem) => {
    setEditingId(item.id);
    setEditingItem({ ...item });
  };

  const handleSave = () => {
    if (editingItem) {
      dispatch(updateItem(editingItem));
    }
    setEditingId(null);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingItem(null);
  };

  const columns = [
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: EstimateItem) => {
        if (editingId === record.id) {
          return (
            <Input
              value={editingItem?.name}
              onChange={(e) =>
                setEditingItem((prev) =>
                  prev ? { ...prev, name: e.target.value } : null
                )
              }
            />
          );
        }
        return <div onClick={() => handleEdit(record)}>{text}</div>;
      },
    },
    {
      title: "Количество",
      dataIndex: "quantity",
      key: "quantity",
      render: (text: number, record: EstimateItem) => {
        if (editingId === record.id) {
          return (
            <InputNumber
              min={1}
              value={editingItem?.quantity}
              onChange={(value) =>
                setEditingItem((prev) =>
                  prev ? { ...prev, quantity: Number(value) } : null
                )
              }
            />
          );
        }
        return <div onClick={() => handleEdit(record)}>{text}</div>;
      },
    },
    {
      title: "Цена за единицу",
      dataIndex: "pricePerUnit",
      key: "pricePerUnit",
      render: (text: number, record: EstimateItem) => {
        if (editingId === record.id) {
          return (
            <InputNumber
              min={0.01}
              step={0.01}
              value={editingItem?.pricePerUnit}
              onChange={(value) =>
                setEditingItem((prev) =>
                  prev ? { ...prev, pricePerUnit: Number(value) } : null
                )
              }
            />
          );
        }
        return <div onClick={() => handleEdit(record)}>{text}</div>;
      },
    },
    {
      title: "Сумма",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text: number) => text.toFixed(2),
    },
    {
      title: "Действия",
      key: "actions",
      render: (_: unknown, record: EstimateItem) => {
        if (editingId === record.id) {
          return (
            <Space>
              <Button type="primary" onClick={handleSave}>
                Сохранить
              </Button>
              <Button onClick={handleCancel}>Отмена</Button>
            </Space>
          );
        }
        return (
          <Button danger onClick={() => dispatch(removeItem(record.id))}>
            Удалить
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={estimate.items}
        rowKey="id"
        pagination={false}
        footer={() => (
          <Footer>Итого: {estimate.totalSum.toFixed(2)} руб.</Footer>
        )}
      />
    </div>
  );
}
