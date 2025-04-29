"use client";

import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import RoundButton from "@/components/RoundButton";

export default function DashboardCards() {
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(path);
  };

  const cards = [
    {
      title: "RCS",
      subtext: "E-Commerce Demo",
      description: "",
      route: "/",
    },
    {
      title: "ADOBE",
      subtext: "Adobe Journey Optimizer",
      description: "",
      route: "/",
    },
    {
      title: "WHATSAPP",
      subtext: "Meta Messaging Platform",
      description: "",
      route: "/",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 px-4 sm:px-8">
      {cards.map((item, index) => (
        <Card
          key={index}
          backgroundColor="bg-emerald-900"
          borderColor="border-yellow-200"
          width="w-72 sm:w-80"
          height="h-80"
        >
          <div className="flex flex-col h-full justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
              <p className="text-md font-semibold mb-2">{item.subtext}</p>
              <p>{item.description}</p>
            </div>
            <div className="mt-4">
              <RoundButton
                text="Demo"
                color="bg-yellow-500"
                width="w-24"
                type="button"
                onClick={() => handleClick(item.route)}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
