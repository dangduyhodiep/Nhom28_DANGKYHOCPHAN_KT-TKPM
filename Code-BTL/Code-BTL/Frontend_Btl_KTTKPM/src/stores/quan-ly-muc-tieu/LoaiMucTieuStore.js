import { defineStore } from "pinia";
import { api } from "@/boot/axios";
import { Dialog, Notify } from "quasar";

export const useLoaiMucTieuStore = defineStore("storeLoaiMucTieu", {
  state: () => ({
    listTargetType: [],
    listTargetTypeDisable: [],
    dialogAddTargetType: false,
    dialogUpdateTargetType: false,
    objectAddTarget: {
      name: "",
    },
    objectUpdateTarget: {},
    listTargetTypeFromTargetDatabase: [],
  }),
  getters: {},
  actions: {
    async getInit() {
      await this.getAllTargetTypeData();
      await this.getAllTargetDataDisable();
    },

    /**
     * NAME: Get all target type data
     * DESC:
     * @params
     * @author Tran Anh Khoa
     */
    async getAllTargetTypeData() {
      try {
        const url = "target-types";

        const result = await api.get(url);
        console.log("Result Get AllTargetTypeData: ", result.data.data);

        if (result.data.status === 200) {
          this.listTargetType = result.data.data;
          this.listTargetType = this.listTargetType.filter((i) => {
            if (!i.isDisable) return i;
          });
        }
      } catch (err) {
        console.error("Internal Server Error getAllTargetTypeData(): ", err);
      }
    },

    async getAllTargetDataDisable() {
      try {
        this.listTargetTypeDisable = [];
        const url = "/target-types?isDisable=true";

        const result = await api.get(url);

        if (result.data.status === 200) {
          this.listTargetTypeDisable = result.data.data;
          this.listTargetTypeDisable = this.listTargetTypeDisable.map(
            (item) => {
              return {
                ...item,
                isToggle: false,
              };
            }
          );
        }
      } catch (err) {
        console.error("Internal Server Error getAllTargetDataDisable(): ", err);
      }
    },

    async addTargetType(objectData) {
      try {
        const url = "/target-types/";
        const data = { name: objectData.name.toUpperCase().trim() };

        const result = await api.post(url, data);

        if (result.data.status === 200) {
          await this.getAllTargetTypeData();
          this.objectAddTarget = {};
          this.dialogAddTargetType = false;

          Notify.create({
            type: "positive",
            message: "Thêm thành công !",
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
            message: `Thêm loại mục tiêu thất bại: ${result.data.message}`,
            ok: true,
            cancel: false,
          });
        }
      } catch (err) {
        console.error("Internal Server Error: ", err);
      }
    },

    async deleteTargetType(objectDelete) {
      Dialog.create({
        title: "Cảnh báo",
        message: `Bạn có chắc muốn xóa loại mục tiêu: <b>${objectDelete?.name}</b> không ?`,
        html: true,
        ok: true,
        cancel: true,
      })
        .onOk(async () => {
          try {
            const check = this.listTargetTypeFromTargetDatabase.some((item) => {
              if (item === objectDelete._id) {
                return true;
              }
            });

            if (check) {
              Dialog.create({
                title: "Thông báo",
                message: "Loại mục tiêu đang được sử dụng, không được xóa !",
                ok: true,
                cancel: false,
              });
              return;
            }

            const url = `target-types?_id=${objectDelete._id}`;
            const data = {
              isDisable: true,
            };

            const result = await api.patch(url, data);
            console.log("Result Delete: ", result);

            if (result.data.status === 200) {
              await this.getAllTargetTypeData();
              Notify.create({
                type: "positive",
                message: "Xóa thành công !",
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
                message: `Xóa thất bại: ${result.data.message}`,
                ok: true,
                cancel: false,
              });
            }

            this.getInit();
          } catch (err) {
            console.error("Internal Server Error deleteTargetType(): ", err);
          }
        })
        .onCancel(() => {});
    },

    async updateTargetType(inputData) {
      try {
        // this.listTargetTypeDisable.forEach((item) => {
        //   if (inputData.name.trim() === item.name.trim()) {
        //     Dialog.create({
        //       title: "Thông báo",
        //       message:
        //         "Trùng tên loại mục tiêu, bạn có muốn bật loại mục tiêu này lên lại không ?",
        //       ok: true,
        //       cancel: false,
        //     }).onOk(async () => {
        //       const url = `target-types?_id=${item._id}`;
        //       const data = {
        //         isDisable: false,
        //       };

        //       const result = await api.patch(url, data);

        //       if (result.data.status === 200) {
        //         Notify.create({
        //           type: "positive",
        //           message: "Cập nhật thành công !",
        //           position: "top-right",
        //           color: "white",
        //           textColor: "black",
        //           iconColor: "green",
        //           timeout: 2000,
        //           multiLine: true,
        //           progress: true,
        //           classes: "custom-size-notify",
        //         });

        //         await this.getInit();
        //       } else {
        //         Dialog.create({
        //           title: "Thông báo",
        //           message: `Cập nhật thất bại: ${result.data.message}`,
        //           ok: true,
        //           cancel: false,
        //         });
        //       }

        //       this.dialogUpdateTargetType = false;
        //       return false;
        //     });
        //   }
        // });

        const sumArrayName = [
          ...this.listTargetType,
          ...this.listTargetTypeDisable,
        ].map((i) => i.name);

        if (sumArrayName.includes(inputData.name.trim())) {
          Dialog.create({
            title: "Thông báo",
            message: "Tên loại mục tiêu đã tồn tại !",
            ok: true,
            cancel: false,
          });
          return;
        }

        const url = `target-types?_id=${inputData._id}`;
        const data = {
          name: inputData.name.toUpperCase().trim(),
        };

        const result = await api.patch(url, data);

        if (result.data.status === 200) {
          Notify.create({
            type: "positive",
            message: "Cập nhật thành công !",
            position: "top-right",
            color: "white",
            textColor: "black",
            iconColor: "green",
            timeout: 2000,
            multiLine: true,
            progress: true,
            classes: "custom-size-notify",
          });

          await this.getInit();
        } else {
          Dialog.create({
            title: "Thông báo",
            message: `Cập nhật thất bại: ${result.data.message}`,
            ok: true,
            cancel: false,
          });
        }

        this.dialogUpdateTargetType = false;
      } catch (err) {
        console.log("Internal Server Error updateTargetType(): ", err);
      }
    },

    async enableListTargetDisable() {
      try {
        this.listTargetTypeDisable.map(async (item) => {
          if (item.isToggle) {
            const url = `/target-types?_id=${item._id}`;
            const data = {
              isDisable: false,
            };

            const result = await api.patch(url, data);

            console.log("result update: ", result);

            if (result.data.status === 200) {
              Notify.create({
                type: "positive",
                message: "Cập nhật thành công !",
                position: "top-right",
                color: "white",
                textColor: "black",
                iconColor: "green",
                timeout: 2000,
                multiLine: true,
                progress: true,
                classes: "custom-size-notify",
              });
              // await this.getInit();
            } else {
              Dialog.create({
                title: "Thông báo",
                message: `Cập nhật thất bại: ${result.data.message}`,
                ok: true,
                cancel: false,
              });
            }
          }
        });

        setTimeout(async () => {
          await this.getInit();
        }, 500);
      } catch (err) {
        console.error("Internal Server Error: ", err);
      }
    },
  },
});
