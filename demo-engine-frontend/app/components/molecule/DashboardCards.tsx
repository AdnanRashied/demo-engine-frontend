import Card from "@/components/Card";

export default function DashboardCards() {
  return (
    <div className="flex flex-wrap justify-between gap-6 px-6">
      <Card
        backgroundColor="bg-emerald-900"
        borderColor="border-yellow-200"
        width="w-80"
        height="h-80"
      >
        <h2 className="text-lg font-semibold mb-4">Card 1</h2>
        <p>Some content for card 1.</p>
      </Card>

      <Card
        backgroundColor="bg-emerald-900"
        borderColor="border-yellow-200"
        width="w-80"
        height="h-80"
      >
        <h2 className="text-lg font-semibold mb-4">Card 2</h2>
        <p>Some content for card 2.</p>
      </Card>

      <Card
        backgroundColor="bg-emerald-900"
        borderColor="border-yellow-200"
        width="w-80"
        height="h-80"
      >
        <h2 className="text-lg font-semibold mb-4">Card 3</h2>
        <p>Some content for card 3.</p>
      </Card>
    </div>
  );
}
