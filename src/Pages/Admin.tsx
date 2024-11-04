import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MdFlag, MdGroup } from "react-icons/md";
import AdminInfoCard from "../components/Admin/AdminInfoCard";
import AdminTable from "../components/Admin/AdminTable";
import { AdminColumns } from "../types/AdminColumns";
import { useLazyGetUsersQuery } from "../features/user/userApiSlice";
const Admin = () => {
  const [activeTab, setActiveTab] = useState("users");

  const [rows, setRows] = useState([]);

  const screenSize = window.innerWidth;

  const [trigger, { data }] = useLazyGetUsersQuery({});

  useEffect(() => {
    if (data) {
      setRows(data);
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    if (activeTab === "users") {
      trigger({});
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return (
          <AdminTable type="users" rows={rows} columns={AdminColumns.User} />
        );
      case "categories":
        return (
          <AdminTable
            type="categories"
            rows={rows}
            columns={AdminColumns.Category}
          />
        );
      case "profanity":
        return <AdminTable type="profanity" rows={rows} />;
      case "reports":
        return (
          <AdminTable
            type="reports"
            rows={rows}
            columns={AdminColumns.Report}
          />
        );
      default:
        return <AdminTable type="users" rows={rows} />;
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full h-[90dvh] justify-center  gap-5 mt-3 p-4 ">
        <div className="flex flex-row md:flex-col gap-3 sm:w-2/12 md:h-full md:justify-between min-w-fit">
          <Card className="h-fit p-3">
            <div className="flex md:flex-col gap-3 ">
              <Button
                color={"primary"}
                variant={activeTab === "users" ? "solid" : "flat"}
                onClick={() => setActiveTab("users")}
                startContent={<MdGroup />}
                isIconOnly={screenSize < 768}
              >
                {screenSize > 768 && "Manage users"}
              </Button>
              <Divider />
              <Button
                color={"success"}
                variant={activeTab === "categories" ? "solid" : "flat"}
                onClick={() => setActiveTab("categories")}
                startContent={<MdFlag />}
                isIconOnly={screenSize < 768}
              >
                {screenSize > 768 && "Manage tags"}
              </Button>
              <Button
                color={"success"}
                variant={activeTab === "profanity" ? "solid" : "flat"}
                onClick={() => setActiveTab("profanity")}
                startContent={<MdFlag />}
                isIconOnly={screenSize < 768}
                isDisabled={true}
              >
                {screenSize > 768 && "Profinity filter"}
              </Button>
              <Divider />
              <Button
                color={"danger"}
                isDisabled={true}
                variant={activeTab === "reports" ? "solid" : "flat"}
                onClick={() => setActiveTab("reports")}
                startContent={<MdFlag />}
                isIconOnly={screenSize < 768}
              >
                {screenSize > 768 && "Manage reports"}
              </Button>
            </div>
          </Card>
          <Card className="hidden sm:flex h-fit p-3">
            <AdminInfoCard />
          </Card>
          <Card className="sm:hidden h-fit p-3">
            <div className="flex flex-row gap-1  text-success">
              <MdGroup />

              <p>asd{data && data.length}</p>
            </div>
            <div className="flex flex-row gap-1 text-danger">
              <MdFlag />
              <p>0</p>
            </div>
          </Card>
        </div>

        <Card className="sm:w-10/12  p-3">
          <CardHeader
            className="flex justify-between items-center"
            title="Admin"
          >
            <h1 className="text-2xl font-bold">
              {activeTab === "users"
                ? "Manage users"
                : activeTab === "categories"
                ? "Manage categories"
                : activeTab === "profanity"
                ? "Profinity filter"
                : activeTab === "reports"
                ? "Manage reports"
                : "Manage users"}
            </h1>
          </CardHeader>
          <CardBody>{activeTab && renderContent()}</CardBody>
        </Card>
      </div>
    </>
  );
};

export default Admin;
