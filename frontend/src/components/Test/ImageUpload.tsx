"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "@/lib/axiosConfig";

export default function Test() {
  const [image, setImage] = useState<any>();
  const [imageRaw, setImageRaw] = useState<any>();
  const [imageList, setImageList] = useState<any[]>();
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnchange = (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setImageRaw(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!imageRaw) {
      return;
    }

    const formData = new FormData();
    formData.append("img", imageRaw);

    try {
      axios
        .post(`/test/img-upload`, formData)
        .then((response) => {
          setIsChanged((prev) => !prev);
          setImage("");
          console.log("Data is returned", response.data?.data?.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error.response.data);
        });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchImageList = () => {
    setIsLoading(true);
    axios(`/test/img-list-get`)
      .then((response) => {
        setImageList(response.data?.data?.data);
        console.log("Data is returned", response.data?.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.response.data);
        setIsLoading(false);
      });
  };

  const bufferToBase64 = (data: any) => {
    const bufferData = Buffer.from(data, "utf-8");
    return bufferData.toString("base64");
  };

  useEffect(() => {
    fetchImageList();
  }, [isChanged]);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center pt-10 gap-10">
        <input
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs"
          onChange={handleOnchange}
        />
        {image && (
          <>
            <div>
              <Image src={image} alt="preview" width={500} height={500} />
            </div>
            <div>
              <button className="btn btn-primary" onClick={handleUpload}>
                Upload
              </button>
            </div>
          </>
        )}
      </div>
      <div>
        <div className="divider w-full mt-10" />
        {isLoading && (
          <div className="w-full flex justify-center items-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        )}
        {!isLoading && (
          <div className="grid grid-col-3 grid-flow-col gap-4 w-full items-center justify-center p-4">
            {imageList?.map((item, index) => (
              <Image
                key={index}
                src={`data:${item.mimeType};base64,${bufferToBase64(item?.buffer?.data)}`}
                alt="img"
                width={300}
                height={300}
              />
            ))}
          </div>
        )}
        <div className="divider w-full" />
      </div>
    </>
  );
}
