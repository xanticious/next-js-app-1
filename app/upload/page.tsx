"use client";

import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { CldImage } from "next-cloudinary";

interface CloudinaryResult {
  public_id: string;
}

const UploadPage = () => {
  const [publicId, setPublicId] = useState("");

  return (
    <>
      {publicId && (
        <CldImage
          src={publicId}
          width={270}
          height={180}
          alt="An uploaded image"
        />
      )}

      <CldUploadWidget
        uploadPreset="gdbybt2f"
        options={{
          sources: ["local"],
          multiple: false,
          maxFiles: 5,
        }}
        onSuccess={(result) => {
          const info = result.info as CloudinaryResult;
          setPublicId(info.public_id);
        }}
      >
        {({ open }) => (
          <button className="btn btn-primary" onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
