'use client'
import React, { useState } from "react";

const PrescriptionForm = () => {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [medicine, setMedicine] = useState({
    name: "",
    morning: "",
    afternoon: "",
    evening: "",
    night: "",
    Quantity: "",
    instructions: "",
  });
  const [prescriptions, setPrescriptions] = useState([]);
  const [isPatientSaved, setIsPatientSaved] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // null when not editing

  const handleSavePatient = (e) => {
    e.preventDefault();
    setIsPatientSaved(true);
  };

  const handleAddMedicine = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedPrescriptions = [...prescriptions];
      updatedPrescriptions[editIndex] = {
        patientName,
        age,
        gender,
        medicine: { ...medicine },
      };
      setPrescriptions(updatedPrescriptions);
      setEditIndex(null);
    } else {
      const newPrescription = {
        patientName,
        age,
        gender,
        medicine: { ...medicine },
      };
      setPrescriptions([...prescriptions, newPrescription]);
    }

    setMedicine({
      name: "",
      morning: "",
      afternoon: "",
      evening: "",
      night: "",
      Quantity: "",
      instructions: "",
    });
  };

  const handleDelete = (index) => {
    const updated = prescriptions.filter((_, i) => i !== index);
    setPrescriptions(updated);
    if (editIndex === index) {
      setEditIndex(null);
      setMedicine({
        name: "",
        morning: "",
        afternoon: "",
        evening: "",
        night: "",
        Quantity: "",
        instructions: "",
      });
    }
  };

  const handleEdit = (index) => {
    const item = prescriptions[index];
    setMedicine({ ...item.medicine });
    setEditIndex(index);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Prescription Form</h1>

      {/* Patient Info */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
        <form onSubmit={handleSavePatient}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Patient Name</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                disabled={isPatientSaved}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                disabled={isPatientSaved}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
                disabled={isPatientSaved}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          {!isPatientSaved && (
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save Patient
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Medicine Info */}
      {isPatientSaved && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Medicine Information</h2>
          <form onSubmit={handleAddMedicine}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Medicine Name</label>
                <input
                  type="text"
                  value={medicine.name}
                  onChange={(e) => setMedicine({ ...medicine, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Morning</label>
                <input
                  type="text"
                  value={medicine.morning}
                  onChange={(e) => setMedicine({ ...medicine, morning: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Afternoon</label>
                <input
                  type="text"
                  value={medicine.afternoon}
                  onChange={(e) => setMedicine({ ...medicine, afternoon: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Evening</label>
                <input
                  type="text"
                  value={medicine.evening}
                  onChange={(e) => setMedicine({ ...medicine, evening: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Night</label>
                <input
                  type="text"
                  value={medicine.night}
                  onChange={(e) => setMedicine({ ...medicine, night: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="text"
                  value={medicine.Quantity}
                  onChange={(e) => setMedicine({ ...medicine, Quantity: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Instructions</label>
                <input
                  type="text"
                  value={medicine.instructions}
                  onChange={(e) => setMedicine({ ...medicine, instructions: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                {editIndex !== null ? "Update Medicine" : "Add Medicine"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Prescription Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Submitted Prescriptions</h2>
        {prescriptions.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">ល.រ</th>
                <th className="border p-2">ឈ្មោះថ្នាំ</th>
                <th className="border p-2">ព្រឹក</th>
                <th className="border p-2">ថ្ងៃ</th>
                <th className="border p-2">ល្ងាច</th>
                <th className="border p-2">យប់</th>
                <th className="border p-2">ចំនួនថ្នាំ</th>
                <th className="border p-2">សេចក្ដីណែនាំ</th>
                <th className="border p-2">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescription, index) => (
                <tr key={index}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{prescription.medicine.name}</td>
                  <td className="border p-2">{prescription.medicine.morning}</td>
                  <td className="border p-2">{prescription.medicine.afternoon}</td>
                  <td className="border p-2">{prescription.medicine.evening}</td>
                  <td className="border p-2">{prescription.medicine.night}</td>
                  <td className="border p-2">{prescription.medicine.Quantity}</td>
                  <td className="border p-2">{prescription.medicine.instructions}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1.5 me-1 mb-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 mb-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No prescriptions submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default PrescriptionForm;
