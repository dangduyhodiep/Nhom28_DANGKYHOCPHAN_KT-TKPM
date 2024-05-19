<script setup>
import { useAuthenticationStore } from "@/stores/authentication/authenStore.js";
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const storeAuthentication = useAuthenticationStore();
const $q = useQuasar();
const isPwd = ref(true);
const isPwdSignUp = ref(true);
const isRePwd = ref(true);

/* Vue i18 */
const { t } = useI18n();
const { locale } = useI18n({ useScope: "global" });
let lang = localStorage.getItem("lang") || "";

if (!lang) {
  locale.value = "vi-VN";
} else {
  lang === "vi" ? (locale.value = "vi-VN") : (locale.value = "en-US");
}

const toggleValue = ref(true);

const setLocalStorageLang = (value) => {
  localStorage.setItem("lang", value);
};

/* Theme */
const handleToggle = () => {
  $q.dark.toggle();
};


onMounted(() => {
  storeAuthentication.getInit();
  document.title = `Đăng nhập`;
});
</script>

<template>
  <div class="wrapper">
    <div class="flex" style="float: right; z-index: 99; margin: 1em 2em 0 0">
      <q-toggle
        v-model="toggleValue"
        color="black"
        :icon="toggleValue ? 'dark_mode' : 'light_mode'"
        size="lg"
        @input="handleToggle()"
        @click="handleToggle()"
      />

      <q-btn flat>
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
              clickable
            >
              <q-item-section>English</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <div class="login-wrapper">
      <!-- Left -->
      <div class="login-wrapper__left">
        <div class="q-mb-lg" style="z-index: 1">
          <transition appear enter-active-class="animated fadeInLeft fadeIn">
            <q-img
              src="login/computer-icon-bg.svg"
              :ratio="16 / 9"
              spinner-color="primary"
              spinner-size="82px"
              style="width: 300px"
            />
          </transition>

          <transition appear enter-active-class="animated fadeInLeft slow">
            <h4 class="q-my-lg text-white">{{ $t("loginCompanyName") }}</h4>
          </transition>

          <transition appear enter-active-class="animated fadeInLeft slower">
            <p class="text-white" style="width: 400px">
              {{ $t("loginCompanyDesc") }}
            </p>
          </transition>
        </div>
      </div>

      <!-- Right: input content here -->
      <div class="login-wrapper__right z-max">
        <q-form
          @submit="
            !storeAuthentication.isShowSignUpPage
              ? storeAuthentication.postLogin(
                  storeAuthentication.username,
                  storeAuthentication.password
                )
              : storeAuthentication.postCreateAccount(
                  storeAuthentication.objectCreateAccount
                )
          "
          class="q-gutter-md q-mb-lg"
        >
          <div class="right-box">
            <transition
              v-if="!storeAuthentication.isShowSignUpPage"
              appear
              enter-active-class="animated fadeInRight"
              leave-active-class="animated fadeInLeft"
            >
              <h4 class="title text-bold q-pb-md">{{ $t("loginWelcome") }}</h4>
            </transition>

            <transition
              v-else
              appear
              enter-active-class="animated fadeInLeft slower"
              leave-active-class="animated fadeInRight slower"
            >
              <h4 class="title text-bold q-pb-md">
                {{ $t("loginSignUpTitle") }}
              </h4>
            </transition>

            <div class="flex column">
              <!-- Login Username -->
              <transition
                v-if="!storeAuthentication.isShowSignUpPage"
                appear
                enter-active-class="animated fadeInRight slow"
                leave-active-class="animated fadeInLeft slow"
              >
                <div
                  class="form-group q-mt-lg column"
                  style="user-select: none"
                >
                  <q-input
                    v-model="storeAuthentication.username"
                    type="text"
                    :placeholder="$t('loginUserNameText')"
                    outlined
                    class="q-pb-sm"
                    :rules="[(val) => !!val || $t('loginWarningUserName')]"
                    lazy-rules
                  />
                  <transition
                    v-if="!storeAuthentication.isShowSignUpPage"
                    appear
                    enter-active-class="animated fadeIn slower"
                    leave-active-class="animated fadeInLeft slower"
                  >
                    <span class="text-red error-msg">{{
                      storeAuthentication.messageUsername
                    }}</span>
                  </transition>
                </div>
              </transition>

              <!-- Sign Up username -->
              <transition
                v-else
                appear
                enter-active-class="animated fadeInLeft slower"
                leave-active-class="animated fadeInRight slower"
              >
                <div
                  class="form-group q-mt-lg column"
                  style="user-select: none"
                >
                  <q-input
                    v-model="storeAuthentication.objectCreateAccount.userName"
                    type="text"
                    :placeholder="$t('loginUserNameText')"
                    outlined
                    class="q-pb-sm"
                    :rules="[(val) => !!val || $t('loginWarningUserName')]"
                    lazy-rules
                  />
                  <transition
                    v-if="!storeAuthentication.isShowSignUpPage"
                    appear
                    enter-active-class="animated fadeIn slower"
                    leave-active-class="animated fadeInLeft slower"
                  >
                    <span class="text-red error-msg">{{
                      storeAuthentication.messageUsername
                    }}</span>
                  </transition>
                </div>
              </transition>

              <!-- Login Password -->
              <transition
                v-if="!storeAuthentication.isShowSignUpPage"
                appear
                enter-active-class="animated fadeInRight slow"
                leave-active-class="animated fadeInLeft slow"
              >
                <div
                  class="form-group password-box q-mt-lg"
                  style="user-select: none"
                >
                  <q-input
                    outlined
                    :placeholder="$t('loginPasswordText')"
                    :type="isPwd ? 'password' : 'text'"
                    v-model="storeAuthentication.password"
                    :rules="[
                      (val) => !!val || $t('loginWarningPassword'),
                      (val) => val.length > 5 || $t('loginWaringRulePassword'),
                    ]"
                    lazy-rules
                    style="width: 400px"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                </div>
              </transition>

              <!-- Sign Up Password -->
              <transition
                v-else
                appear
                enter-active-class="animated fadeInLeft slow"
                leave-active-class="animated fadeInRight slow"
              >
                <div
                  class="form-group password-box q-mt-lg"
                  style="user-select: none"
                >
                  <q-input
                    outlined
                    :placeholder="$t('loginPasswordText')"
                    :type="isPwdSignUp ? 'password' : 'text'"
                    v-model="storeAuthentication.objectCreateAccount.passWord"
                    :rules="[
                      (val) => !!val || $t('loginWarningPassword'),
                      (val) => val.length > 5 || $t('loginWaringRulePassword'),
                    ]"
                    lazy-rules
                    style="width: 400px"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwdSignUp ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwdSignUp = !isPwdSignUp"
                      />
                    </template>
                  </q-input>
                </div>
              </transition>

              <!-- Sign Up reenter Password -->
              <transition
                v-if="storeAuthentication.isShowSignUpPage"
                appear
                enter-active-class="animated fadeInLeft"
                leave-active-class="animated fadeInRight"
              >
                <div
                  class="form-group password-box q-mt-lg"
                  style="user-select: none"
                >
                  <q-input
                    outlined
                    :placeholder="$t('loginPasswordText')"
                    :type="isRePwd ? 'password' : 'text'"
                    v-model="storeAuthentication.objectCreateAccount.rePassword"
                    :rules="[
                      (val) => !!val || $t('loginWarningPassword'),
                      (val) => val.length > 5 || $t('loginWaringRulePassword'),
                      (val) =>
                        val ===
                          storeAuthentication.objectCreateAccount.passWord ||
                        $t('loginWarningSamePassword'),
                    ]"
                    lazy-rules
                    style="width: 400px"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isRePwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isRePwd = !isRePwd"
                      />
                    </template>
                  </q-input>
                </div>
              </transition>

              <!-- <transition
                v-if="!storeAuthentication.isShowSignUpPage"
                appear
                enter-active-class="animated fadeInRight slow"
                leave-active-class="animated fadeInLeft slow"
              >
              </transition>
              <span class="text-red error-msg">{{
                storeAuthentication.messagePassword
              }}</span> -->

              <!-- Login announcement -->
              <transition
                appear
                enter-active-class="animated fadeInRight slower"
                leave-active-class="animated fadeInLeft slower"
                v-if="!storeAuthentication.isShowSignUpPage"
              >
                <div
                  class="flex justify-between row q-mb-md"
                  style="user-select: none"
                >
                  <label style="cursor: pointer">
                    <q-checkbox
                      v-model="storeAuthentication.isRememberPassword"
                      size="xs"
                    />
                    {{ $t("loginRememberPassword") }}
                  </label>

                  <label
                    @click="storeAuthentication.isShowSignUpPage = !storeAuthentication.isShowSignUpPage"
                    class="text-blue-9 cursor-pointer"
                  >
                    {{ $t("loginCreateAccount") }}
                  </label>
                </div>
              </transition>

              <!-- Sign Up announcement -->
              <transition
                appear
                enter-active-class="animated fadeInLeft slow"
                leave-active-class="animated fadeInRight slow"
                v-else
              >
                <div
                  class="flex justify-end row q-mb-md"
                  style="user-select: none"
                >
                  <label
                    @click="storeAuthentication.isShowSignUpPage = !storeAuthentication.isShowSignUpPage"
                    class="text-blue-9 cursor-pointer"
                  >
                    {{ $t("loginBackToLogin") }}
                  </label>
                </div>
              </transition>

              <!-- Login Button -->
              <transition
                appear
                enter-active-class="animated fadeInRight slower"
                leave-active-class="animated fadeInLeft slower"
                v-if="!storeAuthentication.isShowSignUpPage"
              >
                <q-btn
                  type="submit"
                  color="blue-10"
                  style="border-radius: 8px; padding: 10px 0"
                  :loading="storeAuthentication.isLoadingLogin"
                >
                  {{ $t("loginSignInBtn") }}

                  <template v-slot:loading>
                    <q-spinner-tail :thickness="7" size="1.2em" />
                    <span class="q-ml-sm"> {{ $t("loginSignInBtn") }}</span>
                  </template>
                </q-btn>
              </transition>

              <!-- Sign Up Button -->
              <transition
                appear
                enter-active-class="animated fadeInLeft"
                leave-active-class="animated fadeInRight"
                v-else
              >
                <q-btn
                  type="submit"
                  color="blue-10"
                  style="border-radius: 8px; padding: 10px 0"
                  :loading="storeAuthentication.isLoadingLogin"
                >
                  {{ $t("loginSignUpBtn") }}

                  <template v-slot:loading>
                    <q-spinner-tail :thickness="7" size="1.2em" />
                    <span class="q-ml-sm"> {{ $t("loginSignUpBtn") }}</span>
                  </template>
                </q-btn>
              </transition>
            </div>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
