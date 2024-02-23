import React from "react";

const ActiveMember = ({ member }) => {
  const membershipTimeline = [
    {
      id: 1,
      status: "Admin Secretary Approval",
    },
    {
      id: 2,
      status: "Finance Secretary Approval",
    },
    {
      id: 3,
      status: "General Secretary Approval",
    },
    {
      id: 4,
      status: "President Approval",
    },
    {
      id: 5,
      status: "Active",
    },
  ];
  return (
    <div className="flex flex-col items-center">
      <h4 className="text-xl font-bold underline">
        Activation System Path for member
      </h4>
      <p className="my-2">Hello, <span className="text-pink-400 font-semibold">{member?.gender === "male" ? "Mr." : "Mrs."} {member?.name}</span> Please Wait till Active Status</p>
      {/* <ul className="timeline">
        {membershipTimeline.map((mt, index) => (
          <li key={mt.id}>
            {mt.id > 1 && (
              <hr
                className={`${
                  mt.status.toLowerCase().includes(member?.status)
                    ? "bg-primary"
                    : ""
                }`}
              />
            )}
            <div className={`timeline-${mt.id % 2 !== 0 ? "start" : "end"} timeline-box`}>
              {mt.status}
            </div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-primary"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {mt.id < membershipTimeline.length && (
              <hr
                className={`${
                  mt.status.toLowerCase().includes(member?.status)
                    ? "bg-primary"
                    : ""
                }`}
              />
            )}
            
          </li>
        ))}
      </ul> */}

      <ul className="timeline timeline-vertical">
        {membershipTimeline?.map((mt, index) => (
          <li key={mt?.id}>
            {mt?.id % 2 !== 0 ? (
              <>
              {mt?.id>1 && <hr/>}
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end timeline-box">
                  {mt?.status}
                </div>
                <hr />
              </>
            ) : (
              <>
                <hr />
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end timeline-box">{mt?.status}</div>
                {mt?.id<membershipTimeline.length && <hr/>}
              </>
            )}
          </li>
        ))}
      </ul>

      <p>Please be Patient.</p>
      <p>Admins will verify your request shortly and give response very soon</p>
      <p>After activation you can access all functionality of this site</p>
    </div>
  );
};

export default ActiveMember;
