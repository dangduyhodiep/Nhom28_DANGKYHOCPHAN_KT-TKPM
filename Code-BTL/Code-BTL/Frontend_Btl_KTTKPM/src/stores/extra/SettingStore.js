import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingStore = defineStore("settingStore", {
  state: () => ({
    changePasswordDialog: false,
    searchDialog: false,
    searchFilter: "",
    searchResult: [],
    selectedSearchResult: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    active: "",
    routerName: ref(""),
    routerHref: ref(""),
  }),
  getters: {},
  actions: {
    formattedCreatedAt(value) {
      const date = new Date(value);
      return date.toLocaleDateString("en-GB");
    },
  },
});
