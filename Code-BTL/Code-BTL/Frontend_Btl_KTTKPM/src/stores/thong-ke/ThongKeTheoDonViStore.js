import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useStoreThongKeTheoDonVi = defineStore("thongKeTheoDonViStore", {
  state: () => ({
    companyData: [],
    companySelected: "",
    randomValue: "",
  }),
  getters: {},
  actions: {
    async getCompany() {
      const companyData = await api.get("/api/companys");
      if (companyData.status === 200) {
        this.companyData = companyData.data.data.map((item) => ({
          _id: item._id,
          name: item.name,
          label: item.name,
        }));
      }
    },
  },
});
