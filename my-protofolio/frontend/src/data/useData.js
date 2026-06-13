import { useState, useEffect } from "react";
import { apiGetProjects, apiGetCertificates, apiGetCv } from "./api";
import { projects as staticProjects, certificates as staticCertificates } from "./data";

export function useProjects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGetProjects().then((apiData) => {
      if (apiData === null) {
        setData(staticProjects);
      } else {
        setData(apiData);
      }
      setLoading(false);
    });
  }, []);

  return { projects: data, loading };
}

export function useCertificates() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGetCertificates().then((apiData) => {
      if (apiData === null) {
        setData(staticCertificates);
      } else {
        setData(apiData);
      }
      setLoading(false);
    });
  }, []);

  return { certificates: data, loading };
}

export function useCvUrl() {
  const [url, setUrl] = useState("");

  useEffect(() => {
    apiGetCv().then((data) => {
      if (data === null) {
        setUrl("/Ibrahim-CV.pdf");
      } else if (data?.url) {
        setUrl(data.url);
      }
    });
  }, []);

  return url;
}
