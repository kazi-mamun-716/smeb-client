import React, { useState } from "react";
import {
  useDeletePaymentReqMutation,
  usePaymentRequestMutation,
  usePaymentsQuery,
} from "../../../feature/usersApi";
import Loading from "../../../Components/shared/Loading";
import DeleteConfirmation from "../../../Components/Modals/DeleteConfirmation";

const MyPayment = () => {
  const [paymentData, setPaymentData] = useState({
    amount: "",
    month: "",
    ref: "",
    accountNo: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [makePaymentRequest, { isLoading }] = usePaymentRequestMutation();
  const [deletePayment] = useDeletePaymentReqMutation();
  const { isLoading: paymentLoading, data } = usePaymentsQuery();
  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    makePaymentRequest(paymentData);
    setPaymentData({
      amount: "",
      month: "",
      ref: "",
      accountNo: "",
    });
  };

  if (isLoading || paymentLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center">
      <section>
        <h4 className="text-xl underline">Create Payment Request</h4>
        <form onSubmit={handleSubmit}>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Amount:</span>
            </div>
            <input
              type="number"
              placeholder="Amount"
              className="input input-bordered w-full max-w-xs"
              name="amount"
              value={paymentData.amount}
              onChange={handleChange}
              required
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Month:</span>
            </div>
            <input
              type="month"
              placeholder="Academi Contact No"
              className="input input-bordered w-full max-w-xs"
              name="month"
              value={paymentData.month}
              onChange={handleChange}
              required
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Reference:</span>
            </div>
            <input
              type="text"
              placeholder="Sender Account Details"
              className="input input-bordered w-full max-w-xs"
              name="ref"
              value={paymentData.ref}
              onChange={handleChange}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Account No:</span>
            </div>
            <input
              type="number"
              placeholder="Receiver Account or Bkash No"
              className="input input-bordered w-full max-w-xs"
              name="accountNo"
              value={paymentData.accountNo}
              onChange={handleChange}
              required
            />
          </label>
          <label className="form-control w-full max-w-xs my-2">
            <input type="submit" className="btn btn-accent" value="Submit" />
          </label>
        </form>
      </section>
      <section>
        <h4 className="text-xl underline text-center">My Payments</h4>
        {data?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Amount (BDT)</th>
                  <th>Month</th>
                  <th>Reference</th>
                  <th>Sender</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((payment, index) => (
                  <tr key={payment?._id}>
                    <th>{index + 1}</th>
                    <td>{payment?.amount}</td>
                    <td>{payment?.month}</td>
                    <td>{payment?.ref}</td>
                    <td>{payment?.accountNo}</td>
                    <td>{payment?.status}</td>
                    <td>
                      {payment?.status === "accepted" ? (
                        <a
                          href={payment?.payslip}
                          className="btn btn-accent btn-xs"
                          target="_blank"
                        >
                          Download Payslip
                        </a>
                      ) : (
                        <label
                          onClick={() => setIsModalOpen(payment?._id)}
                          htmlFor="delete_modal"
                          className="btn btn-xs btn-info"
                        >
                          Delete
                        </label>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xl text-red-500 mt-2">No Payment Data Found!</p>
        )}
      </section>
      {isModalOpen && (
        <DeleteConfirmation
          payment={isModalOpen}
          setShowModal={setIsModalOpen}
          deletePayment={deletePayment}
        />
      )}
    </div>
  );
};

export default MyPayment;
