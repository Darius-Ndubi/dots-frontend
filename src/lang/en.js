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
  forgotPassword: {
    title: 'Reset your password',
    description: 'Enter your user account\'s email address and we will send you a password reset link.',
    enterEmail: 'Enter email',
    sendPassword: 'Send password reset email',
    emailSent: 'An email has been sent. Please check your email.'
  },
  resetPassword: {
    title: 'Set new password',
    setPassword: 'Set password',
    invalidToken: 'Invalid token',
    success: 'Password reset successfully'
  },
  userActivation: {
    success: {
      title: 'Your account has been verified!',
      description: 'Please login to continue.',
      action: 'Log in'
    },
    failed: {
      title: 'Could not verify the account',
      description: 'This could be a broken link'
    }
  },
  error: {
    404: {
      title: '404!',
      description: 'It appears this page is missing',
      action: 'GO HOME'
    },
    403: {
      title: '403!',
      description: 'This action is forbidden',
      action: 'GO HOME'
    },
    not_verified: {
      description: 'Please verify your email before logging in ',
      action: 'Resend Email'
    },
    reverification: {
      description: 'An email has been sent. Please check your email.'
    }
  },
  tables: {
    importLabel: 'Import Data',
    tableConfig: 'Configurations',
    tableSettings: 'Settings',
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
    },
    tableSettingsForm: {
      deleteTable: 'Delete',
      exportTable: 'Export',
      tableName: 'Table name',
      ownerName: 'Owner',
      source: 'Source'
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
    settings: 'Workspace Settings',
    workspaceDetails: 'Workspace Details',
    details: 'Details',
    people: 'People',
    configutations: 'Configurations',
    workspaceUsers: 'Workspace Users',
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
    workspaceFailure: 'Failed to create workspace.',
    rename: 'Renaming the workspace will cause changes to your WorkspaceDetails URL',
    leave: 'Once you leave your workspace you will no longer have access to this Workspace. However any other Workspace you are in will not be affected',
    transfer: 'Once you transfer your ownership, your role will be changed to Admin by default',
    users: {
      action: {
        resendInvitation: 'Resend Invitation',
        revokeInvitation: 'Revoke Invitation',
        deactivateUser: 'Deactivate User'
      }
    },
    action: {
      search: 'Search user name or email',
      filter: 'filter',
      addNewUser: 'Add new user',
      rename: 'Rename workspace',
      leave: 'Leave workspace',
      transfer: 'Transfer Ownership'
    }
  },
  profile: {
    index: {
      title: 'Profile',
      form: {
        firstName: 'First Name',
        lastName: 'Last Name',
        title: 'Title',
        username: 'Username',
        email: 'Email',
        validationErrors: {
          firstName: 'Please enter your first name',
          lastName: 'Please  enter your last name',
          title: 'Your title',
          username: 'Please enter your prefered username',
          email: 'Please enter your email'
        }
      }
    },
    security: {
      title: 'Security',
      form: {
        labels: {
          currentPassword: 'Current Password',
          newPassword: 'New Password',
          confirmNewPassword: 'Confirm Password'
        },
        validationErrors: {
          currentPassword: 'Please enter your current password',
          newPassword: 'Please enter your new password',
          confirmNewPassword: 'Please confirm your new password',
          passwordMismatch: 'Entered passwords don\'t match!'
        }
      }
    },
    language: {
      title: 'Language',
      form: {
        selectLanguage: 'Select language'
      }
    }
  }
}
