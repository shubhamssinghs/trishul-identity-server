/* eslint-disable react-hooks/exhaustive-deps */
import { useBlocker, useBeforeUnload } from "react-router-dom";
import { useEffect } from "react";
import { useAlert } from "@hooks";

export function useUnsavedChangesPrompt(
  shouldBlock: boolean,
  message = "You have unsaved changes. Are you sure you want to leave?"
) {
  const { _alert } = useAlert();

  useBeforeUnload((e) => {
    if (shouldBlock) {
      e.preventDefault();
      e.returnValue = message;
    }
  });

  const blocker = useBlocker(shouldBlock);

  useEffect(() => {
    if (blocker.state === "blocked") {
      _alert({
        type: "confirm",
        title: "Leave this page?",
        message,
        confirmText: "Leave",
        cancelText: "Stay",
        onConfirm: () => {
          blocker.proceed();
        },
        onCancel: () => {
          blocker.reset();
        },
      });
    }
  }, [blocker.state]);
}
