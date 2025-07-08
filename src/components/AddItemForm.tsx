"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemSchema, ItemFormValues } from "../lib/schemas";
import { useAppDispatch } from "../hooks";
import { addItem } from "../lib/estimateSlice";
import { Button, Form, Input, InputNumber } from "antd";

export default function AddItemForm() {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset } = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      quantity: 1,
      pricePerUnit: 0,
    },
  });

  const onSubmit = (data: ItemFormValues) => {
    dispatch(addItem(data));
    reset();
  };

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      layout="vertical"
      style={{
        marginBottom: "24px",
        display: "flex",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      <Form.Item label="Наименование" style={{ minWidth: "400px" }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>

      <Form.Item label="Количество">
        <Controller
          name="quantity"
          control={control}
          render={({ field }) => (
            <InputNumber
              {...field}
              min={1}
              onChange={(value) => field.onChange(value)}
              value={field.value}
            />
          )}
        />
      </Form.Item>

      <Form.Item label="Цена за единицу">
        <Controller
          name="pricePerUnit"
          control={control}
          render={({ field }) => (
            <InputNumber
              {...field}
              min={0.01}
              step={0.01}
              onChange={(value) => field.onChange(value)}
              value={field.value}
            />
          )}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Добавить позицию
      </Button>
    </Form>
  );
}
