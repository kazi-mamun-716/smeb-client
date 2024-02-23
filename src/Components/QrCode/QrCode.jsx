import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
const QrCode = ({ user }) => {
  const [downloadLink, setDownloadLink] = useState("");
  const value = `
        Name: ${user?.name}
        Mobile: ${user?.mobile}
        SMEB ID: ${user?.smebId}
    `;
  useEffect(() => {
    QRCode.toDataURL(
      value,
      {
        width: 200,
        margin: 2,
        color: {
          dark: "#335383FF",
          light: "#EEEEEEFF",
        },
      },
      (err, data) => {
        if (err) {
          console.log(err);
        }
        setDownloadLink(data);
      }
    );
  }, []);
  return (
    <section>
      <p className="text-xl font-bold underline text-center">QR Code</p>

      <div className="flex flex-col items-center my-2">
        <img src={downloadLink} alt={user?.name} />
        <a
          className="btn btn-info btn-xs my-2"
          href={downloadLink}
          download="qrcode.png"
        >
          Download
        </a>
      </div>
    </section>
  );
};

export default QrCode;
