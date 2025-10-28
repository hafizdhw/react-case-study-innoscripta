import React, { useState } from "react";
import { Select } from "../../../../../components/ui/select/Select";
import { useGetFiltersOptions } from "../../../hooks/useGetFIltersOptions";
import { useDebounce } from "../../../../../hooks/useDebounce";
import {
  FiltersActionType,
  useFiltersDispatch,
} from "../../../context/FiltersContext";

import "./Filters.css";
import { TextInput } from "../../../../../components/ui/text-input/TextInput";

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
      <div className="filters__fields">
        <div className="filters__item">
          <TextInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by title or tags"
            className="filters__input"
          />
        </div>

        <div className="filters__item">
          <Select
            options={assigneeOptions}
            value={assignee}
            onChange={setAssignee}
            placeholder="Select an assignee"
          />
        </div>

        <div className="filters__item">
          <Select
            options={severityOptions}
            value={severity}
            onChange={setSeverity}
            placeholder="Select a severity"
          />
        </div>
        
        {shouldShowClearFilters && (
          <div className="filters__clear-container">
            <button
              className="filters__clear-btn"
              onClick={handleClearFilters}
              type="button"
              aria-label="Clear all filters"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
