<script setup>
/* Build in VueJs */
import { ref, onUpdated, onMounted, watch, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";

/* Pinia Store */
import { useUtilStore } from "@/stores/dataStore";
import { useSettingStore } from "@/stores/extra/SettingStore.js";
import { useAuthenticationStore } from "@/stores/authentication/authenStore";

/* Third library */
import { useRouter } from "vue-router";

const titleNameDefault = "Ứng dụng KPI";
const storeSetting = useSettingStore();
const storeAuthentication = useAuthenticationStore();
const storeUtils = useUtilStore();
const router = useRouter();

const $q = useQuasar();
const { t } = useI18n();
const { locale } = useI18n({ useScope: "global" });

let lang = localStorage.getItem("lang") || "";

if (!lang) {
  locale.value = "vi-VN";
} else {
  lang === "vi" ? (locale.value = "vi-VN") : (locale.value = "en-US");
}

/* picture */
import avatar from "/material/avatar-svgrepo-com.svg";

/* vue-use */
import { onClickOutside } from "@vueuse/core";
const target = ref(null);

onClickOutside(target, (event) => (leftDrawerOpen.value = false));

/* Remember Delete it */
const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
const setLocalStorageLang = (value) => {
  localStorage.setItem("lang", value);
  window.location.reload();
};

const firstRef = ref(null);
const thumbStyle = {
  right: "4px",
  borderRadius: "7px",
  backgroundColor: "#027be3",
  width: "4px",
  opacity: 0.75,
};

const barStyle = {
  right: "2px",
  borderRadius: "9px",
  backgroundColor: "#027be3",
  width: "8px",
  opacity: 0.2,
};

onBeforeMount(async () => {
  storeAuthentication.routerData =
    await storeAuthentication.handleAssignRouterToAccount(
      storeAuthentication.userName
    );

  const routerName = storeAuthentication.routerData.map((i) => i.routerLink);

  /* Set taskbar menu just only router when that user have their own permission */
  // const handleRouterData = filterData(nodes, routerName);
  // nodes = handleRouterData;
});

var nodes = ref([]);

const userName = ref("");

onMounted(async () => {
  await storeUtils.getInit();
  await searchRouterNameByHref(router.currentRoute._rawValue.href);
  // await storeUtils.getInit();
  /* set title name for page */
  document.title = storeSetting.routerName || titleNameDefault;

  /* DEVICE ROUTER FOR EACH ACCOUNT */
  const dataObject = JSON.parse(localStorage.getItem("userData"));
  userName.value = dataObject.name;
  switch (userName.value) {
    case "student":
      nodes.value = [
        {
          label: t("taskbarCompany"),
          group: true,
          icon: "apartment",
          items: [
            {
              href: "/structure/level",
              iconName: "account_tree",
              contentName: t("taskbarLevelCompany"),
            },
          ],
        },

        {
          label: t("taskbarTarget"),
          group: true,
          icon: "ads_click",
          items: [
            {
              href: "/target/list",
              iconName: "edit_document",
              contentName: t("taskbarAdjustTarget"),
            },
          ],
        },

        {
          label: t("taskbarEmployee"),
          group: true,
          icon: "person_search",
          items: [
            {
              href: "/employees/job",
              iconName: "engineering",
              contentName: t("taskbarEmployeeJob"),
            },

            {
              href: "/employees/list",
              iconName: "edit_document",
              contentName: t("taskbarAdjustTarget"),
            },
          ],
        },
      ];
      break;

    case "teacher":
      nodes.value = [
        {
          label: t("taskbarCompany"),
          group: true,
          icon: "apartment",
          items: [
            {
              href: "/structure/level",
              iconName: "account_tree",
              contentName: t("taskbarLevelCompany"),
            },
          ],
        },
      ];
      break;

    case "admin":
      nodes.value = [
        {
          label: t("taskbarImportData"),
          group: true,
          icon: "ios_share",
          items: [
            {
              href: "/import/company-level",
              iconName: "account_tree",
              contentName: t("taskbarImportCompanyStructure"),
            },

            {
              href: "/import/target",
              iconName: "format_list_bulleted_add",
              contentName: t("taskbarImportTarget"),
            },
          ],
        },

        {
          label: t("taskbarCompany"),
          group: true,
          icon: "apartment",
          items: [
            {
              href: "/structure/level",
              iconName: "account_tree",
              contentName: t("taskbarLevelCompany"),
            },
            {
              href: "/structure/list",
              iconName: "domain_add",
              contentName: t("taskbarTreeCompany"),
            },
          ],
        },

        {
          label: t("taskbarTarget"),
          group: true,
          icon: "ads_click",
          items: [
            {
              href: "/target/list",
              iconName: "edit_document",
              contentName: t("taskbarAdjustTarget"),
            },

            {
              href: "/target/setup",
              iconName: "settings",
              contentName: t("taskbarTargetSetup"),
            },
          ],
        },

        {
          label: t("taskbarEmployee"),
          group: true,
          icon: "person_search",
          items: [
            {
              href: "/employees/list",
              iconName: "contact_page",
              contentName: t("taskbarListEmployee"),
            },

            {
              href: "/employees/job",
              iconName: "engineering",
              contentName: t("taskbarEmployeeJob"),
            },
          ],
        },
      ];
      break;

    default:
      break;
  }
});

onUpdated(() => {
  storeSetting.selectedSearchResult = "";
});

watch(
  () => storeSetting.routerHref,
  async (val) => {
    await searchRouterNameByHref(val);
    /* set title name for page */
    document.title = storeSetting.routerName || titleNameDefault;
    storeSetting.routerName = storeSetting.routerName || "";
  }
);

/* functional */
const searchRouter = (value) => {
  storeSetting.searchResult = [];
  nodes.value.filter((i) => {
    if (i?.contentName) {
      if (
        i?.contentName
          .toLowerCase()
          .trim()
          .includes(value.toLowerCase().trim()) &&
        value.length
      ) {
        storeSetting.searchResult.push(i);
      }
    }
  });

  nodes.value.filter((i) => {
    if (i?.items) {
      i.items.filter((j) => {
        if (
          j.contentName
            .toLowerCase()
            .trim()
            .includes(value.toLowerCase().trim()) &&
          value.length
        ) {
          storeSetting.searchResult.push(j);
        }
      });
    }
  });
};

const searchRouterNameByHref = (value) => {
  storeSetting.routerName = "";
  let valueRemovedTag = value.replace(/#/g, "");

  nodes.value.filter((i) => {
    if (i?.contentName) {
      if (i.href === valueRemovedTag) {
        storeSetting.routerName = i.contentName;
      }
    }
  });

  if (storeSetting.routerName) {
    return;
  } else {
    nodes.value.filter((i) => {
      if (i?.items) {
        i.items.filter((j) => {
          if (j.href === valueRemovedTag) {
            storeSetting.routerName = j.contentName;
          }
        });
      }
    });
  }
};

const options = ref(storeSetting.searchResult);
const filterFn = (val, update) => {
  if (val === "") {
    update(() => {
      options.value = [];
    });
    return;
  }

  update(() => {
    searchRouter(val);
    options.value = storeSetting.searchResult;
  });
};

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "k") {
    event.preventDefault();
    leftDrawerOpen.value = true;
    storeSetting.searchDialog = !storeSetting.searchDialog;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    leftDrawerOpen.value = false;
  }
});

