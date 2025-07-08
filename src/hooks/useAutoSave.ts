import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { message } from "antd";
import { Estimate } from "@/types";

export function useAutoSave(estimate: Estimate) {
  const [isSaving, setIsSaving] = useState(false);
  const isInit = useRef(true);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const debouncedSave = debounce(() => {
      localStorage.setItem("estimate", JSON.stringify(estimate));

      setIsSaving(false);
      if (!isInit.current) {
        messageApi.success("Смета сохранена");
      } else {
        isInit.current = false;
      }
    }, 500);

    setIsSaving(true);
    debouncedSave();

    return () => {
      debouncedSave.cancel();
    };
  }, [estimate, messageApi]);

  return { isSaving, contextHolder };
}
