import React, { useState } from "react";
import { Select } from "../../../../components/ui/select/Select";
import { Text } from "../../../../components/ui/text/Text";
import { useGetFiltersOptions } from "../../hooks/useGetFIltersOptions";
import { useDebounce } from "../../../../hooks/useDebounce";
import {
  FiltersActionType,
  useFiltersDispatch,
} from "../../context/FiltersContext";
import { SearchBar } from "../search-bar/SearchBar";

import "./Filters.css";

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
      <Text variant="h3" size="lg">
        Filter
      </Text>
      <div className="filters__fields">
        <div className="filters__item-field">
          <Text variant="label" size="sm">
            Search
          </Text>
          <SearchBar />
        </div>

        <div className="filters__item-field">
          <Text variant="label" size="sm">
            Assignee
          </Text>
          <Select
            options={assigneeOptions}
            value={assignee}
            onChange={setAssignee}
            placeholder="Select an assignee"
          />
        </div>

        <div className="filters__item-field">
          <Text variant="label" size="sm">
            Severity
          </Text>
          <Select
            options={severityOptions}
            value={severity}
            onChange={setSeverity}
            placeholder="Select a severity"
          />
        </div>
      </div>
    </div>
  );
};
