import { defineStore } from "pinia";
import { Dialog, Notify } from "quasar";
import axios, { api } from "src/boot/axios";

export const useSoDoToChucStore = defineStore("soDoToChucStore", {
  state: () => ({
    treeFilter: "",
    treeSelected: "",
    companySelectedViewData: [],
    companyStructureData: [],
    optionFilterMeasureSourceId: [],
    optionFilterTargetParentId: [],
    targetTypeData: [],
    optionFilterTargetType: [],
    optionTargetParentChoose: [],
    organizationalData: [],
    companyStructLevelData: [],
    companySelected: "",
    companyParentData: [],
    companyAddData: [],
    companyName: "",

    /* newValue */
    noDataSelectTree: true,
    isShowFormAddNew: false,
    isLargestCompany: false,
    objectSelectedAdd: [
      {
        name: "",
        description: "",
        techName: "",
        level: "",
        weight: "",
        descriptionMethodCal: "",
        unit: "",
        // unitDescription: "",
        frequencyMeasure: "",
        measureSource: "",
        defaultValue: "",
        minValue: "",
        note: "",
      },
    ],
  }),
  getters: {},
  actions: {
    async getInit() {
      await this.getCompany();
      await this.getCompanyTree();
      await this.getCompanyStructLevel();
    },

    async getCompanyTree() {
      const tree = await api.get("/company-structs/tree");

      if (tree.status === 200) {
        this.organizationalData = tree.data.data;
      }

      /* add label in every single nested node */
      function addLabel(node) {
        if (!node) return;

        node.label = node.name;

        if (node.children && node.children.length > 0) {
          for (let i = 0; i < node.children.length; i++) {
            addLabel(node.children[i]);
          }
        }
      }

      /* use for loop for traverse every node */
      for (let i = 0; i < this.organizationalData?.length; i++) {
        addLabel(this.organizationalData[i]);
      }
    },

    async getCompany() {
      const companyData = await api.get("/company-structs");

      if (companyData.status === 200 && !companyData.data.data) {
        this.isLargestCompany = true;
      }

      if (companyData.status === 200) {
        this.companyStructureData = companyData.data.data.map((item) => ({
          _id: item._id,
          name: item.name,
        }));
      }
    },

    async getCompanyStructLevel() {
      try {
        const url = "/struct-levels";
        const result = await api.get(url);

        if (result.data.status === 200) {
          this.companyStructLevelData = result.data.data;
          // this.maxStructLevelValue = Math.max(
          //   ...Object.values(result.data.data.map((i) => i.level))
          // );
        }
      } catch (err) {
        console.error("Internal Server Error: ", err);
      }
    },

    async getFullInfoCompanySelected(id) {
      try {
        const url = `company-structs/?_id=${id}`;

        const result = await api.get(url);

        if (result.status === 200) {
          this.companySelectedViewData = result.data.data[0];
          this.companyName = this.companySelectedViewData.name;
        }
      } catch (err) {
        console.error("Get Data Error (getCompanyStructLevel()): ", err);
      }
    },

    async getFullInfoCompanyParent(id) {
      try {
        this.companyParentData = [];

        const url = `company-structs/?_id=${id}`;

        const result = await api.get(url);

        if (result.data.status === 200) {
          this.companyParentData = result.data.data[0];
        }
      } catch (err) {
        console.error("Get Data Error (getFullInfoCompanyParent()): ", err);
      }
    },

    async postCreateCompany(dataInput) {
      try {
        const currentLevel = this.companyStructLevelData
          .filter((i) => {
            if (i._id === this.companySelectedViewData.structId) {
              return i;
            }
          })
          .map((i) => i.level)[0];

        const currentName = this.companyStructLevelData
          .filter((i) => {
            if (i._id === this.companySelectedViewData.structId) {
              return i;
            }
          })
          .map((i) => i.name)
          .toString();

        const idStucture = this.companyStructLevelData
          .filter((i) => {
            if (i.level === Number(currentLevel) + 1) {
              return i;
            }
          })
          .map((i) => i._id)
          ?.toString();

        if (!idStucture) {
          Dialog.create({
            message: `Không thể tạo dữ liệu vì sơ đồ tổ chức không có đơn vị nào nhỏ hơn <b>${currentName}</b>`,
            cancel: true,
            html: true,
            ok: false,
          });
          return;
        }

        const url = "company-structs";
        const data = {
          name: dataInput.name, // tên mục tiêu
          description: dataInput.description, //mô tả mục tiêu
          parentId: this.companySelectedViewData._id,
          structId: idStucture,
          userCreate: "KhoaTran.Nguyen",
          userUpdate: "KhoaTran.Nguyen",
        };

        const result = await api.post(url, data);

        if (result.data.status === 200) {
          Notify.create({
            message: "Thao tác thành công!",
            position: "top",
            color: "green",
          });

          this.getInit();
        } else {
          Dialog.create({
            message: `Thêm con <b>${this.companySelectedViewData.name}</b> thất bại: ${result.data.message}`,
            cancel: false,
            html: true,
            ok: true,
          });
        }
      } catch (err) {
        console.error("Internal Server Error (postCreateTargetKpi()): ", err);
      }
    },

    async updateCompany(data) {
      const dataInsert = {
        name: data.name,
        description: data.description,
      };

      const resultInsert = await api.patch(
        "/company-structs?_id=" + data._id,
        dataInsert
      );

      if (resultInsert.status === 200) {
        Notify.create({
          message: "Thao tác thành công !",
          position: "top",
          color: "green",
        });
        this.getInit();
        this.companyName = this.companySelectedViewData.name;
      } else {
        Notify.create({
          message: resultInsert.data.message,
          position: "top",
          color: "red",
        });
      }
    },

    deleteCompany(objDelete) {
      if (!objDelete.parentId) {
        Notify.create({
          message: "Bạn không thể xoá mục tiêu level 1",
          position: "top",
          color: "red",
        });
        return;
      }
      Dialog.create({
        message: `Bạn chắc chắn muốn xoá đơn vị: <strong>${objDelete.name}</strong>?`,
        cancel: true,
        html: true,
      }).onOk(async () => {
        const result = await api.delete("/company-structs", {
          data: { _id: objDelete._id },
        });

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
        await this.getInit();
      });
    },
  },
});
