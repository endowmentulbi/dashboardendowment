import { token } from "./cookies.js";

// Base Url
const BaseUrl = "https://endowment-be.ulbi.ac.id";

// Membuat objek konfigurasi untuk permintaan GET
export let requestOptionsGet = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  };

// Membuat objek konfigurasi untuk permintaan POST
export let requestOptionsPost = {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  };

// Membuat objek konfigurasi untuk permintaan PUT
export let requestOptionsPut = {
  method: "PUT",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
};

// Membuat objek konfigurasi untuk permintaan DELETE
export let requestOptionsDelete = {
  method: "DELETE",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
};

// API DONASI
export let UrlDonasiPospay = `${BaseUrl}/api/v1/pospay`;

// API AUTH
export let UrlLogin = `${BaseUrl}/api/auth/login`;
export let UrlRegister = `${BaseUrl}/api/auth/register`;

// API MACHINES
export let UrlMachines = `${BaseUrl}/api/machines`;
export let UrlMachineDetails = `${BaseUrl}/api/machine-details`;
export let UrlBakuMachine = `${BaseUrl}/api/machine-modules/machine`;
export let UrlBakuModuleMachine = `${BaseUrl}/api/machine-modules`;

// API USERS
export let UrlUsers = `${BaseUrl}/api/users`;

// API PRODUCTIONS
export let UrlProductions = `${BaseUrl}/api/productions`
export let UrlBakuModule = `${BaseUrl}/api/modules/`
export let UrlBaku = `${BaseUrl}/api/modules/production`
export let UrlBakuMachines = `${BaseUrl}/api/machine-modules`

// API PRODUCTION DETAILS
export let UrlProductionDetails = `${BaseUrl}/api/details`;
export let UrlProductionSteps = `${BaseUrl}/api/production`;

// API OPERATIONS
export let UrlOperations = `${BaseUrl}/api/operations`;

// SUMMARY
export let UrlSumProduksi = `${BaseUrl}/api/productions-summary`;
export let UrlSumMesin = `${BaseUrl}/api/machines-summary`;