input {
  color: black;
  min-width: 400px !important;
}

.wrapper {
  position: relative;
  width: 100%;
  // min-height: 100%;
  height: 100vh;
  // overflow-y: hidden !important;
}

.login-wrapper {
  display: flex;
  padding: 0 5em;
  height: 100%;

  @media screen and (max-width: 1200px) {
    justify-content: center;
    align-items: center;
    color: white;
    width: 100vw;
    height: 80vh;
  }

  @media screen and (max-width: 600px) {
    padding: 0;
  }

  &:before {
    background-image: url("login/login-bg.svg");
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-repeat: no-repeat;
    background-position: 100%;
    background-size: auto 100%;
    z-index: 0;
  }

  &__left {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    text-align: left;
    letter-spacing: 1px;

    @media screen and (max-width: 1200px) {
      display: none;
    }
  }

  &__right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    text-align: left;
    letter-spacing: 1px;

    @media screen and (max-width: 1200px) {
      height: 50vh;
      background-color: #293146;
      border-radius: 8px;
      width: 500px;
    }

    .password-box {
      position: relative;

      svg {
        position: absolute;
        cursor: pointer;
        right: 2%;
        top: 40%;
        fill: #8c8c8c;
      }
    }
  }
}

.error-msg {
  font-size: 0.9em;
}
</style>
