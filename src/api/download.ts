import useAxiosApi from '/@/utils/useAxiosApi';
import { businessDomain } from '/~/config/constant';
// 可可赚
export function getAndroidUrl() {
  return useAxiosApi(`/version/getLatestVersion`, {
    method: 'GET',
    baseURL: businessDomain['kkz'][import.meta.env.MODE],
  });
}
export function selectTreaty() {
  return useAxiosApi(`/app/userSystem/selectTreaty`, {
    method: 'GET',
    baseURL: businessDomain['kkz'][import.meta.env.MODE],
  });
}

//整点花
export function getZDHAndroidUrl(data: any) {
  return useAxiosApi(`/app/open/getLatestVersion`, {
    method: 'GET',
    baseURL: businessDomain['zdh'][import.meta.env.MODE],
    data,
  });
}

//YDZX
export function getYDZXAndroidUrl(data: any) {
  return useAxiosApi(`/app/open/getLatestVersion`, {
    method: 'GET',
    baseURL: businessDomain['ydzx'][import.meta.env.MODE],
    data,
  });
}

//KDDS
export function getKDDSAndroidUrl(data: any) {
  return useAxiosApi(`/app/open/getLatestVersion`, {
    method: 'GET',
    baseURL: businessDomain['kdds'][import.meta.env.MODE],
    data,
  });
}

//JLWY
export function getJLWYAndroidUrl(data: any) {
  return useAxiosApi(`/app/open/getLatestVersion`, {
    method: 'GET',
    baseURL: businessDomain['jlwy'][import.meta.env.MODE],
    data,
  });
}

//SQJL
export function getSQJLAndroidUrl(data: any) {
  return useAxiosApi(`/app/open/getLatestVersion`, {
    method: 'GET',
    baseURL: businessDomain['sqjl'][import.meta.env.MODE],
    data,
  });
}

export function getDownloadLink(applyIdentification: string, data: any) {
  if (applyIdentification === 'kkz') {
    return getAndroidUrl();
  } else if (applyIdentification === 'zdh') {
    return getZDHAndroidUrl(data);
  } else if (applyIdentification === 'kdds') {
    return getZDHAndroidUrl(data);
  } else if (applyIdentification === 'sqjl') {
    return getSQJLAndroidUrl(data);
  } else if (applyIdentification === 'ydzx') {
    return getYDZXAndroidUrl(data);
  } else if (applyIdentification === 'jlwy') {
    return getJLWYAndroidUrl(data);
  }
}
