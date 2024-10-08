import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import type { ReactElement } from "react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Loading from "../components/Loading";

export default function Settings(): ReactElement {
  const session = useSession();
  const router = useRouter();
  const [displayName, setDisplayName] = useState<string>();
  const [file, setFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.url;
    } catch (error) {
      console.error("Failed to upload file:", error);
      toast.error("Failed to upload file.");
      return null;
    }
  };

  const saveProfile = async (): Promise<void> => {
    if (!session.data) return;

    let uploadedAvatarUrl: string | null = null;
    if (file) {
      uploadedAvatarUrl = await uploadFile(file);
      if (!uploadedAvatarUrl) return; // Stop if file upload failed
    }

    const updateData = {
      displayName,
      avatarUrl: uploadedAvatarUrl ? uploadedAvatarUrl.split('/').pop()?.split('?')[0] : avatarUrl,
    };

    axios.patch("/api/auth/user", updateData)
      .then((response) => {
        setAvatarUrl(response.data.avatarUrl); // Update avatarUrl with pre-signed URL
        toast.success("Saved profile. Please sign out and sign back in to see the change.");
      })
      .catch(() => {
        toast.error("Failed to save profile.");
      });
  };

  useEffect(() => {
    if (session.status === "unauthenticated") router.push("/sign-in")
      .catch(() => toast.error("Failed to redirect when not logged in."));
  });

  useEffect(() => {
    if (!session.data?.user) return;
    setDisplayName(session.data.user.displayName);
    setAvatarUrl(session.data.user.avatarUrl);
  }, [session]);

  if (session.status !== "authenticated") return <Loading />;

  return (
    <section className="space-y-4">
      <h1>Update Your Information</h1>
      <div className="flex flex-row justify items-center">
        <div className="w-8 h-8 rounded-full p-1 mr-2 bg-slate-600 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG or JPG.</p>
        </div>
      </div>
      <div>
        <label htmlFor="display_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Display Name</label>
        <input
          type="text"
          id="display_name"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-sm"
        />
      </div>
      {avatarUrl && (
        <div className="flex items-center justify-center">
          <img src={avatarUrl} alt="Avatar" className="w-32 h-32 rounded-full" />
        </div>
      )}
      <button
        type="button"
        onClick={saveProfile}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2"
      >
        Save
      </button>
    </section>
  );
}