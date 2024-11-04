//@ts-nocheck
//TODO: REMOVE NO CHECK FOR FINAL BUILD
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Spinner,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import { Key, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import ProfileModal from "../Modals/ProfileModal";
import { useAppDispatch } from "../../app/hooks";
import { deleteCredentials } from "../../features/auth/authSlice";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import PersonalAvatar from "../Avatar/PersonalAvatar";
import { useLazyGetPersonalPfpQuery } from "../../features/user/userApiSlice";
import ThemeSelector from "../Switchers/ThemeSwitcher";
import LangSwitcher from "../Switchers/LangSwitcher";
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    isOpen: isProfileOpen,
    onOpenChange: setProfileOpen,
    onOpen: openProfile,
  } = useDisclosure();

  const [trigger, { isLoading }] = useLogoutMutation();
  const menuItems = [
    {
      title: "Beszélgetés",
      href: "/chat",
    },
    {
      title: "Fórum",
      href: "/forum",
    },
  ];

  const dispatch = useAppDispatch();
  const currentPath = window.location.pathname.split("/")[1];

  function logout() {
    trigger({}).finally((res) => {
      dispatch(deleteCredentials());
    });
  }

  const [pfpTrigger] = useLazyGetPersonalPfpQuery({});

  const [status, setStatus] = useState<Key>("online");

  const [data, setData] = useState<any>();

  const refetchPfp = () => {
    pfpTrigger({}).then((res) => {
      console.log("triggered pfp query");
      setData(res.data.pfp);
    });
  };

  useEffect(() => {
    pfpTrigger({}).then((res) => {
      console.log("triggered pfp query");
      setData(res.data.pfp);
    });
  }, [pfpTrigger]);

  return (
    <>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        aria-label="Main navigation"
        className="sticky top-0 z-50 bg-primary-400"
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <Link as={RouterLink} to="/" aria-current="page">
              <Image
                src="/logobabble.png"
                alt="Chatter"
                width={100}
                height={50}
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <Link as={RouterLink} to="/" className="font-bold text-inherit">
              <Image
                src="/logobabble.png"
                alt="Chatter"
                width={125}
                height={50}
              />
            </Link>
          </NavbarBrand>
          {menuItems.map((item, index) => (
            <NavbarItem key={`${item}-${index}`}>
              <Link
                as={RouterLink}
                className={
                  item.href === "/" + currentPath
                    ? "text-foreground"
                    : "text-primary-700"
                }
                style={{ fontWeight: 500 }}
                to={item.href}
                size="lg"
              >
                {item.title}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <div className="flex gap-2 items-center">
            <NavbarItem className="cursor-pointer">
              <ThemeSelector />
            </NavbarItem>
            <NavbarItem className="cursor-pointer">
              <LangSwitcher />
            </NavbarItem>
          </div>

          {
            <NavbarItem className="cursor-pointer">
              <Dropdown>
                <DropdownTrigger>
                  <div>
                    <PersonalAvatar
                      data={data}
                      color={
                        status === "online"
                          ? "success"
                          : status === "dnd"
                          ? "warning"
                          : status === "away"
                          ? "danger"
                          : "default"
                      }
                    />
                  </div>
                </DropdownTrigger>
                <DropdownMenu
                  variant="faded"
                  aria-label="Dropdown menu with description"
                >
                  <DropdownItem key="Status" variant="light" isReadOnly>
                    <Tabs
                      color={
                        status === "online"
                          ? "success"
                          : status === "dnd"
                          ? "warning"
                          : status === "away"
                          ? "danger"
                          : "default"
                      }
                      variant="bordered"
                      selectedKey={status}
                      onSelectionChange={setStatus}
                    >
                      <Tab title="Online" key="online" aria-label="Online" />
                      <Tab title="Ne zavarj" key="dnd" aria-label="Ne zavarj" />
                      <Tab title="Távol" key="away" aria-label="Távol" />
                    </Tabs>
                  </DropdownItem>

                  <DropdownItem key="profile" onClick={openProfile}>
                    Profil
                  </DropdownItem>

                  {true && (
                    <DropdownItem
                      key="admin"
                      color="warning"
                      className="text-warning"
                      description="Szabályok és beállítások"
                      as={RouterLink}
                      to="/admin"
                      showDivider
                    >
                      ADMIN PANEL
                    </DropdownItem>
                  )}
                  <DropdownItem
                    key="logout"
                    className="text-danger"
                    color="danger"
                    onClick={() => {
                      logout();
                    }}
                    startContent={isLoading ? <Spinner size="sm" /> : undefined}
                  >
                    Kijelentkezés
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          }
        </NavbarContent>

        <NavbarMenu aria-label="Main navigation">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                as={RouterLink}
                color={"primary"}
                className={
                  item.href === "/" + currentPath ? "text-primary-800" : ""
                }
                style={{ fontWeight: 500 }}
                to={item.href}
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <ProfileModal
        pfp={data}
        refetchPfp={refetchPfp}
        isOpen={isProfileOpen}
        onOpenChange={setProfileOpen}
      />
    </>
  );
};

export default Navigation;
