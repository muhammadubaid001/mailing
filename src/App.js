import {
  Input,
  Select,
  Option,
  Button,
  Textarea,
} from "@material-tailwind/react";
import { useState } from "react";
import SignPad from "./components/Signpad";

function App() {
  const [state, setState] = useState({
    client: "",
    email: "",
    password: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(state);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-between max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6 p-8">
        <Select
          size="lg"
          name="client"
          onChange={(value) =>
            setState({
              ...state,
              client: value,
            })
          }
          label="Select Client"
        >
          <Option>All Good NW - MSRV</Option>
          <Option value="All Good NW - MSRV">All Good NW - MSRV</Option>
          <Option value="All Good NW - QA">All Good NW - QA </Option>
          <Option value="Authentic Healing and Wellness">
            Authentic Healing and Wellness
          </Option>
          <Option value="BHRC ">BHRC </Option>
          <Option value="Cascade Medical Spa ">Cascade Medical Spa </Option>
          <Option value="Cascade Oral & Facial Surgery">
            Cascade Oral & Facial Surgery
          </Option>
          <Option value="Center Port Dental">Center Port Dental </Option>
          <Option value="Children's Community Clinic">
            Children's Community Clinic
          </Option>
          <Option value="Chinook Falls Dental">Chinook Falls Dental </Option>
          <Option value="Creekside Rehabilitation">
            Creekside Rehabilitation
          </Option>
          <Option value="Do Good NW">Do Good NW </Option>
          <Option value="Donald E. Long Juvenile Detention Center ">
            Donald E. Long Juvenile Detention Center
          </Option>
          <Option value="Emerge Natural Health Care">
            Emerge Natural Health Care
          </Option>
        </Select>
        <Input size="lg" label="Email" name="email" onChange={handleChange} />
        <Input
          size="lg"
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
        />

        <SignPad />
        <Button type="submit" variant="gradient">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default App;
