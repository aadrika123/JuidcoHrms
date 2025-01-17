"use client"
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "@/lib/axiosConfig";
import { useRouter } from 'next/router';

// Define types for service list and service
interface Service {
  path: string;
  services: string;
}

interface ServiceResponse {
  status: boolean;
  data: Service[];
}

export function UseServiceCheck() {

const router = useRouter();
  const location = useLocation();
  const navigate = useNavigate();
  const [serviceList, setServiceList] = useState<Service[]>([]); // Define the correct type for serviceList
  const token = window.localStorage.getItem('token');

  const fetchMenuList = async () => {
    const requestBody = { moduleId: 6 };

    try {
      // Make API request
      const res = await axios.post<ServiceResponse>(
        "https://aadrikainfomedia.com/auth/api/get/services-by-module",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      );

      if (res?.data?.status) {
        setServiceList(res?.data?.data || []);
      } else {
        setServiceList([]);
      }
    } catch (error) {
      console.error('Error fetching service list:', error);
      setServiceList([]);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMenuList();
    }
  }, [token]);

  useEffect(() => {
    const serviceCheck = serviceList.find((service) =>
      location?.pathname.includes(service?.path.replace(':id', location.pathname.split('/')[3]))
    );

    const isService = serviceCheck
      ? { matched: true, services: serviceCheck.services }
      : { matched: false, services: null as any };

    if (isService.matched) {
      // ---------FETCH SERVICE PERMISSION API--------------
      const fetchServicePermission = async () => {
        try {
          const res = await axios.post(
            "https://aadrikainfomedia.com/auth/api/get/services-b-ulb-id",
            { path: location.pathname, moduleId: 1 },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
              },
            }
          );

          if (!res?.data?.status) {
            // navigate(`/service-restriction?service=${encodeURIComponent(isService.services)}`);
            router.push(`/service-restriction?service=${encodeURIComponent(isService.services)}`);
          }
        } catch (error) {
          console.log('Error with service permission API:', error);
        }
      };

      fetchServicePermission();

      // Navigate to the restriction page if matched service is found
    //   navigate(`/service-restriction?service=${encodeURIComponent(isService.services)}`);
    router.push(`/service-restriction?service=${encodeURIComponent(isService.services)}`);
    }
  }, [location.pathname, navigate, serviceList]);

}
