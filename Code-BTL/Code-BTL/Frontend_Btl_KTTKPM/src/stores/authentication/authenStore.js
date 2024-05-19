import { defineStore } from "pinia";
import { Dialog, Loading, Notify, QSpinnerTail } from "quasar";
import { api } from "src/boot/axios";
import { useI18n } from "vue-i18n";

export const useAuthenticationStore = defineStore("storeAuthentication", {
  state: () => ({
    inject: ["i18n"],
    username: "",
    password: "",
    isRememberPassword: false,
    dialogConfirmLogout: false,
    isLogged: localStorage.getItem("isLogged"),
    isLoadingLogout: false,
    isLoadingLogin: false,
    accessToken: "",
    refreshToken: "",
    userName: "",
    userRoleId: "",
    userStaffId: "",
    objectCreateAccount: {
      userName: "",
      passWord: "",
      rePassword: "",
    },
    isShowSignUpPage: false,
    roleData: [],
    routerData: [],
  }),
  persist: {
    storage: localStorage,
    paths: [
      "isLogged",
      "accessToken",
      "refreshToken",
      "userName",
      "userRoleId",
      "userStaffId",
    ],
  },
  getters: {},
  actions: {
    async getInit() {
      this.username = "student";
      this.password = "123456";
    },

    async postLogin(userName, passWord) {
      // Loading.show({
      //   spinner: QSpinnerTail,
      // });

      this.isLoadingLogin = true;
      this.isLoadingLogout = false;
      this.dialogConfirmLogout = false;

      try {
        // const { t } = useI18n();
        const url = `auth/sign-in`;
        const data = {
          name: userName,
          password: passWord,
        };

        const result = await api.post(url, data);
        console.log(result);

        if (result.data.status === 200) {
          this.isLogged = result.data.data.isLogged;
          this.accessToken = result.data.data.accessToken;
          this.refreshToken = result.data.data.refreshToken;
          this.userName = result.data.data.userData?.name;
          this.userRoleId = result.data.data.userData?.roleId;
          this.userStaffId = result.data.data.userData?.staffId;

          /* manual set variable cause persistent code did'nt work */
          localStorage.setItem("isLogged", true);
          localStorage.setItem("accessToken", result.data.data.accessToken);
          localStorage.setItem("refreshToken", result.data.data.refreshToken);
          localStorage.setItem(
            "userData",
            JSON.stringify(result.data.data.userData)
          );

          /* set token bombom in heder */
          api.defaults.headers["access-token"] = result.data.data.accessToken;

          // this.routerData = await this.handleAssignRouterToAccount();
          setTimeout(() => {
            // Loading.hide();
            this.isLoadingLogin = false;
            this.router.push("/chart/general");
            Notify.create({
              type: "positive",
              message: "Đăng nhập thành công !",
              caption: "Chào mừng quay trở lại.",
              position: "top-right",
              color: "white",
              textColor: "black",
              iconColor: "green",
              timeout: 2000,
              multiLine: true,
              progress: true,
              classes: "custom-size-notify",
            });
          }, 2000);
        } else {
          // Loading.hide();
          this.isLoadingLogin = false;
          Notify.create({
            message: result.data.message,
            position: "top",
            color: "red",
          });
        }
      } catch (err) {
        console.error("Internal Server Error: ", err);
        // Loading.hide();
        this.isLoadingLogin = false;
      }
    },

    async postLogout() {
      const lang = localStorage.getItem("lang");
      this.isLoadingLogout = true;
      localStorage.clear();
      localStorage.setItem("lang", lang);
      setTimeout(() => {
        this.router.push("/login");
      }, 1000);

      Notify.create({
        type: "positive",
        message: "Đăng xuất thành công !",
        position: "top-right",
        color: "white",
        textColor: "black",
        iconColor: "green",
        timeout: 2000,
        multiLine: true,
        progress: true,
        classes: "custom-size-notify",
      });

      const url = "auth/sign-out";
      const result = await api.post(url);

      if (result.data.status === 200) {
      } else {
        console.error("Xóa token thất bại: ", result.data.message);
      }

      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    },

    /**
     * NAME: Create Account
     * DESC: Post api create account for user
     * @param {*} objData
     * @returns
     * @author Tran Anh Khoa
     */
    async postCreateAccount(objData) {
      Loading.show({
        spinner: QSpinnerTail,
      });
      try {
        const url = "auth/sign-up";
        const data = {
          name: objData.userName,
          password: objData.passWord,
          roleId: "",
        };

        const result = await api.post(url, data);
        console.log(result);

        setTimeout(() => {
          if (result.data.status === 200) {
            this.objectCreateAccount = {};
            this.isShowSignUpPage = false;
            Notify.create({
              type: "positive",
              message: "Tạo tài khoản thành công !",
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
              message: `Tạo tài khoản thất bại: ${result.data.message}`,
              ok: true,
              cancel: false,
            });
          }

          Loading.hide();
        }, 500);
      } catch (err) {
        console.error("Internal Server Error: ", err);
      }
    },

    async handleAssignRouterToAccount() {
      try {
        const url = `/pms/user-routers`;

        const result = await api.get(url);
        // console.log(result);

        const finalResult = result.data.data.frontend.map((i) => ({
          routerName: i.name,
          routerLink: i.router,
          routerMethod: i.method,
        }));

        console.log(finalResult);
        return finalResult;

        if (result.data.status === 200) {
          this.roleData = result.data.data[0];

          const url = `/pms/user-access/role-routers?roleId=${this.roleData.roleId}`;
          const resultGetRouter = await api.get(url);

          const finalResult = resultGetRouter.data.data.map((i) => ({
            routerId: i.routerId,
            routerLink: i.routerLink,
            routerMethod: i.routerMethod,
          }));

          return finalResult;
        } else {
          console.error("Error when get user role: ", result.data.message);
        }
      } catch (err) {
        console.error("Internal Server Error: ", err);
      }
    },

    async getAccessRouterByRole() {
      try {
        const url = "";
      } catch (err) {
        console.error("Internal Server Error: ", err);
      }
    },
  },
});
