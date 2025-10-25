import { TextInput } from "../../../../components/ui/text-input/TextInput";
import { useState } from "react";
import { useDebounce } from "../../../../hooks/useDebounce";
import { BoardActionType, useBoardDispatch } from "../../context/BoardContext";

export const SearchBar = () => {
  const [value, setValue] = useState("");
  const dispatch = useBoardDispatch();
  useDebounce(value, 500, (newValue) => {
    dispatch({
      type: BoardActionType.FILTER_ISSUES,
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
