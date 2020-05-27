export default {
  general: {
    requiredField: 'This field is required'
  },
  navbar: {
    profile: 'Profile',
    logout: 'Log out',
    dashboard: 'Dashboard',
    maps: 'Maps',
    reports: 'Reports',
    tables: 'Tables'
  },
  main: {
    confirmLogout: 'Are you sure you want to log out?',
    profile: '{username} profile',
    addWorkspace: 'Add Workspace',
    workspaceSettings: 'Workspace Settings'
  },
  login: {
    username: 'Email or username',
    password: 'Password',
    login: 'Log in',
    header: 'Log in to Dots',
    noAccount: 'Don\'t have an account',
    forgotPassword: 'Forgot Password',
    capsLockOn: 'Caps lock is On'
  },
  register: {
    createAccount: 'Create an account',
    firstName: 'First Name',
    lastName: 'Last Name',
    username: 'Username',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    haveAccount: 'Already have an account',
    register: 'Register',
    passwordMismatch: 'Passwords do not match',
    minimumCharacters: 'At least 8 characters is required',
    invalidEmail: 'Invalid email'
  },
  thankYou: {
    title: 'Thank you for registering!',
    description: 'Please confirm your email to log in to the application.',
    logIn: 'Log in'
  },
  error: {
    404: {
      title: '404!',
      description: 'It appears this page is missing',
      action: 'GO HOME'
    }
  },
  tables: {
    importLabel: 'Import Data',
    tableConfig: 'Configurations',
    setConfigs: 'Set Table Configurations',
    importCsv: 'Import CSV Data',
    listTable: {
      tableUuid: 'Table uuid',
      tableName: 'Name',
      source: 'Source',
      createDate: 'Create date',
      updateDate: 'Update date'
    },
    csvImportForm: {
      name: 'Name',
      nameHelpText: 'Leave blank to default to the source form/file name',
      uniqueColumn: 'Unique column',
      attachFiles: 'attach csv files with a size less than 500kb',
      drag: 'Drop file here or',
      clickUpload: 'click to upload',
      selectForm: 'Select {source} Form'
    },
    tableConfigForm: {
      uniqueColumn: 'Unique column',
      latitude: 'Latitude field',
      longitude: 'Longitude field',
      geoLocation: 'Geolocation point field',
      mapToolTipField: 'Point tool-tip field'
    }
  },
  actionVerbs: {
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    add: 'Add'
  },
  notifications: {
    successDelete: '{table} was successfully deleted',
    successEdit: '{table} was successfully edited',
    successCreate: '{table} was successfully created',
    successConfigSave: '{table} configs were successfully saved'
  },
  workspace: {
    welcome: 'Welcome',
    startByCreating: 'Start by creating a workspace',
    createWorkspace: 'Create Workspace',
    addWorkspace: 'Add Workspace',
    workspaceName: 'Workspace name',
    myWorkspace: 'My Workspace',
    workspaceEmail: 'Workspace email',
    description: 'Description',
    website: 'Website',
    location: 'Location',
    urlHint: 'This will be the name of your workspace on Dots. Your URL will be: https://dots.hikaya.app/ws/{name}.',
    workspaceCreated: 'Workspace created successfully.',
    workspaceFailure: 'Failed to create workspace.'
  }
}
