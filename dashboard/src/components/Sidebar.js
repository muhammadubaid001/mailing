import { Input, Typography, Button } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Sidebar = ({ data, state, setState,filters, setFilters, filterDataByDateRange, setReferenceNumber }) => {
 

  const handleClick = (item) => {
    setState({
      ...item,
    });
  };

  const navigate = useNavigate();
  const [params] = useSearchParams();

  return (
    <div className="w-80 overflow-auto hidden md:block bg-white shadow-sm p-5">
      {!params.has("view") ? (
        <Button className="w-full" onClick={() => navigate("/?view=table")}>
          View Table
        </Button>
      ) : (
        <Button className="w-full" onClick={() => navigate("/")}>
          View Form
        </Button>
      )}
      <Typography variant="h6" className="mb-1 mt-1">
        Date Range
      </Typography>
      <div className="flex gap-2">
        <Input
          type="date"
          label="From"
          onChange={(e) =>
            setFilters({
              ...filters,
              from: e.target.value,
            })
          }
          containerProps={{
            className: "!min-w-0",
          }}
        />
        <Input
          type="date"
          onChange={(e) =>
            setFilters({
              ...filters,
              to: e.target.value,
            })
          }
          label="To"
          containerProps={{
            className: "!min-w-0",
          }}
        />
      </div>
      <Typography variant="h6" className="mt-2">
        References
      </Typography>
      {/* <Input
        onChange={(e) => setReferenceNumber(e.target.value)}
        label="Search"
      /> */}
      <div className="flex flex-col gap-2 mt-4">
        {filterDataByDateRange()?.map((item) => (
          <div
            key={item._id}
            onClick={() => handleClick(item)}
            className={`cursor-pointer bg-gray-100 text-zinc-900 rounded-lg p-2 hover:bg-blue-100 ${
              item._id === state._id ? "bg-blue-200" : ""
            }`}
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
