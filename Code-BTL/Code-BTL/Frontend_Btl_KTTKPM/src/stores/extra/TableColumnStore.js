import { defineStore } from "pinia";

export const useTableColumnStore = defineStore("tableColumnStore", {
  state: () => ({
    dataTargetView: [],
    columnTargetView: [
      {
        name: "techName",
        required: true,
        label: "STT",
        field: "techName",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "name",
        required: true,
        label: "Mục tiêu",
        field: "name",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "unit",
        required: true,
        label: "Đơn vị tính",
        field: "unit",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "descriptionMethodCal",
        required: true,
        label: "Mô tả phương pháp và công thức tính",
        field: "descriptionMethodCal",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "frequencyMeasure",
        required: true,
        label: "Tần suất đo",
        field: "frequencyMeasure",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "measureSourceId",
        required: true,
        label: "Nguồn đo",
        field: "measureSourceId",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "cal",
        required: true,
        label: "Phương pháp phân bổ và tính ngược",
        field: "cal",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "type",
        required: true,
        label: "Loại mục tiêu",
        field: "type",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "weight",
        required: true,
        label: "Mức độ quan trọng",
        field: "weight",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "staticValue",
        required: true,
        label: "Tỷ trọng",
        field: "staticValue",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "defaultValue",
        required: true,
        label: "Chỉ tiêu (Phấn đấu)",
        field: "defaultValue",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "minValue",
        required: true,
        label: "Ngưỡng (Đạt)",
        field: "minValue",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
    ],

    columnTable: [
      {
        name: "stt",
        required: true,
        label: "STT",
        field: "stt",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "name",
        required: true,
        label: "TÊN MỤC TIÊU",
        field: "name",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "unit",
        required: true,
        label: "Kỳ",
        field: "unit",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "unit",
        required: true,
        label: "GIÁ TRỊ TIÊU CHUẨN",
        field: "unit",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "cal",
        required: true,
        label: "GIÁ TRỊ NHỎ NHẤT",
        field: "cal",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "maxValue",
        required: true,
        label: "GHI CHÚ",
        field: "maxValue",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
    ],

    columnTableMonth: [
      {
        name: "stt",
        required: true,
        label: "STT",
        field: "stt",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "name",
        required: true,
        label: "TÊN MỤC TIÊU",
        field: "name",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      // {
      //   name: "unit",
      //   required: true,
      //   label: "Check All",
      //   field: "unit",
      //   align: "center",
      //
      //   headerStyle: "font-size: 1.1em; font-weight: bold",
      // },

      {
        name: "unit",
        required: true,
        label: "Chọn tất cả",
        field: "unit",
        align: "center",
        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "unit",
        required: true,
        label: "Tháng 1",
        field: "unit",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "unit",
        required: true,
        label: "Tháng 2",
        field: "unit",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "cal",
        required: true,
        label: "Tháng 3",
        field: "cal",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "cal",
        required: true,
        label: "Tháng 4",
        field: "cal",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "cal",
        required: true,
        label: "Tháng 5",
        field: "cal",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "cal",
        required: true,
        label: "Tháng 6",
        field: "cal",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "cal",
        required: true,
        label: "Tháng 7",
        field: "cal",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "cal",
        required: true,
        label: "Tháng 8",
        field: "cal",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "cal",
        required: true,
        label: "Tháng 9",
        field: "cal",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "cal",
        required: true,
        label: "Tháng 10",
        field: "cal",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "cal",
        required: true,
        label: "Tháng 11",
        field: "cal",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "cal",
        required: true,
        label: "Tháng 12",
        field: "cal",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
    ],

    columnTableDepartment: [
      {
        name: "name",
        required: true,
        label: "MÃ",
        field: "name",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "targetName",
        required: true,
        label: "TÊN MỤC TIÊU",
        field: "targetName",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "unit",
        required: true,
        label: "Đơn vị tính",
        field: "unit",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "unit",
        required: true,
        label: "Mô tả",
        field: "unit",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "unit",
        required: true,
        label: "Tần suất đo",
        field: "unit",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "cal",
        required: true,
        label: "Nguồn đo",
        field: "cal",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "cal",
        required: true,
        label: "Phương pháp phân bổ",
        field: "cal",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "cal",
        required: true,
        label: "Loại mục tiêu",
        field: "cal",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "cal",
        required: true,
        label: "Mức độ quan trọng",
        field: "cal",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "cal",
        required: true,
        label: "Tỷ trọng (%)",
        field: "cal",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "cal",
        required: true,
        label: "Chỉ tiêu",
        field: "cal",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "cal",
        required: true,
        label: "Ngưỡng đạt",
        field: "cal",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
    ],

    columnTableIndividual: [
      {
        name: "techName",
        required: true,
        label: "MÃ",
        field: "name",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "targetName",
        required: true,
        label: "TÊN",
        field: "targetName",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "unit",
        required: true,
        label: "Loại mục tiêu",
        field: "unit",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "unit",
        required: true,
        label: "Mức độ quan trọng",
        field: "unit",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "unit",
        required: true,
        label: "Tỷ trọng",
        field: "unit",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "cal",
        required: true,
        label: "Chỉ tiêu",
        field: "cal",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "cal",
        required: true,
        label: "Ngưỡng đạt",
        field: "cal",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "cal",
        required: true,
        label: "Thực hiện",
        field: "cal",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
      {
        name: "cal",
        required: true,
        label: "Tỷ lệ đạt thực tế",
        field: "cal",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "cal",
        required: true,
        label: "Tỷ lệ đạt giới hạn",
        field: "cal",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "keySearch",
        required: true,
        label: "Điểm thực hiện",
        field: "keySearch",
        align: "center",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
    ],

    columnEmployeesTable: [
      {
        name: "name",
        required: true,
        label: "MÃ",
        field: "name",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "name",
        required: true,
        label: "TÊN",
        field: "name",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "name",
        required: true,
        label: "ĐƠN VỊ",
        field: "name",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "name",
        required: true,
        label: "NGÀY VÀO",
        field: "name",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "name",
        required: true,
        label: "NGÀY NGHỈ",
        field: "name",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "name",
        required: true,
        label: "THỜI GIAN CẬP NHẬT",
        field: "name",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
    ],

    columnJobsTable: [
      {
        name: "name",
        required: true,
        label: "MÃ",
        field: "name",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "name",
        required: true,
        label: "TÊN",
        field: "name",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "name",
        required: true,
        label: "Năm",
        field: "name",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "name",
        required: true,
        label: "NGÀY TẠO",
        field: "name",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "name",
        required: true,
        label: "NGÀY CẬP NHẬT",
        field: "name",
        align: "left",

        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
    ],

    // columnImportTargetFromExcelFile: [
    //   {
    //     name: "id",
    //     required: true,
    //     label: "MÃ",
    //     field: "id",
    //     align: "left",
    //
    //     headerStyle: "font-size: 1.1em; font-weight: bold",
    //   },

    //   {
    //     name: "name",
    //     required: true,
    //     label: "Tên mục tiêu",
    //     field: "name",
    //     align: "left",
    //
    //     headerStyle: "font-size: 1.1em; font-weight: bold",
    //   },

    //   {
    //     name: "unit",
    //     required: true,
    //     label: "Đơn vị tính",
    //     field: "unit",
    //     align: "left",
    //
    //     headerStyle: "font-size: 1.1em; font-weight: bold",
    //   },

    //   {
    //     name: "desc",
    //     required: true,
    //     label: "Mô tả",
    //     field: "desc",
    //     align: "left",
    //
    //     headerStyle: "font-size: 1.1em; font-weight: bold",
    //   },

    //   {
    //     name: "frequentlyCheck",
    //     required: true,
    //     label: "Tần suất do",
    //     field: "frequentlyCheck",
    //     align: "left",
    //
    //     headerStyle: "font-size: 1.1em; font-weight: bold",
    //   },

    //   {
    //     name: "wayCal",
    //     required: true,
    //     label: "Phương pháp tính",
    //     field: "wayCal",
    //     align: "left",
    //
    //     headerStyle: "font-size: 1.1em; font-weight: bold",
    //   },

    //   {
    //     name: "targetType",
    //     required: true,
    //     label: "Loại mục tiêu",
    //     field: "targetType",
    //     align: "left",
    //
    //     headerStyle: "font-size: 1.1em; font-weight: bold",
    //   },

    //   {
    //     name: "importantLevel",
    //     required: true,
    //     label: "Mức độ quan trọng",
    //     field: "importantLevel",
    //     align: "left",
    //
    //     headerStyle: "font-size: 1.1em; font-weight: bold",
    //   },

    //   {
    //     name: "targetValue",
    //     required: true,
    //     label: "Chỉ tiêu",
    //     field: "targetValue",
    //     align: "left",
    //
    //     headerStyle: "font-size: 1.1em; font-weight: bold",
    //   },

    //   {
    //     name: "acceptValue",
    //     required: true,
    //     label: "Ngưỡng đạt",
    //     field: "acceptValue",
    //     align: "left",
    //
    //     headerStyle: "font-size: 1.1em; font-weight: bold",
    //   },
    // ],

    columnOfListRouter: [
      {
        name: "name",
        required: true,
        label: "Tên đường dẫn",
        field: "name",
        align: "left",
        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "description",
        required: true,
        label: "Mô tả",
        field: "description",
        align: "left",
        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "router",
        required: true,
        label: "Đường dẫn",
        field: "router",
        align: "left",
        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "method",
        required: true,
        label: "Phương thức",
        field: "method",
        align: "center",
        headerStyle: "font-size: 1.1em; font-weight: bold",
      },

      {
        name: "routerType",
        required: true,
        label: "Loại đường dẫn",
        field: "routerType",
        align: "center",
        headerStyle: "font-size: 1.1em; font-weight: bold",
      },
    ],
  }),
  getters: {},
  actions: {},
});
