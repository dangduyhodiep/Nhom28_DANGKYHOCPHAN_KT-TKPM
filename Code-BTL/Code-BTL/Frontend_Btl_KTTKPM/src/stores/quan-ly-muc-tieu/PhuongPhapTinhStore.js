import { defineStore } from "pinia";
import { api } from "@/boot/axios";
import { Dialog, Notify } from "quasar";

export const usePhuongPhapTinhStore = defineStore("storePhuongPhapTinh", {
  state: () => ({
    listFormulaType: [],
    listFormulaTypeDisable: [],
    dialogAddFormulaType: false,
    dialogUpdateFormulaType: false,
    objectAddFormula: {
      name: "",
      desc: "",
    },

    objectUpdateFormula: {},
  }),
  getters: {},
  actions: {
    async getInit() {
      await this.getAllFormulaTypeData();
      await this.getAllFormulaTypeDataDisable();
    },

    /**
     * NAME: Get all Formula type data
     * DESC:
     * @params
     * @author Tran Anh Khoa
     */
    async getAllFormulaTypeData() {
      this.listFormulaType = [];
      try {
        const url = "/formula-calculations";

        const result = await api.get(url);
        console.log("Result Get getAllFormula: ", result);

        if (result.data.status === 200) {
          this.listFormulaType = result.data.data;
        }
      } catch (err) {
        console.error("Internal Server Error getAllFormulaTypeData(): ", err);
      }
    },

    /**
     * NAME: Get all Formula type data disable
     * DESC:
     * @params
     * @author Tran Anh Khoa
     */
    async getAllFormulaTypeDataDisable() {
      this.listFormulaTypeDisable = [];
      try {
        const url = "/formula-calculations?isDisable=true";

        const result = await api.get(url);

        if (result.data.status === 200) {
          this.listFormulaTypeDisable = result.data.data;
          this.listFormulaTypeDisable = this.listFormulaTypeDisable.map(
            (item) => {
              return {
                ...item,
                isToggle: false,
              };
            }
          );
        }
      } catch (err) {
        console.error("Internal Server Error getAllFormulaTypeData(): ", err);
      }
    },

    async addFormulaType(objectData) {
      try {
        const url = "formula-calculations";
        const data = {
          name: objectData.name.toUpperCase().trim(),
          description: objectData.desc,
        };

        const result = await api.post(url, data);

        console.log(result);
        if (result.data.status === 200) {
          await this.getAllFormulaTypeData();
          this.objectAddFormula = {};
          this.dialogAddFormulaType = false;

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

    async deleteFormulaType(objectDelete) {
      Dialog.create({
        title: "Cảnh báo",
        message: `Bạn có chắc muốn xóa: <b>${objectDelete?.name}</b> không ?`,
        html: true,
        ok: true,
        cancel: true,
      })
        .onOk(async () => {
          try {
            const url = `formula-calculations?_id=${objectDelete._id}`;
            const data = {
              isDisable: true,
            };

            const result = await api.patch(url, data);

            if (result.data.status === 200) {
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

              await this.getInit();
            } else {
              Dialog.create({
                title: "Thông báo",
                message: `Xóa thất bại: ${result.data.message}`,
                ok: true,
                cancel: false,
              });
            }
          } catch (err) {
            console.error("Internal Server Error deleteFormulaType(): ", err);
          }
        })
        .onCancel(() => {});
    },

    async updateFormulaType(inputData) {
      try {
        const sumArrayName = [
          ...this.listFormulaType,
          ...this.listFormulaTypeDisable,
        ].map((i) => i.name);

        if (sumArrayName.includes(inputData.name.trim())) {
          Dialog.create({
            title: "Thông báo",
            message: "Tên phương pháp tính đã tồn tại !",
            ok: true,
            cancel: false,
          });
          return;
        }

        const url = `formula-calculations?_id=${inputData._id}`;
        const data = {
          name: inputData.name.toUpperCase().trim(),
          description: inputData.description,
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
          this.dialogUpdateFormulaType = false;
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

    /* FUNCTIONAL */
    async enableListFormulaDisable() {
      try {
        this.listFormulaTypeDisable.map(async (item) => {
          if (item.isToggle) {
            const url = `/formula-calculations?_id=${item._id}`;
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
