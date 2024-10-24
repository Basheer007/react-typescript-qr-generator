import React, { useState } from "react";

const Qrcode = () => {
  const [qrImage, setQrImage] = useState<string>("");
  const [progress, setProgress] = useState<boolean>(false);
  const [sizeOfQrImage, setSizeOfQrImage] = useState<number>(0);
  const [urlValue, setUrlValue] = useState<string>("");
  const [erroMessageValue, setErrorMessageValue] = useState<string>("");
  const [erroMessageSize, setErrorMessageSize] = useState<string>("");

  const api: string = `https://api.qrserver.com/v1/create-qr-code/?size=${sizeOfQrImage}x${sizeOfQrImage}&data=${urlValue}`;

  //getting url value form input
  function getUrlvalue(e: React.ChangeEvent<HTMLInputElement>) {
    setUrlValue(e.target.value);
  }
  function getSizeOfQRcode(e: React.ChangeEvent<HTMLInputElement>) {
    setSizeOfQrImage(parseInt(e.target.value));
  }

  async function generateQR() {
    if (urlValue == "" || sizeOfQrImage == 0 || isNaN(sizeOfQrImage)) {
      setErrorMessageValue("All values or required");
      setErrorMessageSize("All values or required");
      return;
    } else {
      try {
        setProgress(true);
        const qrcodeimg = await fetch(api);
        setQrImage(qrcodeimg.url);
      } catch (error) {
        alert(error);
      } finally {
        setProgress(false);
        setErrorMessageValue("");
        setErrorMessageSize("");
        setUrlValue("");
      }
    }
  }

  async function downloadQr() {
    try {
      const response = await fetch(qrImage);
      const blob = await response.blob(); // Await the blob method
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Qr.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert(error);
    }
  }
  return (
    <main className="h-dvh flex justify-center items-center font-inter">
      <div className="border-2 border-black rounded-md px-2 py-1">
        <h2 className="text-3xl font-bold px-3 py-1 text-center">
          Generate QR code
        </h2>

        <div className=" flex justify-center p-3">
          {qrImage && (
            <img
              src={qrImage}
              alt="personOncomputer"
              className=" object-cover rounded-md"
            />
          )}
        </div>
        <p className="text-center py-2 text-red-700 capitalize">
          {progress && "loading please wait.. "}
        </p>
        <div className="flex flex-col items-center">
          <div className="py-2 flex justify-between  gap-4  w-max">
            <label htmlFor="dataForQrcode">Data for Qrcode:</label>
            <input
              type="text"
              id="dataForQrcode"
              placeholder="Enter a URL to generate"
              onChange={getUrlvalue}
              value={urlValue}
              className="border-2 border-black rounded-sm px-2"
            />
          </div>
          <div className=" w-full flex justify-end px-2">
            <p className="text-right text-[13px] capitalize text-red-600">
              {erroMessageValue}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center my-2">
          <div className="py-2 flex justify-between  gap-4  w-max">
            <label htmlFor="Qrcode-Size">Qrcode Size :</label>
            <input
              type="text"
              id="Qrcode-Size"
              placeholder="Enter Qr code size (e.g 300)"
              onChange={getSizeOfQRcode}
              className="border-2 border-black rounded-sm px-2"
            />
          </div>
          <div className=" w-full flex justify-end px-2">
            <p className="text-right text-[13px] capitalize text-red-600">
              {erroMessageSize}
            </p>
          </div>
        </div>
        <div className="flex gap-3 px-2 py-4 ">
          <div>
            <button
              onClick={generateQR}
              disabled={progress ? true : false}
              className="border border-black px-2 py-1 rounded-sm bg-yellow-400 text-white"
            >
              Generate Qr code
            </button>
          </div>
          <div>
            <button
              onClick={downloadQr}
              className="border border-black px-2 py-1 rounded-sm bg-green-700 text-white"
            >
              Download QR
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Qrcode;
