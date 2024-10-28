import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { MdPalette } from "react-icons/md";

const themes = [
  {
    name: "purple-dark",
    color: "DD62ED",
  },
  {
    name: "peach-dark",
    color: "FF7341",
  },
  {
    name: "azure-dark",
    color: "00BFFF",
  },
  {
    name: "lime-light",
    color: "99FF47",
  },
];

const ThemeSelector = () => {
  const [theme, setTheme] = useState<string>(themes[0].name);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.add(theme);
  }, [theme]);

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    document.documentElement.classList.remove(theme);
    setTheme(event.target.value);
    localStorage.setItem("theme", event.target.value);
  };

  return (
    <div className="p-4 flex gap 2">
      <Popover placement="bottom" showArrow offset={10}>
        <PopoverTrigger>
          <Button color="default" variant="faded" isIconOnly>
            <MdPalette />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex gap-2">
            {themes.map((theme, index) => (
              <Button
                key={index} // Add a key prop for list rendering
                className=" border cursor-pointer transition-transform duration-200 hover:brightness-125 hover:scale-110"
                style={{ backgroundColor: `#${theme.color}` }}
                onClick={handleThemeChange}
                value={theme.name}
              >
                <a className="invisible">{theme.name}</a>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ThemeSelector;