const handleSelectCard = async (url) => {
  storeSetting.routerHref = router.currentRoute._rawValue.href;
  if (url) {
    router.push(url);
  }
};

const filterData = (initialData, routerHrefArray) => {
  try {
    console.log("List router: ", routerHrefArray);
    return initialData
      .map((i) => ({
        ...i,
        items: i.items.filter((j) => routerHrefArray.includes(j.href)),
      }))
      .filter((z) => z.items.length > 0);
  } catch (err) {
    console.error("Error when handle filter router data: ", err);
  }
};
</script>
<template>
  <!-- class="fixed" -->
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="text-black bg_defaultColor fixed-top header">
      <q-toolbar>
        <q-icon
          name="menu"
          color="white"
          size="md"
          class="cursor-pointer q-mr-md"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title
          style="min-height: 60px"
          class="flex align-center column justify-center text-white"
          v-bind:style="$q.screen.lt.sm ? { display: 'none' } : {}"
        >
          {{ storeSetting.routerName }}
        </q-toolbar-title>
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-dialog v-model="storeSetting.searchDialog" position="top">
            <q-card
              class="q-mt-lg"
              style="
                min-width: 700px;
                /* min-height: 400px; */
                border-radius: 8px;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
                  0 6px 6px rgba(0, 0, 0, 0.23);
              "
            >
              <q-card-section class="row items-center">
                <q-select
                  class="full-width"
                  style="width: 100%; border-radius: 8px"
                  option-label="contentName"
                  option-value="href"
                  v-model="storeSetting.selectedSearchResult"
                  :options="options"
                  placeholder="Search"
                  icon="search"
                  autofocus
                  filled
                  use-input
                  input-debounce="0"
                  outlined
                  @filter="filterFn"
                  @keyup.enter="
                    handleSelectCard(storeSetting.selectedSearchResult.href)
                  "
                  :option-disable="
                    (opt) =>
                      opt.contentName === storeSetting.routerName
                        ? true
                        : opt.href === router.currentRoute._rawValue.href
                  "
                  clearable
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>

                  <template v-slot:option="{ itemProps, opt }">
                    <q-card
                      @click="
                        storeSetting.routerHref =
                          router.currentRoute._rawValue.href
                      "
                      class="my-card q-py-ld"
                    >
                      <q-item
                        @click="
                          handleSelectCard(opt.href),
                            (storeSetting.routerHref =
                              router.currentRoute._rawValue.href)
                        "
                        v-bind="itemProps"
                        style="min-height: 100px"
                      >
                        <q-item-section>
                          <div>
                            <!-- <q-icon :name="opt.iconName" size="sm" /> -->
                            <span
                              style="color: #111111"
                              class="text-subtitle1 text-bold"
                              >{{ opt.contentName }}</span
                            >
                          </div>

                          <div>
                            Đường dẫn:
                            <span class="text-primary">{{ opt.href }}</span>
                          </div>
                        </q-item-section>
                        <q-item-section side>
                          <q-icon name="open_in_new" size="sm" />
                        </q-item-section>
                      </q-item>
                    </q-card>
                  </template>

                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        {{ t("funcWarningNoDataSearch") }}
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </q-card-section>
            </q-card>
          </q-dialog>

          <q-icon
            name="search"
            size="sm"
            class="cursor-pointer q-mx-sm text-white"
            color="white"
            @click="storeSetting.searchDialog = !storeSetting.searchDialog"
          />

          <!-- notification icon -->
          <!-- <q-btn
            round
            dense
            flat
            icon="notifications"
            class="q-mx-sm text-white"
          >
            <q-badge color="red" text-color="white" floating> 5 </q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-card class="text-center no-shadow no-border">
                  <q-btn
                    label="View All"
                    style="max-width: 100px !important"
                    flat
                    dense
                    class="text-indigo-8"
                  ></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn> -->

          <q-btn color="white" flat>
            <q-icon class="cursor-pointer" name="translate" size="sm" />
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item
                  @click="
                    locale = 'vi-VN';
                    setLocalStorageLang('vi');
                  "
                  :style="
                    locale === 'vi-VN'
                      ? 'background-color: #e3f4fc; color: #0960bd;'
                      : ''
                  "
                  v-close-popup
                  clickable
                >
                  <q-item-section>Tiếng Việt</q-item-section>
                </q-item>
                <q-separator />
                <q-item
                  @click="
                    locale = 'en-US';
                    setLocalStorageLang('en');
                  "
                  :style="
                    locale === 'en-US'
                      ? 'background-color: #e3f4fc; color: #0960bd;'
                      : ''
                  "
                  v-close-popup
                  clickable
                >
                  <q-item-section>English</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>

          <div class="user-image-wrap">
            <q-btn flat>
              <q-avatar size="26px">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
                />
              </q-avatar>
              <!-- <span>{{ tenNhanVien }}</span> -->
              <q-menu>
                <q-list>
                  <q-item
                    clickable
                    v-ripple
                    @click="storeSetting.changePasswordDialog = true"
                  >
                    <q-item-section avatar>
                      <q-icon color="primary" name="vpn_key" />
                    </q-item-section>
                    <q-item-section
                      style="font-size: 1.1em; white-space: nowrap"
                      >Đổi mật khẩu</q-item-section
                    >
                  </q-item>

                  <q-item
                    clickable
                    v-ripple
                    @click="storeAuthentication.dialogConfirmLogout = true"
                  >
                    <q-item-section avatar>
                      <q-icon color="primary" name="logout" />
                    </q-item-section>
                    <q-item-section style="font-size: 1.1em"
                      >Đăng xuất</q-item-section
                    >
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      ref="target"
      overlay
      v-model="leftDrawerOpen"
      bordered
      class="text-white taskbar"
      style="background-color: #001529; font-size: 13px; overflow-y: hidden"
      :width="300"
      v-if="storeAuthentication.isLogged"
    >
      <div
        class="flex justify-end q-py-sm"
        style="background-color: rgba(255, 255, 255, 0.1)"
      >
        <div class="flex no-wrap" style="width: 100%">
          <q-img
            :src="avatar"
            spinner-color="primary"
            spinner-size="82px"
            class="q-ma-sm"
            width="70px"
          />
          <div class="flex column justify-center q-px-md">
            <div class="q-py-sm flex column">
              <span class="text-h5 text-bold">Khoa Tran</span>

              Sinh viên
            </div>

            <div class="text-green text-subtitle1">
              <q-icon name="fiber_manual_record" />
              Online
            </div>
          </div>

          <q-icon
            name="close"
            size="md"
            class="cursor-pointer q-ml-sm"
            color="white"
            @click="leftDrawerOpen = false"
          />
        </div>
      </div>

      <q-scroll-area
        visible
        :thumb-style="thumbStyle"
        :bar-style="barStyle"
        style="height: 80vh"
        class="col"
        ref="firstRef"
      >
        <q-list style="color: #ffffffb3; font-size: 0.95em">
          <div class="flex flex-center">
            <q-item
              :to="userName.value === 'student' ? '/chart/general' : '/'"
              style="width: 100%"
              @click="storeSetting.routerHref = ''"
            >
              <q-item-section avatar>
                <q-icon name="dashboard" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Dashboard</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <template v-for="(node, index) in nodes" :key="index">
            <q-expansion-item
              v-if="node.group"
              :key="index"
              :icon="node.icon"
              :label="node.label"
              default-opened
            >
              <q-list>
                <template
                  v-for="(item, subIndex) in node.items"
                  :key="subIndex"
                >
                  <q-item
                    :to="item.href"
                    @click="storeSetting.routerHref = item.href"
                    active-class="my-active-class"
                    class="cursor-pointer full-width q-pl-lg"
                  >
                    <q-item-section avatar class="q-pl-md">
                      <q-icon :name="item.iconName" />
                    </q-item-section>
                    <q-item-section @click="item.action">
                      <q-item-label>{{ item.contentName }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-list>
            </q-expansion-item>
            <q-item
              v-else
              :to="node.href"
              active-class="my-active-class"
              @click="storeSetting.routerHref = node.href"
            >
              <q-item-section avatar>
                <q-icon :name="node.iconName" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ node.contentName }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-dialog v-model="storeSetting.changePasswordDialog">
      <q-card class="q-py-md" style="min-width: 600px">
        <q-card-section>
          <div class="q-mb-md text-h6">ĐỔI MẬT KHẨU</div>
          <q-form>
            <q-input
              class="q-mb-sm"
              type="password"
              v-model="storeSetting.oldPassword"
              label="Mật khẩu cũ"
              outlined
              :rules="[(val) => !!val || 'Mật khẩu không được để rỗng!']"
            />
            <q-input
              class="q-mb-sm"
              type="password"
              v-model="storeSetting.newPassword"
              label="Mật khẩu mới"
              outlined
              :rules="[
                (val) => !!val || 'Mật khẩu không được để rỗng!',
                (val) =>
                  val.length > 5 || 'Mật khẩu không được ít hơn 5 kí tự !',
              ]"
            />
            <q-input
              type="password"
              v-model="storeSetting.confirmPassword"
              label="Nhập lại mật khẩu"
              outlined
              :rules="[
                (val) => !!val || 'Mật khẩu không được để rỗng!',
                (val) =>
                  val === storeSetting.newPassword ||
                  'Mật khẩu nhập lại không khớp !',
                (val) =>
                  val.length > 5 || 'Mật khẩu không được ít hơn 5 kí tự !',
              ]"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn type="submit" label="Lưu" color="primary" />
          <q-btn
            label="Hủy"
            outline
            color="defaultColor"
            class="q-ml-sm"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="storeAuthentication.dialogConfirmLogout" persistent>
      <q-card style="min-width: 500px; min-height: 120px">
        <q-card-section class="flex column row">
          <p class="text-h4">Xác nhận</p>
          <p class="text-subtitle1">Bạn có chắc muốn đăng xuất không ?</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Hủy" color="primary" v-close-popup />
          <q-btn
            @click="storeAuthentication.postLogout()"
            color="primary"
            class="text-bold"
            :loading="storeAuthentication.isLoadingLogout"
            style="min-width: 7vw"
          >
            Đăng xuất

            <template v-slot:loading>
              <q-spinner-tail />
              <span class="q-ml-sm">Đăng xuất</span>
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.my-active-class {
  background-color: rgba(255, 255, 255, 0.2) !important;
}

.taskbar {
  font-size: 12px !important;
}

.header {
  min-height: $heightHeader;
  display: flex;
  align-items: center;
}
</style>
