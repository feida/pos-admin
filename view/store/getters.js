const getters = {
    sidebar: state => state.app.sidebar,
    language: state => state.app.language,
    device: state => state.app.device,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    status: state => state.user.status,
    roles: state => state.user.roles,
    setting: state => state.user.setting,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
    errorLogs: state => state.errorLog.logs,
    nick: state => state.user.nick,
    admin_name: state => state.user.admin_name,
    perms: state => state.user.perms,
    visitor: state => state.user.visitor,


    connectStatus: state => state.socketData.connectStatus,
  info: state => state.socketData.info,
  message: state => state.socketData.message,
}
export default getters
