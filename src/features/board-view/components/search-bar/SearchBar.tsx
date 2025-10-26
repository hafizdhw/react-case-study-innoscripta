import { TextInput } from "../../../../components/ui/text-input/TextInput";
import { useState } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";
import { FiltersActionType, useFiltersDispatch } from "../../context/FiltersContext";

export const SearchBar = () => {
  const [value, setValue] = useState("");
  const dispatch = useFiltersDispatch();
  useDebounce(value, 500, (newValue) => {
    dispatch({
      type: FiltersActionType.UPDATE_FILTERS,
      searchValue: newValue,
    });
  });

  return (
    <TextInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search"
    />
  );
};
