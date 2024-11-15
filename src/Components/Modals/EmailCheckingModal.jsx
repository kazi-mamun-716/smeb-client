/* eslint-disable react/prop-types */

function EmailCheckingModal({setOpenModal, data}) {
    console.log(data)
  return (
    <div>
      <input type="checkbox" id="checking_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Checking Participation</h3>
          <p className="py-4">This modal works with a hidden checkbox!</p>
          <div className="modal-action">
            <label htmlFor="checking_modal" className="btn" onClick={()=>setOpenModal(null)}>
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailCheckingModal;
