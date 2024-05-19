import { ref } from "vue";
import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify, Dialog } from "quasar";

export const useCaiDatMucTieuStore = defineStore("storeCaiDatMucTieu", {
  state: () => ({
    limitValue: 0,
    createLimitValue: 0,
    isHaveLimitValue: false,
    tabSelected: ref("tab1"),
    isShowDeletedListDialog: false,
    selectListDeleteValue: "",
  }),
  actions: {
    async postCreateLimitValue(value) {
      try {
        const url = "/general-setup/max-value-target";
        const data = {
          value,
          userCreate: "Khoa.tran",
          userUpdate: "Khoa.tran",
          isDisable: false,
        };

        const result = await api.post(url, data);

        console.log(result);

        if (result.data.status === 200) {
          Notify.create({
            type: "positive",
            message: "Thao tác thành công !",
            position: "top-right",
            color: "white",
            textColor: "black",
            iconColor: "green",
            timeout: 2000,
            multiLine: true,
            progress: true,
            classes: "custom-size-notify",
          });
        } else {
          Dialog.create({
            title: "Thông báo",
            message: `Thao tác thất bại: ${result.data.message}`,
            ok: true,
            cancel: false,
          });
        }
      } catch (err) {
        console.error("Internal Server Error postCreateLimitValue(): ", err);
      }
    },

    async getLimitValue() {
      try {
        const url = "/general-setup/max-value-target";

        const result = await api.get(url);

        if (result.data.status === 200) {
          this.isHaveLimitValue = true;
          this.limitValue = result.data.data.value;
          return +result.data.data.value;
        } else {
          console.error("No data limit value response !");
        }
      } catch (err) {
        console.error("Internal Server Error getLimitValue(): ", err);
      }
    },

    async postUpdateLimitValue(value) {
      console.log("hi");
      try {
        const url = "/general-setup/max-value-target";
        const data = {
          value,
          isDisable: false,
        };

        const result = await api.patch(url, data);

        console.log(result);

        if (result.data.status === 200) {
          Notify.create({
            type: "positive",
            message: "Thao tác thành công !",
            position: "top-right",
            color: "white",
            textColor: "black",
            iconColor: "green",
            timeout: 2000,
            multiLine: true,
            progress: true,
            classes: "custom-size-notify",
          });
        } else {
          Dialog.create({
            title: "Thông báo",
            message: `Thao tác thất bại: ${result.data.message}`,
            ok: true,
            cancel: false,
          });
        }
      } catch (err) {
        console.error("Internal Server Error getLimitValue(): ", err);
      }
    },

    /* FUNCTIONAL */
    async showDialogListDeleted(val, length = 0) {
      try {
        console.log(length);
        if (!length) {
          Dialog.create({
            title: "Thông báo",
            message: "Không có dữ liệu xóa. Vui lòng thử lại !",
            ok: true,
            cancel: false,
          });
          return;
        }

        this.selectListDeleteValue = val;
        this.isShowDeletedListDialog = true;
        console.log(val);
      } catch (err) {
        console.error("Error when show dialog deleted list: ", err);
      }
    },
  },
});
