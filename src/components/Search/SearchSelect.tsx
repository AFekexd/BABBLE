import AsyncCreatableSelect from "react-select/async-creatable";
import {
  useCreateTagMutation,
  useLazySearchTagsQuery,
} from "../../features/forum/tagsApiSlice";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface Option {
  [x: string]: string;
  readonly value: string;
  readonly label: string;
}
const SearchSelect = ({
  setTags,
  type,
  style,
}: {
  setTags: (tags: string[]) => void;
  type?: string;
  style?: string;
}) => {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "lime-light") {
      setColor("#f8f8f2");
    } else {
      setColor("hsl(240 3.7% 15.88% / 1)");
    }
  }, [theme]);
  const createOption = (id: string, name: string): Option => ({
    value: id,
    label: name,
  });

  const [trigger] = useLazySearchTagsQuery();
  const [createdTagTrigger, { isLoading }] = useCreateTagMutation();
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);

  const promiseOptions = async (inputValue: string) => {
    if (!inputValue) return [];
    if (inputValue.length < 3) return [];
    const response = await trigger(inputValue.toLocaleLowerCase()).then((res) =>
      console.log(res)
    );
    return response.data.map((tag: Option) => createOption(tag.id, tag.name));
  };

  const handleCreate = async (inputValue: string) => {
    if (!inputValue) return;
    if (inputValue.length < 3) return;
    if (inputValue.length > 100) return;
    const response = await createdTagTrigger({ name: inputValue });
    setSelectedTags([
      ...selectedTags,
      createOption(response.data.id, response.data.name),
    ]);
  };

  const [color, setColor] = useState("hsl(240 3.7% 15.88% / 1)");

  useEffect(() => {
    setTags(selectedTags.map((tag) => tag.value));
  }, [selectedTags, setTags]);

  return (
    <AsyncCreatableSelect
      isClearable
      isMulti={type !== "tag"}
      isLoading={isLoading}
      defaultOptions
      className={style}
      loadOptions={promiseOptions}
      onCreateOption={handleCreate}
      noOptionsMessage={() => "Nincs találat"}
      formatCreateLabel={(inputValue) => `Létrehozás: ${inputValue}`}
      value={selectedTags}
      onChange={(value) =>
        setSelectedTags(Array.isArray(value) ? value : [value])
      }
      styles={{
        control: (provided) => ({
          ...provided,
          width: "100%",
          backgroundColor: color,
          borderColor: theme === "lime-light" ? "#f8f8f2" : "#3f3f46",
          hover: {
            borderColor: theme === "lime-light" ? "#f8f8f2" : "#3f3f46",
          },
        }),
        menu: (provided) => ({
          ...provided,
          width: "100%",
          backgroundColor: theme === "lime-light" ? "#f8f8f2" : "#3f3f46",
        }),
        option: (provided) => ({
          ...provided,
          backgroundColor: theme === "lime-light" ? "#f8f8f2" : "#3f3f46",
          color: "#f8f8f2",
        }),
        multiValue: (provided) => ({
          ...provided,
          backgroundColor: theme === "lime-light" ? "#f8f8f2" : "#3f3f46",
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          color: "#f8f8f2",
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          color: "#f8f8f2",
          hover: {
            backgroundColor: theme === "lime-light" ? "#f8f8f2" : "#3f3f46",
            color: "#f8f8f2",
          },
        }),
        input: (provided) => ({
          ...provided,
          color: theme === "lime-light" ? "#3f3f46" : "#f8f8f2",
        }),
      }}
    />
  );
};

export default SearchSelect;
