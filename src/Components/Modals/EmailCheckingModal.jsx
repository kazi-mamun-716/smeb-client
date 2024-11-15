/* eslint-disable react/prop-types */

function EmailCheckingModal({setOpenModal, data}) {
  return (
    <div>
      <input type="checkbox" id="checking_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Checking Participation</h3>
          {
            data?.email ? <><p>Hello Mr/Mst {data?.name}</p>
            <p className="py-4">
            {
              data?.status === "approved" ? 'Congratulation! Your Application has approved. You are succeccsfully participate on this event' : 'Your Application is Pending! please be patient!'
            }
            </p></>:<p className="text-red-400 font-bold text-xl">Not Found any participation data with this Email</p>
          }
          <div className="modal-action">
            <label htmlFor="checking_modal" className="btn" onClick={()=>setOpenModal(false)}>
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailCheckingModal;
