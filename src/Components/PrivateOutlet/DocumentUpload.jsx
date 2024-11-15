import React, { useEffect, useState } from "react";
import { useUploadDocMutation } from "../../feature/usersApi";
import Loading from "../shared/Loading";
import { toast } from "react-toastify";

const DocumentUpload = () => {
  const [ageConfirmation, setAgeConfirmation] = useState(null);
  const [courseConfirmation, setCourseConfirmation] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [uploadDoc, { isError, isLoading, isSuccess, error }] =
    useUploadDocMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    const size = 1 * 1024 * 1024;
    if (
      ageConfirmation.size > size ||
      courseConfirmation.size > size ||
      profilePic.size > size
    ) {
      toast.error("Your File Size Must be below from 1 MB")
    } else {
      let formData = new FormData();
      formData.append("ageConfirmation", ageConfirmation);
      formData.append("courseConfirmation", courseConfirmation);
      formData.append("photo", profilePic);
      uploadDoc(formData);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Document Upload Successfully!");
    }
    if (isError) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, error]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="flex flex-col items-center">
      <h4 className="text-xl underline">Upload Your Document</h4>
      <div>
        <form onSubmit={handleSubmit}>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Profile Picture</span>
              <span className="label-text-alt">maximum 1 mb</span>
            </div>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full max-w-xs"
              onChange={(e) => setProfilePic(e.target.files[0])}
              required
            />
            {
              profilePic?.size > 1024 * 1024 && <p className="text-red-400 font-semibold">Photo Size will be maximum 1 MB </p>
            }
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Age Confirmation</span>
              <span className="label-text-alt text-sky-400">
                Photo of NID or Passport
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full max-w-xs"
              onChange={(e) => setAgeConfirmation(e.target.files[0])}
              required
            />
            {
              ageConfirmation?.size > 1024 * 1024 && <p className="text-red-400 font-semibold">Photo Size will be maximum 1 MB </p>
            }
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Course Confirmation</span>
              <span className="label-text-alt text-sky-400">
                Photo of Course Related Document
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full max-w-xs"
              onChange={(e) => setCourseConfirmation(e.target.files[0])}
              required
            />
            {
              courseConfirmation?.size > 1024 * 1024 && <p className="text-red-400 font-semibold">Photo Size will be maximum 1 MB </p>
            }
          </label>

          <label className="form-control w-full max-w-xs my-2">
            <input type="submit" className="btn btn-success" value="Upload" />
          </label>
        </form>
      </div>
    </section>
  );
};

export default DocumentUpload;
