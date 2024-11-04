import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";

const LangSwitcher = () => {
  const { i18n } = useTranslation();
  const lngs: { [key: string]: { nativeName: string } } = {
    en: { nativeName: "English" },
    hu: { nativeName: "Magyar" },
  };

  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <Button color="default" variant="faded" isIconOnly>
          <MdLanguage />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          {Object.keys(lngs).map((lng) => (
            <Button
              key={lng}
              color="default"
              variant="flat"
              onClick={() => i18n.changeLanguage(lng)}
            >
              {lngs[lng].nativeName}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LangSwitcher;
