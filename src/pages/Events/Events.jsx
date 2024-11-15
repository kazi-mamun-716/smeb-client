import React, { useState } from "react";
import { useAllEventsQuery, useCountEventsQuery } from "../../feature/eventApi";
import Loading from "../../Components/shared/Loading";
import { Link } from "react-router-dom";
import Pagination from "../../Components/shared/Pagination";

function Events() {
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState(20);
  //need to add filter
  const { isLoading: countLoading, data: countEvent } =
    useCountEventsQuery(true);
  const { isLoading, data, isSuccess } = useAllEventsQuery({
    page: currentPage,
    size,
    filter: true,
  });
  if (isLoading || countLoading) {
    return <Loading />;
  }
  // console.log(data);
  return (
    <div>
      <h3 className="text-xl underline text-center">Events</h3>
      {isSuccess && data?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra table-xs">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Author</th>
                <th>Created at</th>
                <th>Expiring Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((event, index) => (
                <tr key={event?._id}>
                  <th>{index + 1}</th>
                  <td>
                    <Link to={`/events/${event?._id}`} className="link-primary">
                      {event?.title}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/profile/${event?.author?._id}`}
                      className="link-primary"
                    >
                      {event?.author?.name}
                    </Link>
                  </td>
                  <td>
                    {new Date(event?.createdAt).toLocaleDateString("en-gd")}
                  </td>
                  <td>
                    {event?.validity ? new Date(event?.validity).toLocaleDateString("en-gd"): 'Not have any expiry date'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-xl font-bold text-red-500 text-center">
          No Events Found!
        </p>
      )}
      <div className="flex justify-center">
        {countEvent?.count > size && (
          <Pagination
            count={countEvent?.count}
            size={size}
            setSize={setSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}

export default Events;
