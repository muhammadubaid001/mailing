import {
  Input,
  Select,
  Option,
  Button,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import SignPad from "./components/Signpad";
import { Sidebar } from "./components/Sidebar";

const Clients = [
  {
    Client: "All Good NW - MSRV",
    "Phone Number": "541-972-3529",
    Address: "2730 SW Multnomah Blvd.",
    Email: "Michelle.Ladd@portlandoregon.gov",
  },
  {
    Client: "All Good NW - QA",
    "Phone Number": "",
    Address: "2185 SW Naito Pkwy, Portland, OR 97201, USA",
    Email: "Michelle.Ladd@portlandoregon.gov",
  },
  {
    Client: "Atlas Tattoo",
    "Phone Number": "503-281-7499",
    Address: "4543 N Albina Ave, Portland, OR 97217, USA",
    Email: "atlastattoo@gmail.com",
  },
  {
    Client: "Authentic Healing and Wellness",
    "Phone Number": "503-998-2678",
    Address: "1341 SW Carson St, Portland, OR 97219, USA",
    Email: "shannon@authentichealingpdx.com",
  },
  {
    Client: "BHRC",
    "Phone Number": "",
    Address: "333 SW Park Ave, Portland, OR 97205, USA",
    Email: "",
  },
  {
    Client: "Cascade Medical Spa",
    "Phone Number": "503-395-7736",
    Address: "1292 SE Holgate Blvd, Portland, OR 97202, USA",
    Email: "info@cascademedicalspa.com",
  },
  {
    Client: "Cascade Oral & Facial Surgery",
    "Phone Number": "503-482-7200",
    Address: "16455 Boones Ferry Rd Ste B, Lake Oswego, OR 97035, USA",
    Email: "",
  },
  {
    Client: "Center Port Dental",
    "Phone Number": "503-228-1506",
    Address: "610 SW Alder St suite 1105, Portland, OR 97205, USA",
    Email: "admin@centerportdental.com",
  },
  {
    Client: "Children's Community Clinic",
    "Phone Number": "503-284-5239 ext. 309",
    Address: "2252 NE Lloyd Blvd, Portland, OR 97232, USA",
    Email: "admin@ccc4kids.org",
  },
  {
    Client: "Chinook Falls Dental",
    "Phone Number": "",
    Address: "36840 Industrial Way Ste A, Sandy OR",
    Email: "contactus@chinookfallsdental.com",
  },
  {
    Client: "Creekside Rehabilitation ",
    "Phone Number": "",
    Address: "812 SE 48th Av, Portland, OR 97215, USA",
    Email: "",
  },
  {
    Client: "Do Good NW ",
    "Phone Number": "254-217-3139",
    Address: "8005 N Richmond Ave, Portland, OR 97203, USA",
    Email: "",
  },
  {
    Client: "Donald E. Long Juvenile Detention Center",
    "Phone Number": "503-988-3530",
    Address: "1401 NE 68th Pl, Portland, OR 97213, USA",
    Email: "ashley.adams@multco.us",
  },
  {
    Client: "Emerge Natural Health Care",
    "Phone Number": "360-787-3615",
    Address: "1409 Franklin St #103, Vancouver, WA 98660",
    Email: "info@emergenaturalhealth.com",
  },
  {
    Client: "Evolve Aesthetics",
    "Phone Number": "360-726-4399",
    Address: "330 E Mill Plain Blvd suite 401, Vancouver, WA 98660, USA",
    Email: '"',
  },
  {
    Client: 'sharla@evolvepdx.com"',
  },
  {
    Client: "Evolve Health",
    "Phone Number": "503-447-3285",
    Address: "6400 SE Lake Rd suite 155, Portland, OR 97222, USA",
    Email: '"',
  },
  {
    Client: 'accounting@evolvehealthus.com"',
  },
  {
    Client: "Faireys Pharmacy sharps pick up ",
    "Phone Number": "425-802-1891",
    Address: "7206 NE Sandy Blvd. Portland OR, 97213",
    Email: "fairleysrxinc@gmail.com",
  },
  {
    Client: "Gresham Pediatric Dentistry",
    "Phone Number": "503-761-2243",
    Address: "831 NW Council Dr #210, Gresham, OR 97030, USA",
    Email: "",
  },
  {
    Client: "Inverness Jail ",
    "Phone Number": "503-988-5033",
    Address: "11540 NE Inverness Dr.",
    Email: "chfinancial@multco.us",
  },
  {
    Client: "Irvington Vet Clinic",
    "Phone Number": "503-953-8078",
    Address: "1427 NE Fremont St, Portland, OR 97212, USA",
    Email: "brian@irvingtonveterinary.com",
  },
  {
    Client: "Kennedy Restoation",
    "Phone Number": "503-780-2102",
    Address: "13909 NE Airport Way, Portland, OR 97230",
    Email: "",
  },
  {
    Client: "Laseraway Tualatin",
    "Phone Number": "",
    Address: "7459 SW Bridgeport Rd, Portland, OR 97224, USA",
    Email: "",
  },
  {
    Client: "Little Tattoo Shoppe ",
    "Phone Number": "",
    Address: "1323 NE Fremont St, Portland, OR 97212, USA",
    Email: "wheeler665@yahoo.com",
  },
  {
    Client: "Market Street Shelter",
    "Phone Number": "971-804-6010",
    Address: "120 SE Market St, Portland, OR 97214, USA",
    Email: "",
  },
  {
    Client: "McMenamins Grand Lodge",
    "Phone Number": "",
    Address: "3505 Pacific Ave, Forest Grove, OR 97116, USA",
    Email: "accountspayable@mcmenamins.com",
  },
  {
    Client: "Mt Tabor Veterinary Clinic",
    "Phone Number": "503-200-5555",
    Address: "4246 SE Belmont St, Portland, OR 97215, USA",
    Email: "",
  },
  {
    Client: "New Rose Tattoo",
    "Phone Number": "",
    Address: "4823 SE Division St, Portland, OR 97206, USA",
    Email: "cesmith35@hotmail.com",
  },
  {
    Client: "Nexus Medicine ",
    "Phone Number": "503-442-5374",
    Address: "925 NW 19th Ave suite 8, Portland, OR 97209, USA",
    Email: "stephanie@nexusmedicinepdx.com",
  },
  {
    Client: "Northwest Regional Re-Entry Center (nwrrc)",
    "Phone Number": "",
    Address: "6000 NE 80th Ave, Portland, OR 97218, USA",
    Email: "maryl@nwrrc.org",
  },
  {
    Client: "PDX Center for Dentistry",
    "Phone Number": "503-546-9079",
    Address: "511 SW 10th Ave Suite 1101, Portland, OR 97205",
    Email: "office@pdxdentistry.com",
  },
  {
    Client: "Portland Building",
    "Phone Number": "Full sharps container outside Suite #110",
    Address: "420 SW Main St, Portland, OR 97204, USA",
    Email: "",
  },
  {
    Client: "Portland Chiropractic Group",
    "Phone Number": "503-224-2100",
    Address: "2031 E Burnside, Portland OR 97214",
    Email: "shelley@portlandchiropracticgroup.com",
  },
  {
    Client: "Right to Dream 2",
    "Phone Number": "",
    Address: "999 N Thunderbird way",
    Email: "",
  },
  {
    Client: "Ritual Arts Sharps",
    "Phone Number": "",
    Address: "2005 NE 42nd Ave #1304, Portland, OR 97213",
    Email: "",
  },
  {
    Client: "Rosewater Tattoo",
    "Phone Number": "503-475-4449",
    Address: "2915 NE Broadway, Portland, OR 97232, USA",
    Email: "info@rosewatertattoo.com",
  },
  {
    Client: "Sacred Tattoo",
    "Phone Number": "971-325-2261",
    Address: "203 SW 9th Ave., Portland, OR 97205, USA",
    Email: "artofsurvivaltattoo@gmail.com",
  },
  {
    Client: "Sapphire at Belmont",
    "Phone Number": "503-236-2624 ext. 224",
    Address: "812 SE 48th Ave.",
    Email: "zbright@sapphirehealthservices.com",
  },
  {
    Client: "Setter Periodontics ",
    "Phone Number": "503-222-9961",
    Address: "5320 S Macadam Ave.",
    Email: "chairside@setterperiodo.com",
  },
  {
    Client: "Silent Earth Studios- sharps pickup",
    "Phone Number": "773-331-2107",
    Address:
      "3909 NE Martin Luther King Jr Blvd suite 205, Portland, OR 97212, USA",
    Email: "djauldtattous@gmail.com",
  },
  {
    Client: "Skin by Lovely - Camas",
    "Phone Number": "877-568-3594",
    Address: "19120 SE 34th St, Vancouver, WA 98683, USA",
    Email: "mea@skinbylovely.com",
  },
  {
    Client: "Skin by Lovely - NW Portland",
    "Phone Number": "",
    Address: "",
    Email: "megan@skinbylovely.com",
  },
  {
    Client: "Skin by Lovely - Vancouver",
    "Phone Number": "",
    Address: "",
    Email: "mea@skinbylovely.com",
  },
  {
    Client: "Soft Touch dental ",
    "Phone Number": "360-980-5757",
    Address: "1727 NE 13th Ave, Portland, OR 97212, USA",
    Email: "ewokh200@gmail.com",
  },
  {
    Client: "Somerset Assisted Living",
    "Phone Number": "",
    Address: "8360 Cason Rd, Gladstone, OR 97027, USA",
    Email: "Nanette.dahlstrom@hawthornret.com",
  },
  {
    Client: "Strauss Dental Clinic",
    "Phone Number": "503-656-2139",
    Address: "802 Molalla Ave, Oregon City, OR 97045, USA",
    Email: "",
  },
  {
    Client: "Style Aesthetics",
    "Phone Number": "(541) 490-2624",
    Address: "1125 NW 9th Ave Suite 110, Portland, OR 97209",
    Email: "alexa@styleaesthetics.com",
  },
  {
    Client: "Summit Reconstruction & Restoration",
    "Phone Number": "971-330-0293",
    Address: "7215 SW Bonita Rd, Tigard, OR 97224",
    Email: "",
  },
  {
    Client: "Terwilliger Plaza ",
    "Phone Number": "(503) 299-4911",
    Address: "2545 SW Terwilliger Blvd, Portland, OR 97201",
    Email: "ap_invoices@terwilligerplaza.com",
  },
  {
    Client: "The Natural Path",
    "Phone Number": "503-347-4625",
    Address: "6030 SE Division St, Portland, OR 97206, USA",
    Email: "robertmadda@gmail.com",
  },
  {
    Client: "Thought Crime Tattoo",
    "Phone Number": "503-560-7870",
    Address: "420 SW Washington St. Suite 601",
    Email: "Calvin@thoughtcrimetattoo.com",
  },
  {
    Client: "True Diagnostics ",
    "Phone Number": "971-266-8989",
    Address: "1122 NE 122nd suite B102",
    Email: "wayne@truediagnostics.org, cherie@truediagnostics.org",
  },
  {
    Client: "Warner Pacific University",
    "Phone Number": "503-784-8316",
    Address: "2219 SE 68th Ave, Portland, OR 97215, USA",
    Email: "kostlund@warnerpacific.edu",
  },
  {
    Client: "Wellness Mart",
    "Phone Number": "",
    Address: "700 NE Multnomah, Suite 120 Portland, Oregon  97232",
    Email: "",
  },
];

function App() {
  const [state, setState] = useState({
    client: "",
    email: "",
    address: "",
    phoneNumber: "",
    generalDate: "",
    company: "",
    sign: "",
    companyName: "",
    representative: "",
    transporterName: "",
    transporterAddress: "7600 SE Johnson Creek Blvd, Portland, OR 97206",
    transporterPhoneNumber: "503-477-8765",
    transporterDate: "",
  });
  const [referenceNumber, setReferenceNumber] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const fetchData = useCallback(async () => {
    const resp = await axios.get(
      `${process.env.REACT_APP_API_DOMAIN}/api/data`
    );
    setData(resp.data.data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChangeClient = (value) => {
    const selected = Clients.find((item) => item.Client === value);
    setState({
      ...state,
      client: selected['Client'],
      email: selected["Email"],
      phoneNumber: selected["Phone Number"],
      address: selected["Address"],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/send`, state);
    alert("Email sent successfully");
    fetchData();
    setLoading(false);
  };

  const max = data?.reduce((prev, current) => {
    return prev.referenceNumber > current.referenceNumber ? prev : current;
  }, 0);

  const filteredData = data.filter((item) =>
    !referenceNumber
      ? data
      : item.referenceNumber?.toString().includes(referenceNumber?.toString())
  );

  return (
    <div className="flex gap-4 bg-gray-50">
      <Sidebar
        data={filteredData}
        referenceNumber={referenceNumber}
        setReferenceNumber={setReferenceNumber}
        state={state}
        setState={setState}
      />

      <div className="h-full flex flex-col items-center justify-between mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-6 p-3 md:p-8"
        >
          <div className="flex items-center justify-between">
            <Typography variant="h3" className="leading-none">
              Regulated Medical Waste Manifest
            </Typography>
            <div className="flex gap-2 items-center">
              <Typography>Ref #: {max?.referenceNumber + 1}</Typography>
              {/* <PDFDownloadLink document={<PDFFile data={state} />} fileName="file"> */}
              {/* <Button
                color="green"
                variant="gradient"
                onClick={() => generatePDF(targetRef, {
                  filename: "file.pdf",
                })}
                className="flex gap-2 items-center"
              >


                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                Export PDF
              </Button> */}
              {/* </PDFDownloadLink> */}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full flex-1">
              <Typography variant="h5" className="pb-2">
                Generator Information
              </Typography>
              <Select
                size="lg"
                name="client"
                onChange={(value) => handleChangeClient(value)}
                label="Select Client"
              >
                {Clients.map((item) => (
                  <Option key={item.Client} value={item.Client}>
                    {item.Client}
                  </Option>
                ))}
              </Select>
              <div className="flex gap-4 my-4">
                <Input
                  size="lg"
                  label="Date"
                  type="date"
                  containerProps={{
                    className: "!min-w-0",
                  }}
                  value={state.generalDate}
                  name="generalDate"
                  onChange={handleChange}
                />
                <Input
                  size="lg"
                  label="Address"
                  value={state.address}
                  name="address"
                  containerProps={{
                    className: "!min-w-0",
                  }}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full flex gap-4 my-4">
                <Input
                  size="lg"
                  label="Telephone"
                  value={state.phoneNumber}
                  type="text"
                  containerProps={{
                    className: "!min-w-0",
                  }}
                  name="phoneNumber"
                  onChange={handleChange}
                />
              </div>
              <div className="w-full flex gap-4 mt-4">
                <Input
                  size="lg"
                  label="Add Client"
                  name="client"
                  containerProps={{
                    className: "!min-w-0",
                  }}
                  value={state.client}
                  onChange={handleChange}
                />
                <Input
                  size="lg"
                  value={state.email}
                  label="Email"
                  containerProps={{
                    className: "!min-w-0",
                  }}
                  type="email"
                  name="email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full flex-1">
              <Typography variant="h5" className="pb-2">
                Transporter Information
              </Typography>
              <div className="w-full flex gap-4 mb-4">
                <Select
                  label="Company"
                  value={state.companyName}
                  onChange={(value) =>
                    setState({
                      ...state,
                      companyName: value,
                      company: value,
                    })
                  }
                >
                  {["Synergy Environmental", "Rapid Response Bio Clean"].map(
                    (item) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    )
                  )}
                </Select>
                <Input
                  size="lg"
                  containerProps={{
                    className: "!min-w-0",
                  }}
                  label="Date"
                  type="date"
                  name="representativeDate"
                  onChange={handleChange}
                />
              </div>
              <Input
                size="lg"
                label="Name of Person Collection Information"
                type="text"
                containerProps={{
                  className: "!min-w-0",
                }}
                name="transporterName"
                onChange={handleChange}
              />
              <div className="w-full flex gap-4 my-4">
                <Input
                  size="lg"
                  label="Address"
                  containerProps={{
                    className: "!min-w-0",
                  }}
                  value={state.transporterAddress}
                  name="transporterAddress"
                  onChange={handleChange}
                />
                <Input
                  size="lg"
                  label="Telephone"
                  containerProps={{
                    className: "!min-w-0",
                  }}
                  type="text"
                  value={state.transporterPhoneNumber}
                  name="transporterPhoneNumber"
                  onChange={handleChange}
                />
              </div>
              <Input
                size="lg"
                label="Items Collected"
                type="text"
                name="representative"
                value={state.representative}
                onChange={handleChange}
              />
            </div>
          </div>
          <SignPad state={state} setState={setState} />
          <div className="flex items-start gap-2">
            <Checkbox id="agree" />
            <label htmlFor="agree" className="text-zinc-800">
              I certify that the contents of this shipment are fully and
              accurately described, labeled and are in proper condition for
              transportation according to the applicable state and federal
              regulations.
            </label>
          </div>

          <Button disabled={loading} type="submit" variant="gradient">
            {loading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default App;
