import { boot } from "quasar/wrappers";
import axios from "axios";
import { Dialog, Notify } from "quasar";
// import { useRouter } from "vue-router";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

// const router = useRouter();
const api = axios.create({ baseURL: "http://127.0.0.1:3528/" });

export default boot(({ app, redirect }) => {
  api.defaults.headers["access-token"] = localStorage.getItem("accessToken");

  // Request interceptor
  api.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers["access-token"] = accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  api.interceptors.response.use(
    (response) => {
      try {
        if (response.data.status === 403) {
          Dialog.create({
            title: "Thông báo",
            message: "Bạn đã hết phiên truy cập. Vui lòng đăng nhập lại !",
            ok: true,
            persistent: false,
          }).onOk(() => {
            redirect("/login");
            // router.push({ path: "/login" });
          });
        }
        return response;
      } catch (err) {
        console.log("hahahahhah");
      }
    },

    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("refreshToken");

        try {
          const response = await api.post("auth/refresh-token", {
            refreshToken,
          });

          localStorage.setItem("accessToken", response.data.data.accessToken);

          originalRequest.headers["access-token"] =
            response.data.data.accessToken;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  // Network error interceptor
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!navigator.onLine) {
        Notify.create({
          message: "Không có kết nối internet !",
          color: "red",
          position: "top",
        });

        return;
      }

      // if (error) {
      //   Notify.create({
      //     message: "Không thể kết nối đến Server !",
      //     color: "red",
      //     position: "top",
      //   });
      //   return;
      // }
      return Promise.reject(error);
    }
  );

  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
