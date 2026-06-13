import { useState, useEffect } from "react";
import axios from "axios";

const FARMER_API = "http://localhost:8082/farmers";
const ALLOCATION_API = "http://localhost:8082/api/allocation";
const SCHEME_API = "http://localhost:8082/api/schemes";

/* DROPDOWNS */
const cropOptions = ["Tomato", "Potato", "Chilli", "Ginger", "Arecanut", "Pepper", "Coconut", "Mango", "Cocoa", "Cashew"];
const statusOptions = ["PAID", "PENDING"];

function AdminPage() {

  const [activeSection, setActiveSection] = useState("farmer");
  const [viewType, setViewType] = useState("farmer");

  const [farmers, setFarmers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [allRecords, setAllRecords] = useState({
    farmers: [],
    allocations: [],
    schemes: []
  });

  const [inspections, setInspections] = useState([]);
  const [searchMobile, setSearchMobile] = useState("");
  const [showRecords, setShowRecords] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobile: "",
    aadhaar: "",
    village: "",
    cropTypes: []
  });

  const [allocationForm, setAllocationForm] = useState({
    mobile: "",
    schemeName: "",
    amount: "",
    status: ""
  });

  const [schemes, setSchemes] = useState([]);


  const [schemeForm, setSchemeForm] = useState({
    schemeName: "",
    cropType: "",
    subsidyAmount: "",
    benefits: "",
    eligibility: "",
    documentsRequired: "",
    applicationPeriod: "",
    procedureSteps: "",
    applyLink: ""
  });

  const [crops, setCrops] = useState([]);
  const [pesticideForm, setPesticideForm] = useState({
    name: "",
    crop: "",
    type: ""
  });

  const [showInspections, setShowInspections] = useState(false);
  const [pesticides, setPesticides] = useState([]);

  const [approvedData, setApprovedData] = useState([]);
  const [bannedData, setBannedData] = useState([]);
  /* ================= LOAD SCHEMES (FIXED) ================= */
  useEffect(() => {
    loadSchemes();
    loadCrops();
  }, []);


  const loadSchemes = async () => {
    try {
      const res = await axios.get(`${SCHEME_API}/all`);
      setSchemes(res.data);
    } catch {
      console.log("Error loading schemes");
    }
  };

  const loadCrops = async () => {
    try {
      const res = await axios.get("http://localhost:8082/api/pesticides/crops");
      setCrops(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadSeparatedData = async () => {
    try {

      // ✅ ALL APPROVED (no crop filter)
      const approvedRes = await axios.get(
        "http://localhost:8082/api/pesticides/all"
      );

      // filter approved in frontend
      const approved = approvedRes.data.filter(p => p.type === "APPROVED");

      // ✅ BANNED (already correct)
      const bannedRes = await axios.get(
        "http://localhost:8082/api/pesticides/filter?crop=All&type=BANNED"
      );

      setApprovedData(approved);
      setBannedData(bannedRes.data);

    } catch (err) {
      console.log(err);
    }
  };

  const searchInspectionByMobile = async () => {
    try {
      console.log("Searching for:", searchMobile);

      const res = await axios.get(
        `http://localhost:8082/inspection/search`,
        {
          params: { mobile: searchMobile }
        }
      );

      console.log("Response:", res.data);

      setInspections(res.data);
      setShowInspections(true);

    } catch (err) {
      console.error("Search error:", err);
    }
  };

  // ✅ EDIT STATE
  const [editId, setEditId] = useState(null);
  const [editingFarmerId, setEditingFarmerId] = useState(null);

  // ✅ UPDATE pesticide (reuse add API)
  const updatePesticide = async () => {
    try {
      await axios.post(
        "http://localhost:8082/api/pesticides/add",
        { ...pesticideForm, id: editId } // send id
      );

      alert("✅ Updated Successfully");

      setEditId(null);
      setPesticideForm({ name: "", crop: "", type: "" });

      loadSeparatedData(); // refresh

    } catch (err) {
      console.log(err);
    }
  };

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAllocationChange = (e) => {
    setAllocationForm({ ...allocationForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios.post(FARMER_API, {
      ...form,
      cropTypes: form.cropTypes.join(", ")
    });
    alert("✅ Farmer Saved");
    setForm({
      firstName: "",
      middleName: "",
      lastName: "",
      mobile: "",
      aadhaar: "",
      village: "",
      cropTypes: []
    });
  };

  const handleSearch = async (value) => {
    setSearchQuery(value);
    if (!value.trim()) {
      setFarmers([]);
      return;
    }
    const res = await axios.get(`${FARMER_API}/search?query=${value}`);
    setFarmers(res.data);
  };

  const handleAllocationSubmit = async () => {
    await axios.post(ALLOCATION_API, allocationForm);
    alert("✅ Allocation Saved");
    setAllocationForm({
      mobile: "",
      schemeName: "",
      amount: "",
      status: ""
    });
  };

  const handleSchemeChange = (e) => {
    setSchemeForm({ ...schemeForm, [e.target.name]: e.target.value });
  };

  /* ================= SCHEME SUBMIT (FIXED DUPLICATE + REFRESH) ================= */
  const handleSchemeSubmit = async () => {

    const duplicate = schemes.find(
      s => s.schemeName === schemeForm.schemeName && s.cropType === schemeForm.cropType
    );

    if (duplicate) {
      alert("❌ Duplicate Scheme Exists");
      return;
    }

    await axios.post(`${SCHEME_API}/add`, schemeForm);
    alert("✅ Scheme Saved");

    setSchemeForm({
      schemeName: "",
      cropType: "",
      subsidyAmount: "",
      benefits: "",
      eligibility: "",
      documentsRequired: "",
      applicationPeriod: "",
      procedureSteps: "",
      applyLink: ""
    });

    loadSchemes(); // 🔥 IMPORTANT FIX
  };

  const handlePesticideChange = (e) => {
    setPesticideForm({
      ...pesticideForm,
      [e.target.name]: e.target.value
    });
  };
  /* ================= VIEW ================= */

  const loadAllRecords = async () => {
    const farmersRes = await axios.get(FARMER_API);
    const allocationRes = await axios.get(ALLOCATION_API);
    const schemesRes = await axios.get(`${SCHEME_API}/all`);

    console.log("Schemes:", schemesRes.data);

    setAllRecords({
      farmers: farmersRes.data,
      allocations: allocationRes.data,
      schemes: schemesRes.data
    });

    setShowRecords(true);
  };

  const logout = () => {
    localStorage.removeItem("officer");
    window.location = "/";
  };

  const addPesticide = async () => {
    try {
      await axios.post(
        "http://localhost:8082/api/pesticides/add",
        pesticideForm
      );

      alert("✅ Added Successfully");

      setPesticideForm({
        name: "",
        crop: "",
        type: ""
      });

      loadSeparatedData(); // 🔥 auto refresh

    } catch (err) {
      console.log(err);
    }
  };

  const loadPesticides = async () => {
    try {
      const res = await axios.get("http://localhost:8082/api/pesticides/all");
      setPesticides(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadInspections = async () => {
    console.log("🔥 Button clicked");

    try {
      const res = await axios.get("http://localhost:8082/inspection/all");

      console.log("DATA:", res.data);

      // ✅ SHOW ALL DATA (NO FILTERING)


      setInspections(res.data);
      setShowInspections(true);

    } catch (err) {
      console.log("ERROR:", err);
    }
  };


  const deletePesticide = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/api/pesticides/delete/${id}`);
      loadSeparatedData(); // ✅ FIX
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ FARMER EDIT HANDLER
  const handleEditFarmer = (farmer) => {
    setForm({
      firstName: farmer.firstName,
      middleName: farmer.middleName,
      lastName: farmer.lastName,
      mobile: farmer.mobile,
      aadhaar: farmer.aadhaar,
      village: farmer.village,
      cropTypes: farmer.cropTypes.split(", ")
    });
    setEditingFarmerId(farmer.id);
    setActiveSection("farmer");
  };

  // ✅ FARMER DELETE HANDLER
  const handleDeleteFarmer = async (id) => {
    if (window.confirm("Are you sure you want to delete this farmer?")) {
      try {
        await axios.delete(`${FARMER_API}/${id}`);
        alert("✅ Farmer Deleted");
        setFarmers(farmers.filter(f => f.id !== id));
      } catch (err) {
        console.log(err);
        alert("❌ Error deleting farmer");
      }
    }
  };

  // ✅ UPDATE FARMER
  const handleUpdateFarmer = async () => {
    try {
      await axios.put(`${FARMER_API}/${editingFarmerId}`, {
        ...form,
        cropTypes: form.cropTypes.join(", ")
      });
      alert("✅ Farmer Updated");
      setEditingFarmerId(null);
      setForm({
        firstName: "",
        middleName: "",
        lastName: "",
        mobile: "",
        aadhaar: "",
        village: "",
        cropTypes: []
      });
    } catch (err) {
      console.log(err);
      alert("❌ Error updating farmer");
    }
  };
  /* ================= UI ================= */

  return (

    <div className="min-h-screen bg-[#f5f7fb] py-6 px-3 sm:px-6">

      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row justify-between items-center gap-3 border border-gray-200">

          <h1 className="text-xl sm:text-2xl font-bold text-emerald-700 tracking-wide">
            🌾 Horticulture Subsidy Admin
          </h1>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition shadow-sm">
            Logout
          </button>

        </div>


        {/* MENU */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-wrap gap-3 justify-center lg:justify-between">

          <button onClick={() => setActiveSection("farmer")}
            className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 text-sm sm:text-base rounded-lg transition">
            👨‍🌾 Farmer
          </button>

          <button onClick={() => setActiveSection("allocation")}
            className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 text-sm sm:text-base rounded-lg transition">
            💰 Allocation
          </button>

          <button onClick={() => setActiveSection("scheme")}
            className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2 text-sm sm:text-base rounded-lg transition">
            🌱 Scheme
          </button>

          <button onClick={() => setActiveSection("pesticide")}
            className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-lg">
            🧪 Pesticides
          </button>

          <button
            onClick={() => setActiveSection("inspection")}
            className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg"
          >
            📸 Inspection
          </button>

          <button onClick={() => setActiveSection("search")}
            className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-4 py-2 text-sm sm:text-base rounded-lg transition">
            🔍 Search
          </button>

          <button onClick={() => setActiveSection("view")}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 text-sm sm:text-base rounded-lg transition">
            📊 View All
          </button>

        </div>


        {/* FARMER */}
        {activeSection === "farmer" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="font-bold mb-3 text-emerald-600">Farmer</h2>

            {Object.keys(form).map(field => (
              field === "cropTypes" ? (
                <div className="mb-4">

                  <label className="block text-green-700 font-semibold mb-2">
                    Select Crops
                  </label>

                  <div >


                    <select
                      className="w-full border border-gray-300 rounded-lg p-2"
                      id="cropSelect"

                      onChange={(e) => {

                        const selectedCrop = e.target.value;

                        if (
                          selectedCrop &&
                          !form.cropTypes.includes(selectedCrop)
                        ) {

                          setForm({
                            ...form,
                            cropTypes: [
                              ...form.cropTypes,
                              selectedCrop
                            ]
                          });

                        }

                      }}
                    >

                      <option value="">Select Crop</option>

                      {cropOptions.map((c, i) => (
                        <option key={i} value={c}>
                          {c}
                        </option>
                      ))}

                    </select>



                  </div>

                  {/* DISPLAY SELECTED CROPS */}

                  <input
                    type="text"
                    value={form.cropTypes.join(", ")}
                    readOnly
                    placeholder="Selected crops"
                    className="w-full border border-gray-300 rounded-lg p-2 mt-3 bg-gray-100"
                  />

                </div>

              ) : (
                <input key={field} name={field} value={form[field]} onChange={handleChange}
                  placeholder={field}
                  className="w-full border border-gray-300 rounded-lg p-2 mb-2 focus:ring-2 focus:ring-emerald-300" />
              )
            ))}

            <button onClick={editingFarmerId ? handleUpdateFarmer : handleSubmit}
              className="bg-emerald-600 hover:bg-emerald-700 text-white w-full p-2 rounded-lg shadow">
              {editingFarmerId ? "Update Farmer" : "Add Farmer"}
            </button>

          </div>
        )}


        {/* ALLOCATION */}
        {activeSection === "allocation" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="font-bold mb-3 text-blue-600">Allocation</h2>

            <input name="mobile" value={allocationForm.mobile} onChange={handleAllocationChange}
              placeholder="mobile"
              className="w-full border border-gray-300 rounded-lg p-2 mb-2 focus:ring-2 focus:ring-blue-300" />

            <select name="schemeName" value={allocationForm.schemeName} onChange={handleAllocationChange}
              className="w-full border border-gray-300 rounded-lg p-2 mb-2">
              <option>Select Scheme</option>
              {schemes.map(s => <option key={s.id}>{s.schemeName}</option>)}
            </select>

            <input name="amount" value={allocationForm.amount} onChange={handleAllocationChange}
              placeholder="amount"
              className="w-full border border-gray-300 rounded-lg p-2 mb-2" />

            <select name="status" value={allocationForm.status} onChange={handleAllocationChange}
              className="w-full border border-gray-300 rounded-lg p-2 mb-2">
              <option>Select Status</option>
              {statusOptions.map(s => <option key={s}>{s}</option>)}
            </select>

            <button onClick={handleAllocationSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full p-2 rounded-lg shadow">
              Save
            </button>

          </div>
        )}


        {/* SCHEME */}
        {activeSection === "scheme" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="font-bold mb-3 text-purple-600">Scheme</h2>

            {Object.keys(schemeForm).map(field => (
              field === "cropType" ? (
                <select key={field} name={field} value={schemeForm[field]} onChange={handleSchemeChange}
                  className="w-full border border-gray-300 rounded-lg p-2 mb-2">
                  <option>Select Crop</option>
                  {cropOptions.map(c => <option key={c}>{c}</option>)}
                </select>
              ) : (
                <input key={field} name={field} value={schemeForm[field]} onChange={handleSchemeChange}
                  placeholder={field}
                  className="w-full border border-gray-300 rounded-lg p-2 mb-2" />
              )
            ))}

            <button onClick={handleSchemeSubmit}
              className="bg-purple-600 hover:bg-purple-700 text-white w-full p-2 rounded-lg shadow">
              Add Scheme
            </button>

          </div>
        )}

        {activeSection === "inspection" && (
          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-indigo-600 font-bold mb-3">
              📸 Inspection Records
            </h2>

            <button
              onClick={loadInspections}
              className="bg-indigo-600 text-white px-4 py-2 rounded mb-4"
            >
              Load Inspections
            </button>

            <div className="flex gap-2 mb-4">

              <input
                type="text"
                placeholder="Enter Mobile Number"
                value={searchMobile}
                onChange={(e) => setSearchMobile(e.target.value)}
                className="border p-2 rounded w-full"
              />

              <button
                onClick={searchInspectionByMobile}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Search
              </button>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {inspections.map((i) => (

                <div key={i.id} className="border p-3 rounded shadow">

                  <p><b>Farmer:</b> {i.farmer?.firstName} {i.farmer?.lastName}</p>
                  <p><b>Mobile:</b> {i.farmer?.mobile}</p>
                  <p><b>Crop:</b> {i.farmer?.cropTypes}</p>

                  <p>
                    <b>Location:</b>{" "}
                    <a
                      href={`https://www.google.com/maps?q=${i.latitude},${i.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Location 📍
                    </a>
                  </p>

                  <img
                    src={`data:image/jpeg;base64,${i.image}`}
                    alt="inspection"
                    className="mt-2 w-full h-40 object-cover rounded border"
                  />

                </div>

              ))}

            </div>
          </div>
        )}

        {activeSection === "pesticide" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">

            <h2 className="font-bold mb-3 text-green-600">Pesticide Management</h2>

            <input
              name="name"
              value={pesticideForm.name}
              onChange={handlePesticideChange}
              placeholder="Pesticide Name"
              className="w-full border border-gray-300 rounded-lg p-2 mb-2"
            />

            <select
              name="crop"
              value={pesticideForm.crop}
              onChange={handlePesticideChange}
              className="w-full border border-gray-300 rounded-lg p-2 mb-2"
            >
              <option value="">Select Crop</option>
              {crops.map((c, i) => (
                <option key={i}>{c}</option>
              ))}
            </select>

            <select
              name="type"
              value={pesticideForm.type}
              onChange={handlePesticideChange}
              className="w-full border border-gray-300 rounded-lg p-2 mb-2"
            >
              <option value="">Select Type</option>
              <option value="APPROVED">Approved</option>
              <option value="BANNED">Banned</option>
            </select>

            <button
              onClick={editId ? updatePesticide : addPesticide}
              className="bg-green-600 hover:bg-green-700 text-white w-full p-2 rounded-lg mb-2"
            >
              {editId ? "Update Pesticide" : "Add Pesticide"}
            </button>

            <button
              onClick={loadSeparatedData}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              Load Approved & Banned
            </button>

            {approvedData.length > 0 && (
              <>
                <h3 className="text-green-700 font-bold mt-6">✅ Approved Pesticides</h3>

                <table className="w-full border mt-2 text-center">
                  <thead className="bg-green-100">
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Crop</th>
                      <th>Status</th>
                      <th className="w-40 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {approvedData.map((p, i) => (
                      <tr key={p.id} className="border-b">

                        <td>{i + 1}</td>

                        <td>{p.name}</td>
                        <td>{p.crop}</td>

                        <td className="text-green-700 font-semibold">
                          {p.type}
                        </td>

                        <td className="flex gap-2 justify-center">

                          <button
                            onClick={() => {
                              setPesticideForm(p);
                              setEditId(p.id);
                            }}
                            className="bg-yellow-400 px-2 py-1 rounded"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => deletePesticide(p.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                          >
                            Delete
                          </button>

                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
            {bannedData.length > 0 && (
              <>
                <h3 className="text-red-700 font-bold mt-6">❌ Banned Pesticides</h3>

                <thead className="bg-red-100">
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Crop</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {bannedData.map((p, i) => (
                    <tr key={p.id}>

                      <td>{i + 1}</td>

                      <td>{p.name}</td>
                      <td>{p.crop}</td>

                      <td className="text-red-700 font-semibold">
                        {p.type}
                      </td>

                      <td className="flex gap-2 justify-center">

                        <button
                          onClick={() => {
                            setPesticideForm(p);
                            setEditId(p.id);
                          }}
                          className="bg-yellow-400 px-2 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deletePesticide(p.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </div>
        )}

        {/* SEARCH */}
        {activeSection === "search" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">

            <input value={searchQuery} onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search farmer"
              className="w-full border border-gray-300 rounded-lg p-2 mb-3" />

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg shadow-sm text-center">

                <thead className="bg-green-50 text-green-800">
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Crops</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {farmers.map((f, i) => (

                    <tr key={f.id} className="hover:bg-gray-100">

                      <td>{i + 1}</td>

                      <td>
                        {f.firstName} {f.middleName} {f.lastName}
                      </td>

                      <td>{f.mobile}</td>

                      <td>{f.cropTypes}</td>

                      <td className="p-2">

                        <div className="flex gap-2 justify-center">

                          <button
                            onClick={() => handleEditFarmer(f)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDeleteFarmer(f.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}
                </tbody>

              </table>
            </div>

          </div>
        )}



        {/* VIEW */}
        {activeSection === "view" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 w-full">

            <button onClick={loadAllRecords}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 mb-4 rounded-lg shadow">
              Load Records
            </button>

            <div className="flex flex-wrap gap-2 mb-4">
              <button onClick={() => setViewType("farmer")} className="bg-green-100 px-3 py-1 rounded-lg">Farmers</button>
              <button onClick={() => setViewType("allocation")} className="bg-blue-100 px-3 py-1 rounded-lg">Allocations</button>
              <button onClick={() => setViewType("scheme")} className="bg-purple-100 px-3 py-1 rounded-lg">Schemes</button>
            </div>

            {/* 🔥 SHOW DATA */}
            {showRecords && (

              <div className="overflow-x-auto">

                {/* FARMERS */}
                {viewType === "farmer" && (
                  <table className="w-full border mt-3 text-center">
                    <thead className="bg-green-50">
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Crops</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allRecords.farmers.map((f, i) => (
                        <tr key={f.id} className="hover:bg-gray-100">

                          <td>{i + 1}</td>

                          <td>
                            {f.firstName} {f.middleName} {f.lastName}
                          </td>

                          <td>{f.mobile}</td>

                          <td>{f.cropTypes}</td>

                          <td className="p-2">

                            <div className="flex gap-2 justify-center">

                              <button
                                onClick={() => handleEditFarmer(f)}
                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => handleDeleteFarmer(f.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                              >
                                Delete
                              </button>

                            </div>

                          </td>

                        </tr>

                      ))}
                    </tbody>
                  </table>
                )}

                {/* ALLOCATIONS */}
                {viewType === "allocation" && (
                  <table className="w-full border mt-3 text-center">
                    <thead className="bg-blue-50">
                      <tr>
                        <th>No</th><th>Scheme</th><th>Amount</th><th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allRecords.allocations.map((a, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{a.schemeName}</td>
                          <td>{a.amount}</td>
                          <td>{a.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* SCHEMES */}
                {viewType === "scheme" && (
                  <table className="w-full border mt-3 text-center">
                    <thead className="bg-purple-50">
                      <tr>
                        <th>No</th><th>Scheme</th><th>Crop</th><th>Amount</th><th>Period</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allRecords.schemes.map((s, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{s.schemeName}</td>
                          <td>{s.cropType}</td>
                          <td>₹{s.subsidyAmount}</td>
                          <td>{s.applicationPeriod}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

              </div>

            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default AdminPage;