import { Typography } from "@material-tailwind/react";

export const Sidebar = ({ data }) => {
  return (
    <div className="w-72 overflow-auto hidden md:block bg-white shadow-sm p-5">
      <Typography variant="h6">References</Typography>
      <div className="flex flex-col gap-2">
        {data?.map((item) => (
          <div className="bg-gray-100 text-zinc-900 rounded-lg p-2">
            <Typography className="text-sm">Ref #: {item?.referenceNumber}</Typography>
            <Typography className="text-xs text-gray-600 ">Submitted on: {new Date(item?.createdAt).toDateString()}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
