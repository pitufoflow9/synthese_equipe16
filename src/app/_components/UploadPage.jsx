"use client";

import "@/app/_components/Nav.css";
import "@/app/_components/Footer.css";
import "@/app/_components/MainPageClient.css";
import "@/app/_components/UploadPage.css";
import { useRef, useState, useCallback } from "react";
import { useUploadThing } from "@/lib/uploadthing/client";
import WestIcon from "@mui/icons-material/West";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Footer from "./Footer.jsx";
import Nav from "./Nav.jsx";
import Link from "next/link";

const UploadPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    "imageUploader",
    {
      onUploadProgress: (progress) => setUploadProgress(progress ?? 0),
      onClientUploadComplete: (res) => {
        setError("");
        const fileInfo = res?.[0];
        setUploadResult(fileInfo ?? null);
        setUploadProgress(100);
      },
      onUploadError: (err) => setError(err?.message ?? "Upload failed"),
    }
  );

  const handleFiles = useCallback(
    async (files) => {
      if (!files?.length || isUploading) return;
      setError("");
      setUploadResult(null);
      setUploadProgress(0);
      try {
        await startUpload(Array.from(files));
      } catch (err) {
        setError(err?.message ?? "Upload failed");
      }
    },
    [isUploading, startUpload]
  );

  const onDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    handleFiles(event.dataTransfer.files);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    setDragActive(false);
  };

  const onBrowseClick = () => fileInputRef.current?.click();

  const onFileChange = (event) => {
    handleFiles(event.target.files);
    event.target.value = "";
  };

  const acceptedTypes =
    permittedFileInfo?.config?.image?.mimeTypes?.join(",") ?? "image/*";

  return (
    <div className="page-container">
      <img className="bg" src="../../../img/Background_2.jpg" alt="" />

      <Nav />

      <h1 className="upload-h1">Televersement de fichier</h1>
      <div className="upload-container-1">
        <Link href="/storyform">
          <button className="btn btn-back">
            <WestIcon />
            Retour
          </button>
        </Link>
        <div className="upload-container-2">
          <div
            className={`upload-container-3 ${dragActive ? "is-dragging" : ""}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedTypes}
              className="hidden-file-input"
              onChange={onFileChange}
            />
            <UploadFileIcon sx={{ fontSize: 80 }} />
            <p>
              Deposez votre fichier ici ou{" "}
              <span role="button" onClick={onBrowseClick}>
                parcourez
              </span>
            </p>
            <div className="upload-status">
              {isUploading && (
                <p>
                  Televersement en cours... {Math.round(uploadProgress)}%
                </p>
              )}
              {!isUploading && uploadResult?.url && (
                <p className="upload-success">
                  Fichier pret :{" "}
                  <a href={uploadResult.url} target="_blank" rel="noreferrer">
                    ouvrir le lien
                  </a>
                </p>
              )}
              {error && <p className="upload-error">{error}</p>}
            </div>
          </div>
          <button
            className="btn btn-browse"
            onClick={onBrowseClick}
            disabled={isUploading}
          >
            {isUploading ? "Téléversement..." : "Parcourir"}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UploadPage;
