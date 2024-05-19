// This is just an example,
// so you can safely delete all default props below

export default {
  /**
   * Variable in Template file
   */
  //Login Page
  loginWelcome: "Welcome",
  loginUserNameText: "Username",
  loginWarningUserName: "Please enter your username!",
  loginPasswordText: "Password",
  loginWarningPassword: "Please enter your password!",
  loginWaringRulePassword: "Password need to have at least 6 characters",
  loginWarningSamePassword: "RePassword did'nt similar with password",
  loginRememberPassword: "Remember password",
  loginSignInBtn: "Login",
  loginCompanyName: "Register for the course",
  loginCompanyDesc: "Industrial University of Ho Chi Minh City",
  loginCreateAccount: "Sign up",
  loginBackToLogin: "Back to Login Page",
  loginSignUpBtn: "Sign Up",
  loginSignUpTitle: "Sign up your account",

  /**
   * Import Data
   */
  importSelectBox: "Select or drag the data file here",

  /* - Import tổ chức */
  importStructWarningNotHaveDataStruct:
    "You haven't set up the company tree yet. Go to setup page now ?",
  importStructWarningFinishedImport:
    "Note: The import of the company structure has been completed. Download the excel file containing the department code",
  importStructTitleStep1: "Company Struct Tree",
  importStructTitleStep2: "Import file",
  importStructTitleStep3: "Summary",
  importStructTitleH1: "Company structure tree information",
  importStructDownloadText: "Download the sample file's Excel import data",
  importStructDownloadDescription:
    "Prepared data is complete. Please click continue to import data",
  importStructStructName: "Struct name",
  importStructJobName: "Job name",
  importStructEmployeeName: "Employee name",
  importStructEmployeeCode: "Employee code",
  importStructCheckboxUnit: "Add struct units",
  importStructCheckboxJob: "Add job title",
  importStructTextTitleAdd: "Add child company for",
  importStructTextJobTitleAdd: "Add a job title for",
  importStructInput: "Child company name",
  importStructTitleShowDefault: "Information",
  importStructAddStructTitle: "Add company struct",
  importStructAddJobTitle: "Add job title",

  /* - Import mục tiêu */
  importTargetWarningNotSetTargetType:
    "You haven't set up a target type. Go to setup page now ?",
  importTargetWarningNotSetFormula:
    "You have not set up a formula method. Go to setup page now ?",
  importTargetWarningNotSetFrequency:
    "You have not set the measurement frequency. Go to setup page now ?",
  importTargetWarningNotAlreadyHaveTargetData:
    "Data has been imported. Go to the dashboard now ?",
  importTargetTitleH1: "Information",
  importTargetDownloadText: "Download the sample file's Excel import data",
  importStructDownloadDescription:
    "Company structure tree data is available. Please click continue to import data",
  importTargetTitleStep1: "Information",
  importTargetTitleStep2: "Import file",
  importTargetTitleStep3: "Summary",
  importTargetInputTargetName: "Target name",
  importTargetInputDesc: "Description of calculation method",
  importTargetInputAssign: "Assign to department",
  importTargetInputType: "Target type",
  importTargetInputFormula: "Formula",
  importTargetInputFrequency: "Measurement frequency",
  importTargetInputDepartment: "Measurement source",
  importTargetInputUnit: "Unit",
  importTargetInputImportance: "Critical level",
  importTargetInputDefaultValue: "Targets to strive for",
  importTargetInputMinValue: "Threshold reached",
  importTargetInputSourceDepartment: "Source text",
  importTargetTitleAdd: "Add a sub target for",

  /**
   * Phân bổ - Allocation
   */
  //Phân bổ theo kỳ - Allocation by time
  allocateTimeTab1: "Targets by period",
  allocateTimeTab2: "Summary of targets by period",
  allocateTimeTableTab1Name: "Targets by period",
  allocateTimeTableTab2Name: "Allocate target titles by period",

  //Phân bổ theo kỳ - Allocation by organization
  allocateOrganizationTab1: "Allocate target titles by period",
  allocateOrganizationTab2: "List of title targets by period",
  allocateOrganizationTab3: "Adjust personal targets",
  allocateOrganizationTableTab1Name: "Allocate target titles by period",
  allocateOrganizationTableTab2Name: "List of title targets by period",
  allocateOrganizationTableTab3Name: "Adjust personal targets",

  /**
   * Quản lý đơn vị - Organizational management
   */
  //Cấp tổ chức - Organizational level
  structLevelTitle: "Basic information of the organizational level",
  structLevelCompanyName: "Department name",
  structLevelDesc: "Description",
  structLevelTechName: "Tech name",
  structLevelDateCreate: "Date created",
  structLevelDateUpdate: "Date updated",
  structLevelTitleAdd: "Add a new child organization level for",

  //Sơ đồ tổ chức - Organizational tree
  structTreeParentTarget: "Parent target",
  structTreeTitleAdd: "Add department child for",

  /**
   * Quản lý mục tiêu - Target management
   */

  //Điều chỉnh mục tiêu - Adjust targets
  adjustTargetTitle: "Target details",
  adjustTargetInputTargetName: "Target name",
  adjustTargetInputTargetParent: "Parent target",
  adjustTargetInputTargetType: "Target type",
  adjustTargetInputFormula: "Formula",
  adjustTargetInputFrequency: "Measurement frequency",
  adjustTargetInputDefaultValue: "Targets to strive for",
  adjustTargetInputMinValue: "Threshold reached",
  adjustTargetInputImportance: "Critical level",
  adjustTargetInputDesc: "Description of calculation method",
  adjustTargetInputTechName: "Tech name",
  adjustTargetInputUnit: "Unit",
  adjustTargetInputSourceMeasure: "Measurement source",
  adjustTargetTitleAdd: "Add child target for",

  //Target Page
  targetTitle: "Target List",
  targetAddBoxTitle: "Add target type",
  /* Update target type */
  targetUpdateBoxTitle: "Update target type",
  targetAddInputName: "Target type name",
  // + Phuong Phap Tinh - Formular Page
  formulaTitle: "List of Calculation Methods",
  formulaAddBoxTitle: "Add calculation method",
  formulaAddInputName: "Name of calculation method",
  formulaAddInputDesc: "Description",
  /* update formular */
  formulaUpdateBoxTitle: "Update calculation method",
  // + Tan Suat Do - Frequency Page
  frequencyTitle: "Measurement Frequency List",
  frequencyAddBoxTitle: "Add measurement frequency",
  frequencyAddInputName: "Name of measurement frequency",
  frequencyDescInputName: "Describe the measurement frequency",
  frequencyUpdateBoxTitle: "Update measurement frequency",
  /* Cận trên - Toplimit */
  topLimitTitle: "Please set up a Top Limit range",
  topLimitInput: "Top limit",

  /**
   * Quản lý nhân viên - Employee manager
   */
  //Danh sách nhân viên - List of Employee
  listEmployeeTableName: "Employee List",
  listEmployeeButtonAdd: "Add Employee",

  listEmployeeTitleAdd: "Add new Employee",
  listEmployeeInputId: "Employee code",
  listEmployeeInputName: "Employee name",
  listEmployeeInputJob: "Job title",
  listEmployeeInputDepartment: "Department",
  listEmployeeInputWarningJob: "There were no search results for the job title",
  listEmployeeInputWarningDepartment:
    "There were no search results for the department",

  listEmployeeTitleUpdate: "Update employee data",
  listEmployeeInputDateJoin: "Date join",
  listEmployeeInputDateLeave: "Date leave",
  listEmployeeInputDateUpdate: "Time updated",

  //Authorization Page
  routerAppAddTitle: "Add router",
  routerAppTitle: "Basic information of router",
  routerFormTitle: "Add new router",
  routerFormId: "RouterId",
  routerFormName: "Router name",
  routerFormDesc: "Description",
  routerFormHref: "Router path",
  routerFormMethod: "Method",
  routerFormType: "Router type",
  routerFormTitleUpdate: "Update router",
  routerUserCreate: "User create",
  routerDateCreated: "Date created",
  routerDateUpdated: "Date updated",
  routerDisable: "Disable router",

  authorAppSearchInput: "Search role...",
  authorAppTitle: "List application role",
  authorAppTableTitle: "List all application role",
  authorAppAddTitle: "Add role",
  authorAppAddInputName: "Role name",
  authorAppAddInputDesc: "Role description",
  authorAppFirstStepTitle: "Establish",
  authorAppSecondStepTitle: "Authorize",
  authorAppThirdStepTitle: "Confirm",
  authorAppThirdStepTitleTable: "Confirm Permission",
  authorAppInputSearchText: "Search screens here...",
  authorAppTableStep2Title: "Table of functions available on the screen",

  roleOfAccountTableTitle: "Account authorization table",

  //Settings
  taskbarImportData: "Import data",
  taskbarImportCompanyStructure: "Import company structure",
  taskbarImportTarget: "Import Course",
  taskbarDivide: "Allocation",
  taskbarViewTableNeedAllocate: "See target table for allocation",
  taskbarTargetCompany: "Allocation of targets by organization",
  taskbarDivideTime: "Allocation by time",
  taskbarDivideCompany: "Allocation by individuals",
  taskbarCompany: "Organizational management",
  taskbarLevelCompany: "Organizational level",
  taskbarTreeCompany: "Organizational tree",
  taskbarTarget: "Course management",
  taskbarViewTableTarget: "View target table",
  taskbarAdjustTarget: "Adjust targets",
  taskbarTargetType: "Target type",
  taskbarFrequentlyCheck: "Measurement frequency",
  taskbarTargetSetup: "Set input parameters",
  taskbarFormulaType: "Calculation method",
  taskbarEmployee: "Employee manager",
  taskbarRole: "Authorization",
  taskbarAssignPermission: "Assign permissions to accounts",
  taskbarManageRouter: "Manage application routers",
  taskbarManagePermission: "Manage application roles",
  taskbarListEmployee: "List of employee",
  taskbarSettings: "Application settings",
  taskbarSettingsTarget: "Target settings",
  taskbarEmployeeJob: "Employee Job",
  taskbarChart: "Chart",
  taskbarChartCompany: "Chart by unit",
  taskbarChartTime: "Chart by time",

  /**
   * Variable in store
   */
  loginSuccessMessage: "Login successfully.",
  loginSuccessCaption: "Welcome back !",
  saveSuccessfully: "Saved successfully!",
  saveUnsuccessfully: "Save failed!",

  /**
   * Functional variable
   */
  funcAdd: "Add",
  funcUpdate: "Update",
  funcRemove: "Delete",
  funcSave: "Save",
  funcCancel: "Cancel",
  funcContinue: "Next",
  funcBack: "Back",
  funcDownload: "Right here",
  funcWarningNoData: "No data yet!",
  funcWarningNoDataSearch: "No search data available",
  funcWarningSelectScreenData: "Please select any screen unit to continue!",
  funcWarningSelectCompanyData:
    "Please select any department on the organizational chart on the left to continue !",
  funcWarningSelectTargetData:
    "Please select any goal on the left organizational chart to continue !",
  funcInputWarningFillData: "Cannot be empty",
  funcWarningFillRole: "Please choose permissions!",
  funcGoToPage: "Go to page",
  funcTreeInputStruct: "Search company struct...",
  funcTreeInputRouter: "Search router...",
  funcTreeInputTarget: "Search target...",
  funcGoToPage: "Go to Page",

  /**
   * Input variable
   */
  inputSearch: "Search",
  inputMonth: "Select Month",
  inputJob: "Select Job Title",
  inputEmployee: "Select Employee",
  inputTopLimit: "Top Limit (%)",
};
