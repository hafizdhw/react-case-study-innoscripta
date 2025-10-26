import React, { useState } from "react";
import { Select } from "../../../../components/ui/select/Select";
import { Text } from "../../../../components/ui/text/Text";
import { useGetFiltersOptions } from "../../hooks/useGetFIltersOptions";
import { useDebounce } from "../../../../hooks/useDebounce";
import {
  FiltersActionType,
  useFiltersDispatch,
} from "../../context/FiltersContext";

export const Filters = () => {
  const { assigneeOptions, severityOptions } = useGetFiltersOptions();
  const [assignee, setAssignee] = useState("");
  const [severity, setSeverity] = useState("");
  const dispatch = useFiltersDispatch();

  useDebounce(assignee, 500, (newValue) => {
    dispatch({
      type: FiltersActionType.UPDATE_FILTERS,
      assignee: newValue,
    });
  });

  useDebounce(severity, 500, (newValue) =>
    dispatch({
      type: FiltersActionType.UPDATE_FILTERS,
      severity: newValue ? Number(newValue) : undefined,
    })
  );

  return (
    <div className="filters">
      <Text variant="h3">Filter Tasks</Text>

      <div>
        <Text variant="body">Assignee</Text>
        <Select
          options={assigneeOptions}
          value={assignee}
          onChange={setAssignee}
          placeholder="Select an assignee"
        />
      </div>

      <div>
        <Text variant="body">Severity</Text>
        <Select
          options={severityOptions}
          value={severity}
          onChange={setSeverity}
          placeholder="Select a severity"
        />
      </div>
    </div>
  );
};
