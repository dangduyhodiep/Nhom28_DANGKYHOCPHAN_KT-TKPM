import { defineStore } from "pinia";
import { Dialog, Notify } from "quasar";
import { ref } from "vue";
import axios, { api } from "src/boot/axios";
import { useUtilStore } from "@/stores/dataStore";

export const useTargetDetailStore = defineStore("chiTietMucTieuStore", {
  state: () => ({
    targetData: [],
    targetFilter: "",
    targetSelected: "",
    targetSelectedView: [],
    companyStructureData: [],
    optionFilterMeasureSourceId: [],
    optionFilterTargetParentId: [],
    targetTypeData: [],
    optionFilterTargetType: [],
    optionTargetParentChoose: [],
    isNodeParent: false,
    amountOfTarget: "",
    firstCompanyData: [],

    /* newValue */
    noDataSelectTree: true,
    isShowFormAddNewTarget: false,
    targetSelectedAdd: [
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

    /* new handle */
    limitLength: 10000,

    treeTargetData: [],
    oneTargetData: [],
    oneTargetDataCreate: [],
    frequencyData: [],
    formulaData: [],
    targetTypeData: [],
    structureTarget: ref([
      {
        label: "Tài chính",
        children: [],
        level: 0,
        tech: "TC",
        id: "-1",
      },

      {
        label: "Khách hàng",
        children: [],
        level: 0,
        tech: "KH",
        id: "-2",
      },

      {
        label: "Quy trình nội bộ",
        children: [],
        level: 0,
        tech: "QT",
        id: "-3",
      },

      {
        label: "Học hỏi và phát triển",
        children: [],
        level: 0,
        tech: "HH",
        id: "-4",
      },
    ]),
  }),
  getters: {},
  actions: {
    async getInit() {
      // await this.getCompany();
      // await this.getAllTargetData();
      // await this.getTargetKpiTree();
      // await this.getTargetTypes();
      // await this.getTargetKpiList();
    },

    // async getAllTargetData() {
    //   try {
    //     const storeUtils = useUtilStore();
    //     const url = `/targets?limit=${this.limitLength}`;
    //     const result = await api.get(url);
    //     console.log(JSON.stringify(result.data.data, null, 2));

    //     if (result.data.status === 200) {
    //       this.targetData = result.data.data;
    //       this.treeTargetData = await storeUtils.buildTreeTarget(
    //         result.data.data
    //       );
    //       console.log(this.treeTargetData);
    //     }
    //   } catch (err) {
    //     console.error("Internal Server Error: ", err);
    //   }
    // },

    async getTargetTypes() {
      const targetType = await api.get("/target-types");
      if (targetType.status === 200) {
        this.targetTypeData = targetType.data.data.map((item) => ({
          _id: item._id,
          type: item.type,
        }));
      }
    },
    async getCompany() {
      const companyData = await api.get("/company-structs");
      this.firstCompanyData = companyData.data.data[0];
      if (companyData.status === 200) {
        this.companyStructureData = companyData.data.data.map((item) => ({
          _id: item._id,
          name: item.name,
        }));
      }
    },
    // async getTargetKpiTree() {
    //   const targetData = await api.get("/targets/tree");
    //   targetData.data.data.length === 0
    //     ? (this.amountOfTarget = 0)
    //     : (this.amountOfTarget = 1);
    //   if (targetData.status === 200) {
    //     this.targetData = targetData.data.data;
    //   }
    //   this.targetData.map((i) => {
    //     i.icon = "folder_open";
    //   });
    // },
    async getTargetKpiList() {
      const targetData = await api.get("/target-types");
      if (targetData.status === 200) {
        this.optionTargetParentChoose = targetData.data.data.map((item) => ({
          _id: item._id,
          name: item.name,
        }));
      }
    },
    async getFullInforTargetSelected(val) {
      if (val) {
        const targetData = await api.get("/api/targets?id=" + val);
        if (targetData.status === 200) {
          this.targetSelectedView = targetData.data.data[0];

          targetData.data.data[0].parentId
            ? (this.isNodeParent = true)
            : (this.isNodeParent = false);

          if (this.targetSelectedView.measureSourceId) {
            this.targetSelectedView.measureSourceName =
              this.companyStructureData.find(
                (finder) =>
                  finder._id === this.targetSelectedView.measureSourceId
              ).name;
            this.targetSelectedView.type = this.targetTypeData.find(
              (finder) =>
                finder._id === this.targetSelectedView.calDescriptionId
            ).type;
            this.targetSelectedView.parentName =
              this.optionTargetParentChoose.find(
                (finder) => finder._id === this.targetSelectedView.parentId
              ).name;
          }
        }
      } else {
        this.targetSelectedView = {};
      }
    },

    filterChangeMeasureSourceId(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.optionFilterMeasureSourceId = this.companyStructureData.filter(
          (v) => v.name.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterChangeTargetParentId(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.optionFilterTargetParentId = this.optionTargetParentChoose.filter(
          (v) => v.name.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    filterChangeTargetType(val, update) {
      update(() => {
        const needle = val.toLowerCase();
        this.optionFilterTargetType = this.targetTypeData.filter(
          (v) => v.type.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    async postCreateTarget(dataInput, dataParent) {
      try {
        const storeUtils = useUtilStore();
        var index = 1;
        let techNameHandled = "";

        /* Handle automatically generate tech name */
        storeUtils.targetData.map((i) => {
          if (i.parentId === dataParent._id) {
            index++;
            techNameHandled = i.techName;
          }
        });

        if (index === 1) {
          techNameHandled = [...dataParent.techName, ..."-01"].join("");
        } else {
          techNameHandled = [
            ...techNameHandled.slice(0, -1).split(""),
            ...[index + ""],
          ].join("");
        }

        const url = "/targets";
        const data = {
          name: dataInput.name,
          techName: techNameHandled,
          beLongTo: dataParent.isCorner
            ? dataParent.techName
            : dataParent.beLongTo,
          level: dataParent.isCorner ? "2" : +dataParent.level + 1,
          parentId: dataParent.isCorner ? "" : dataParent._id,
          unit: dataInput.unit,
          methodAndCalDescription: dataInput.methodAndCalDescription?.length
            ? dataInput.methodAndCalDescription
            : "",
          formulaId: dataInput.formula._id,
          targetTypeId: dataInput.targetType._id,
          frequencyMeasureId: dataInput.frequencyMeasure._id,
          importanceLevel: dataInput.importanceLevel,
          defaultValue: dataInput.defaultValue,
          minValue: dataInput.minValue,
        };

        const result = await api.post(url, data);

        console.log(result);

        if (result.data.status === 200) {
          Notify.create({
            message: "Thao tác thành công!",
            position: "top",
            color: "green",
          });

          await storeUtils.getAllTargetData();
          this.oneTargetDataCreate = {};
          this.noDataSelectTree = true;
          this.amountOfTarget = false;
        } else {
          Dialog.create({
            message: `Tạo mục tiêu thất bại: ${result.data.message}`,
            cancel: true,
            html: true,
            ok: false,
          });
        }
      } catch (err) {
        console.log("Internal Server Error (postCreateTarget()): ", err);
      }
    },

    async clickUpdateTarget(objectData) {
      const storeUtils = useUtilStore();
      const dataInsert = {
        name: objectData.name,
        targetTypeId: objectData.targetType._id,
        formulaId: objectData.formula._id,
        frequencyMeasureId: objectData.frequencyMeasure._id,
        defaultValue: objectData.defaultValue,
        minValue: objectData.minValue,
        importanceLevel: objectData.importanceLevel,
        methodAndCalDescription: objectData.methodAndCalDescription,
        unit: objectData.unit,
        measureSource: objectData.measureSource,
      };

      const url = `/targets?_id=${objectData._id}`;

      const resultInsert = await api.patch(url, dataInsert);

      if (resultInsert.data.status === 200) {
        Notify.create({
          message: resultInsert.data.message,
          position: "top",
          color: "green",
        });

        await storeUtils.getAllTargetData();
      } else {
        Notify.create({
          message: resultInsert.data.message,
          position: "top",
          color: "red",
        });
      }
    },
    deleteTarget(objDelete) {
      try {
        const storeUtils = useUtilStore();
        Dialog.create({
          message: `Bạn chắc chắn muốn xoá mục tiêu: <strong>${objDelete.name}</strong>?`,
          cancel: true,
          html: true,
        }).onOk(async () => {
          const result = await api.delete("/targets", {
            data: { _id: objDelete._id },
          });
          console.log(result);
          if (result.data.status === 200) {
            Notify.create({
              message: "Xóa thành công !",
              position: "top",
              color: "green",
            });
            await storeUtils.getAllTargetData();
            this.noDataSelectTree = true;
            this.amountOfTarget = false;
          } else {
            Dialog.create({
              title: "Thông báo",
              message: `Thao tác thất bại: ${result.data.message}`,
              ok: true,
              cancel: false,
            });
          }
        });
      } catch (err) {
        console.error("Internal Server Error: ", err);
      }
    },
  },
});
