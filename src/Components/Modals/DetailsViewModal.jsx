import React from "react";

const DetailsViewModal = ({ setDetailsView, member }) => {
  return (
    <div>
      <input type="checkbox" id="details_view_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box w-11/12 max-w-5xl">
        <label
              onClick={() => setDetailsView(null)}
              htmlFor="details_view_modal"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              x
            </label>
          <div className="flex gap-2">
            <div className="avatar">
              <div className="w-24 mask mask-squircle">
                <img src={member?.photo} alt={member?.name} />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg">{member?.name}</h3>
              <p>Date of Birth : {member?.personalInfo?.birthDate}</p>
              <p>Course: {member?.academicInfo?.course}</p>
              <p>Institute: {member?.academicInfo?.institute}</p>
              <p>Intake: {member?.academicInfo?.intake}</p>
            </div>
          </div>
          <p className="py-4">Document For Age Confirmation:</p>
          <img src={member?.ageConfirmation} alt={member?.name} />
          <p className="py-4">Document For Course Confirmation:</p>
          <img
            src={member?.courseConfirmation}
            alt={member?.name}
          />
          <div className="modal-action">
            <label
              onClick={() => setDetailsView(null)}
              htmlFor="details_view_modal"
              className="btn"
            >
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsViewModal;
