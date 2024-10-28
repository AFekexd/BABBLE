import { Card, Image, Link } from "@nextui-org/react";

import { Link as RouterLink } from "react-router-dom";
const Home = () => {
  return (
    <div className="bg-transparent h-full mb-3 justify-center">
      <div className="flex gap-10 justify-center items-center flex-wrap  h-full ">
        <Card
          isFooterBlurred
          radius="lg"
          className="border-none hover:shadow-medium hover:scale-105"
        >
          <Link
            as={RouterLink}
            to="/chat"
            className="flex flex-col items-center gap-3"
          >
            <div className="flex flex-col items-center gap-3">
              <Image
                alt="Woman listing to music"
                height={200}
                src="/chat.png"
                width={500}
              />
              <h1
                className="absolute top-1/2 text-8xl font-bold text-black/11 transform -translate-y-1/2 z-20 drop-shadow-lg uppercase"
                id="chatHomeTitle"
              >
                {" "}
                Chat
              </h1>
            </div>
          </Link>
        </Card>
        <Card
          isFooterBlurred
          radius="lg"
          className="border-none hover:shadow-medium hover:scale-105"
        >
          <Link
            as={RouterLink}
            to="/forum"
            className="flex flex-col items-center gap-3"
          >
            <div className="flex flex-col items-center gap-3">
              <Image
                alt="Woman listing to music"
                className="object-cover"
                height={200}
                src="/forum.png"
                width={500}
              />
              <h1
                className="absolute top-1/2 text-8xl font-bold text-black/11 transform -translate-y-1/2 z-20 drop-shadow-lg uppercase"
                id="chatHomeTitle"
              >
                {" "}
                Forum
              </h1>
            </div>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default Home;
