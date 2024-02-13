import { Input, Typography } from "@material-tailwind/react";

export const Sidebar = ({ data, state, setState, setReferenceNumber }) => {
  const handleClick = (item) => {
    setState(item)
  };
  return (
    <div className="w-72 overflow-auto hidden md:block bg-white shadow-sm p-5">
      <Typography variant="h6">References</Typography>
      <Input
        onChange={(e) => setReferenceNumber(e.target.value)}
        label="Search"
      />
      <div className="flex flex-col gap-2 mt-4">
        {data?.map((item) => (
          <div
            key={item._id}
            onClick={() => handleClick(item)}
            className={`cursor-pointer bg-gray-100 text-zinc-900 rounded-lg p-2 hover:bg-blue-100 ${item._id === state._id ? 'bg-blue-200' : ''}`}
          >
            <Typography className="text-sm">
              Ref #: {item?.referenceNumber}
            </Typography>
            <Typography className="text-xs text-gray-600 ">
              Submitted on: {new Date(item?.createdAt).toDateString()}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};
