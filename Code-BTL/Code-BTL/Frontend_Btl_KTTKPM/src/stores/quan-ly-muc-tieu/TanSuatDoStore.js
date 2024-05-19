import { defineStore } from "pinia";
import { api } from "@/boot/axios";
import { Dialog, Notify } from "quasar";

export const useTanSuatDo = defineStore("storeTanSuatDo", {
  state: () => ({
    listFrequency: [],
    listFrequencyDisable: [],
    dialogAddFrequency: false,
    dialogUpdateFrequency: false,
    objectAddFormula: {
      name: "",
      desc: "",
    },

    objectUpdateFormula: {},
  }),
  getters: {},
  actions: {
    async getInit() {
      await this.getAllFrequencyData();
      await this.getAllFrequencyDataDisable();
    },

    /**
     * NAME: Get all Formula type data
     * DESC:
     * @params
     * @author Tran Anh Khoa
     */
    async getAllFrequencyData() {
      this.listFrequency = [];
      try {
        const url = "frequency-measures";

        const result = await api.get(url);
        console.log("Result Get Data: ", result);

        if (result.data.status === 200) {
          this.listFrequency = result.data.data;
        }
      } catch (err) {
        console.error("Internal Server Error getAllFrequencyData(): ", err);
      }
    },

    /**
     * NAME: Get all Formula type disable data
     * DESC:
     * @params
     * @author Tran Anh Khoa
     */
    async getAllFrequencyDataDisable() {
      this.listFrequencyDisable = [];
      try {
        const url = "/frequency-measures?isDisable=true";

        const result = await api.get(url);

        if (result.data.status === 200) {
          this.listFrequencyDisable = result.data.data;
          this.listFrequencyDisable = this.listFrequencyDisable.map((item) => {
            return {
              ...item,
              isToggle: false,
            };
          });
        }
      } catch (err) {
        console.error("Internal Server Error getAllFrequencyData(): ", err);
      }
    },

    async addFrequency(objectData) {
      try {
        const url = "frequency-measures";
        const data = {
          name: objectData.name.toUpperCase(),
          description: objectData.desc,
        };

        const result = await api.post(url, data);

        console.log("Result Update: ", result);
        if (result.data.status === 200) {
          await this.getAllFrequencyData();
          this.objectAddFormula = {};
          this.dialogAddFrequency = false;

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

    async deleteFrequency(objectDelete) {
      Dialog.create({
        title: "Cảnh báo",
        message: `Bạn có chắc muốn xóa loại mục tiêu: <b>${objectDelete?.name}</b> không ?`,
        html: true,
        ok: true,
        cancel: true,
      })
        .onOk(async () => {
          try {
            const url = `frequency-measures?_id=${objectDelete._id}`;
            const data = {
              isDisable: true,
              name: objectDelete.name.toUpperCase().trim(),
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
            console.error("Internal Server Error deleteTargetType(): ", err);
          }
        })
        .onCancel(() => {});
    },

    async updateFormulaType(inputData) {
      try {
        const sumArrayName = [
          ...this.listFrequency,
          ...this.listFrequencyDisable,
        ].map((i) => i.name);

        if (sumArrayName.includes(inputData.name.trim())) {
          Dialog.create({
            title: "Thông báo",
            message: "Tần suất đo đã tồn tại !",
            ok: true,
            cancel: false,
          });
          return;
        }

        const url = `frequency-measures?_id=${inputData._id}`;
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
          this.dialogUpdateFrequency = false;
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
    async enableListFrequencyDisable() {
      try {
        this.listFrequencyDisable.map(async (item) => {
          if (item.isToggle) {
            const url = `/frequency-measures?_id=${item._id}`;
            const data = {
              name: item.name,
              isDisable: false,
            };

            const result = await api.patch(url, data);
            console.log("hahahah", result);

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
