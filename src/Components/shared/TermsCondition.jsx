import React from "react";

const TermsCondition = ({ setShowCondition }) => {
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <input type="checkbox" id="terms_condition" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">This modal works with a hidden checkbox!</p>
          <div className="modal-action">
            <label onClick={()=>setShowCondition(false)} htmlFor="terms_condition" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;
