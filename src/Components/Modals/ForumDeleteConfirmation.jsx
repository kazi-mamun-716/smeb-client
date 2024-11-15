import React from 'react'

function ForumDeleteConfirmation({handleClick, forumId}) {
  return (
    <div>
      <input type="checkbox" id="forum_delete_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <label
            htmlFor="forum_delete_modal"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            x
          </label>
          <h3 className="font-bold text-lg">Delete Confirmation</h3>
          <p className="py-4">
            Are You Really Want to Remove this Discussion?
          </p>
          <div className="modal-action">
            <label
              onClick={()=>handleClick(forumId)}
              htmlFor="forum_delete_modal"
              className="btn btn-sm btn-accent"
            >
              Delete
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForumDeleteConfirmation