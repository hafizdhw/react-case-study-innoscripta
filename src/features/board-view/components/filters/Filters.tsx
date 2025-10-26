import React, { useState } from "react";
import { Select } from "../../../../components/ui/select/Select";
import { Text } from "../../../../components/ui/text/Text";
import { useGetFiltersOptions } from "../../hooks/useGetFIltersOptions";
import { useDebounce } from "../../../../hooks/useDebounce";
import {
  FiltersActionType,
  useFiltersDispatch,
} from "../../context/FiltersContext";

import "./Filters.css";
import { TextInput } from "../../../../components/ui/text-input/TextInput";

export const Filters = () => {
  const { assigneeOptions, severityOptions } = useGetFiltersOptions();
  const [assignee, setAssignee] = useState("");
  const [severity, setSeverity] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useFiltersDispatch();

  useDebounce(searchValue, 500, (newValue) => {
    dispatch({
      type: FiltersActionType.UPDATE_FILTERS,
      searchValue: newValue,
    });
  });

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

  const handleClearFilters = () => {
    setAssignee("");
    setSeverity("");
    setSearchValue("");
    dispatch({
      type: FiltersActionType.CLEAR_FILTERS,
    });
  };

  const shouldShowClearFilters = searchValue || assignee || severity;

  return (
    <div className="filters">
      <div className="filters__header">
        <Text variant="h3" size="lg">
          Filter
        </Text>
        {shouldShowClearFilters && (
          <button
            className="filters__clear-btn"
            onClick={handleClearFilters}
            type="button"
          >
            Clear filters
          </button>
        )}
      </div>
      <div className="filters__fields">
        <div className="filters__item-field">
          <Text variant="label" size="sm">
            Search
          </Text>
          <TextInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by title or tags"
          />
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
