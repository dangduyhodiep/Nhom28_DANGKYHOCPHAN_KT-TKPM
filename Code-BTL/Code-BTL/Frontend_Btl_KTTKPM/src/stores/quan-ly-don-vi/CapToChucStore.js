import { defineStore } from "pinia";
import { Dialog, Notify } from "quasar";
import { api } from "src/boot/axios";
function buildTree(data, parentId = "") {
  const result = [];
  data.forEach((item) => {
    if (item.parentId === parentId) {
      const children = buildTree(data, item._id);
      if (children.length) {
        item.children = children;
      }
      result.push(item);
    }
  });
  return result;
}
export const useCapToChucStore = defineStore("storeCapToChuc", {
  state: () => ({
    listDataCompanyStructure: [],
    dataTree: [],

    /* mutual variable */
    treeFilter: "",
    organizationalData: [],
    arrChild: [],
    arrParent: [],
    treeSelected: "",
    isLargestStructure: false,
    isShowFormAddNewStructure: false,
    singleCompanyLevelData: [],
    createCompanyData: [],
    listIsDisable: [],
    listCompanyStructureName: [],
  }),
  getters: {},
  actions: {
    async getInit() {
      await this.getAllDataCompanyStructure();
      if (!this.isLargestStructure) {
        await this.createCompanyTree();
      }
    },

    async getAllDataCompanyStructure() {
      try {
        const url = "/struct-levels";
        const urlDisableValue = "/struct-levels/?isDisable=true";

        const result = await api.get(url);
        const resultDisableValue = await api.get(urlDisableValue);

        /* handle null data at first time render */
        if (result.data.status === 400 && !result.data.data.length) {
          this.isLargestStructure = true;
        }

        if (result.data.status === 200) {
          this.listDataCompanyStructure = result.data.data.filter(
            (i) => i.isDisable === false
          );

          this.listCompanyStructureName = result.data.data.map((i) =>
            i.name.toUpperCase().trim()
          );
        }

        if (resultDisableValue.data.status === 200) {
          this.listIsDisable = resultDisableValue.data.data;
        }
      } catch (err) {
        console.log(
          "Internal Server Error (getAllDataCompanyStructure()): ",
          err
        );
      }
    },

    async createCompanyTree() {
      try {
        await this.getAllDataCompanyStructure();

        this.listDataCompanyStructure = this.listDataCompanyStructure.map(
          (item) => {
            return {
              ...item,
              label: item.name,
            };
          }
        );

        for (let a = 0; a < this.listDataCompanyStructure.length; a++) {
          if (this.listDataCompanyStructure[a].level === 1) {
          } else {
            const parentId = this.listDataCompanyStructure.find(
              (find) =>
                find.level === this.listDataCompanyStructure[a].level - 1
            )._id;
            this.listDataCompanyStructure[a].parentId = parentId;
          }
        }

        this.organizationalData = buildTree(this.listDataCompanyStructure, "");
      } catch (err) {
        console.log("Internal Server Error (createCompanyTree()): ", err);
      }
    },

    async getCapToChucById(id) {
      try {
        const url = `/struct-levels/?_id=${id}`;

        const result = await api.get(url);

        if (result.data.status === 200) {
          this.singleCompanyLevelData = result.data.data[0];
        }
      } catch (err) {
        console.log("Internal Server Error (getCapToChucById): ", err);
      }
    },

    async createCompanyStructure(dataInput) {
      try {
        let checkUniqueName = !this.listIsDisable.some(
          (i) =>
            i.name.trim().toUpperCase() === dataInput.name.trim().toUpperCase()
        );

        if (!checkUniqueName) {
          Dialog.create({
            message: `Cấp tổ chức <b>${dataInput.name}</b> đã từng tồn tại. Vui lòng chọn tên khác !`,
            html: true,
            ok: true,
          }).onOk(() => {});
          return;
        }

        const url = "/struct-levels";
        let data = {};

        if (this.isLargestStructure) {
          data = {
            name: dataInput.name.toUpperCase().trim(),
            description: dataInput.description.trim(),
            level: 1,
            parentId: "",
            userCreate: "khoa.tran",
            userUpdate: "khoa.tran",
          };

          const result = await api.post(url, data);

          if (result.data.status === 200) {
            Notify.create({
              message: "Tạo mới thành công !",
              position: "top",
              color: "green",
            });
          }

          this.createCompanyData = [];
          await this.getInit();
          window.location.reload();
          return;
        }

        data = {
          name: dataInput.name.trim(),
          description: dataInput.description.trim(),
          level: this.singleCompanyLevelData.level + 1,
          parentId: this.singleCompanyLevelData._id,
          userCreate: "khoa.tran",
          userUpdate: "khoa.tran",
        };

        const result = await api.post(url, data);

        console.log("Create Company Structure: ", result);
        if (result.status === 200) {
          Notify.create({
            message: "Tạo mới thành công !",
            position: "top",
            color: "green",
          });

          this.createCompanyData = [];
          await this.getInit();
        }
      } catch (err) {
        console.log(
          "Internal Server Error (createCompanyStructure(data)): ",
          err
        );
      }
    },

    async updateCompanyStructure(dataInput) {
      try {
        const url = `/struct-levels/?_id=${dataInput._id}`;
        const dataUpdate = {
          name: dataInput.name.toUpperCase().trim(),
          description: dataInput.description,
        };

        if (
          this.listCompanyStructureName.includes(
            dataInput.name.toUpperCase().trim()
          )
        ) {
          Dialog.create({
            title: "Thông báo",
            message: "Tên đơn vị tổ chức đã tồn tại!",
            ok: true,
            cancel: false,
          });
          return;
        }

        const result = await api.patch(url, dataUpdate);
        console.log("Update Company Structure: ", result);

        if (result.data.status === 200) {
          Notify.create({
            message: "Cập nhật thành công",
            position: "top",
            color: "green",
          });
          this.getInit();
        } else {
          Dialog.create({
            message: `Cập nhật thất bại: ${result.data.message}. Vui lòng kiểm tra lại !`,
            html: true,
            cancel: true,
            ok: false,
          });
        }
      } catch (err) {
        console.log("Internal Server Error: ", err);
      }
    },

    async deleteCompanyStructure(id) {
      if (!id) {
        Dialog.create({
          message: "Vui lòng chọn tổ chức để xóa !",
          ok: true,
          cancel: false,
        });
      }

      let structName = this.listDataCompanyStructure.filter((i) => {
        if (i._id === id) {
          return i.name;
        }
      })[0];

      Dialog.create({
        message: `Bạn có chắc chắn muốn xóa cấp tổ chức <b>${structName.label}</b> ?`,
        ok: true,
        cancel: true,
        html: true,
      }).onOk(async () => {
        try {
          const url = `/struct-levels/?_id=${id}`;
          const dataUpdate = {
            isDisable: true,
          };

          const result = await api.patch(url, dataUpdate);
          console.log("Delete Company Structure: ", result);

          if (result.data.status === 200) {
            Notify.create({
              message: "Xóa thành công !",
              position: "top",
              color: "green",
            });
            this.singleCompanyLevelData = [];
            this.getInit();
          } else {
            Dialog.create({
              message: `Xóa thất bại: ${result.data.message}. Vui lòng kiểm tra lại !`,
              html: true,
              cancel: true,
              ok: false,
            });
          }
        } catch (err) {
          console.error("Internal Server Error: ", err);
        }
      });
    },
  },
});
