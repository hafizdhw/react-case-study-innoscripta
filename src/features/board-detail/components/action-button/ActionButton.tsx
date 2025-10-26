import React from "react";
import "./ActionButton.css";
import { Text } from "../../../../components/ui/text/Text";
import { Select } from "../../../../components/ui/select/Select";

export const ActionButton = () => {
  return (
    <div className="action-button">
      <Text variant="h3" size="lg">
        Actions
      </Text>

      <div className="action-button__section">
        <Text variant="label" size="sm">
          Change Status
        </Text>
        <Select
          options={[
            { value: "Backlog", label: "Move to Backlog" },
            { value: "In Progress", label: "Start Working" },
            { value: "Done", label: "Mark as Resolved" },
          ]}
          value={"Backlog"}
          onChange={() => {}}
          placeholder="Select status change"
        />
      </div>
    </div>
  );
};
