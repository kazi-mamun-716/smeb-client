import React from "react";

const RegPrevComp = ({ inputData, setPreview }) => {
  const {} = {
    name: "",
    father: "",
    mother: "",
    email: "",
    birthDate: "",
    presentAddress: "",
    permanentAddress: "",
    bloodGroup: "",
    nationality: "",
    course: "",
    institute: "",
    intake: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    whatsapp: "",
    telegram: "",
    gender: "",
    emergencyPerson: "",
    relation: "",
    emergencyNo: "",
  };
  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="reg_prev_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box w-11/12 max-w-5xl">
          <section className="lg:flex lg:justify-around">
            <div>
              <p>Name: {inputData.name}</p>
              <p>Father: {inputData.father}</p>
              <p>Mother: {inputData.mother}</p>
              <p>Gender: {inputData.gender}</p>
              <p>Birth Date: {inputData.birthDate}</p>
              <p>Blood Group: {inputData.bloodGroup}</p>
              <p>Mobile No: {inputData.mobile}</p>
              <p>Nationality: {inputData.nationality}</p>
            </div>
            <div>
              <p>Present Address: {inputData.presentAddress}</p>
              <p>Permanent Address: {inputData.permanentAddress}</p>
              <p>Course: {inputData.course}</p>
              <p>Intake: {inputData.intake}</p>
              <p>Institute: {inputData.institute}</p>
              <p>Emergycy Contact Person: {inputData.emergencyPerson}</p>
              <p>Contact Person Mobile: {inputData.emergencyNo}</p>
              <p>Relation: {inputData.relation}</p>
            </div>
          </section>
          <div className="modal-action">
            <label
              onClick={() => setPreview(false)}
              htmlFor="reg_prev_modal"
              className="btn btn-warning"
            >
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegPrevComp;
