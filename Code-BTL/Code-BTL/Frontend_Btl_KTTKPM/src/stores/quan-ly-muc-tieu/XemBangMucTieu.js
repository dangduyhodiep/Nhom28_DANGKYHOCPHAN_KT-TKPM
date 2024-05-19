import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

function findAllAncestors(data, itemId) {
  function findAncestorsRecursive(currentData, parentId) {
    const ancestors = [];
    for (const item of currentData) {
      if (item._id === parentId) {
        ancestors.push(item);
        if (item.parentId) {
          ancestors.push(...findAncestorsRecursive(data, item.parentId));
        }
        break;
      }
    }
    return ancestors;
  }

  const item = data.find((item) => item._id === itemId);
  if (item && item.parentId) {
    return findAncestorsRecursive(data, item.parentId);
  }

  return [];
}

export const useXemBangMucTieu = defineStore("xemBangMucTieuStore", {
  state: () => ({
    treeSelected: "",
    splitterModelDynamic: ref(100),
    treeFilter: "",
    treeFilter: "",
    organizationalData: [],
    companyStructureData: [],
    breadcrumbsIdList: [],
    targetData: [],
    dataTargetView: [],
    assignBetweenTargetAndCompanyData: [],
  }),
  getters: {},
  actions: {
    async getInit() {},

    async getFullDataTargetByDv(companyId) {
      const targetView = await api.get(
        "/api/target-by-times/full-info?companyId=" + companyId
      );
      if (targetView.status === 200) {
        let dataChildNotAdd = [];
        let listId = [];
        let finalResult = [];

        const dataTemp = targetView.data.data;
        const dataChild = dataTemp.filter((item) => {
          if (item.parentId) {
            return item;
          }
        });

        this.dataTargetView = dataTemp.filter((item) => {
          if (!item.parentId) {
            return item;
          }
        });

        /* chỗ này khoa test */
        listId = this.dataTargetView.map((i) => i._id);

        dataChildNotAdd = dataChild.filter((i) => {
          if (!listId.includes(i._id)) return i;
        });

        await this.getAllTarget();

        var object = [];
        for (let i = 0; i < dataChildNotAdd.length; ++i) {
          /* khúc này chạy ra cái object cha */
          this.listAllDataTarget.map((j) => {
            if (j._id === dataChildNotAdd[i].parentId) {
              object = j;
            }
          });

          /* sau đó từ object cha đệ quy ra ông nội, ông cố */
          while (!(object.parentId == "")) {
            this.listAllDataTarget.map((j) => {
              if (j._id == object.parentId) {
                object = j;
                return;
              }
            });
          }
          finalResult.push(object);
          object = [];
        }

        let indexTemp = 0;
        dataChild.map((i, index) => {
          if (dataChildNotAdd.includes(i)) {
            dataChild[index].parentId = finalResult[indexTemp]._id;
          }
          indexTemp++;
        });

        for (let a = 0; a < dataChild.length; a++) {
          let findItem = this.dataTargetView.find(
            (item) => item._id === dataChild[a].parentId
          );
          if (findItem) {
            this.dataTargetView.splice(
              this.dataTargetView.indexOf(findItem) + 1,
              0,
              dataChild[a]
            );
          }
        }
      }
    },

    getBreadCrumb(data) {
      const parent = findAllAncestors(this.companyStructureData, data).map(
        (mapped) => ({
          _id: mapped._id,
          name: mapped.name,
        })
      );
      if (!parent) {
        let firstElement = this.companyStructureData.find(
          (finder) => finder._id.toString() === data
        );
        if (firstElement) {
          this.breadcrumbsIdList.push({
            _id: firstElement._id,
            name: firstElement.name,
          });
        }
      } else {
        const currentData = this.companyStructureData.find(
          (finder) => finder._id.toString() === data
        );
        parent.reverse();
        parent.push({ _id: currentData._id, name: currentData.name });
        this.breadcrumbsIdList = parent;
      }
    },
  },
});
