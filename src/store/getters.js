
const getters = {
  language: state => state.app.language,
  token: state => state.user.token,
  refreshToken: state => state.user.refreshToken,
  name: state => state.user.user.full_name,
  username: state => state.user.user.username,
  hasWorkspace: state => state.workspace.workspaces.length > 0,
  workspacesLoaded: state => state.workspace.workspacesLoaded
}
export default getters
