// const statCard = [
//   { title: "Total Residents", value: "24" },
//   { title: "Names that start with S ", value: "12" },
//   { title: "People in Gwenborough", value: "5" },
//   { title: "People with a Company", value: "8" },
// ];

type Stat ={
    title: string;
    value: string;
}

type Props = {
  stats: Stat[];
};

export default function StatCard({stats} : Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
      {stats.map((stat) => (
        <div className="bg-[#F4F3F1] w-full h-24 md:h-28 lg:h-31 rounded-3xl md:rounded-[48px] flex items-center relative overflow-hidden">
          <div className="border-l-4 border-amber-300 absolute h-full flex items-center">
            <div className="px-4 md:px-6 lg:px-8">
              <p className="text-[10px] md:text-xs text-[#56423E] uppercase font-PlusJarta font-bold mb-1 md:mb-2">
                {stat.title}
              </p>
              <h2 className="text-lg md:text-2xl lg:text-3xl font-extrabold text-[#1A1C1A]">
                {stat.value}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
