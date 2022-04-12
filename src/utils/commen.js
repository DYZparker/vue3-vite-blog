
export const rowDelete =  function (dispatchName, payload, that) {
  that.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    that.$store.dispatch(dispatchName, payload).then(response => {
      const res = response.data
      if(res.code === 200) {
        return (() => {
          that.$message({
            message: res.message,
            type: 'success'
          })
          that.refreshList()
        })()
      }
      that.$message({
        message: res.message,
        type: 'warning'
      })
    })
  }).catch(() => {
    that.$message({
      type: 'info',
      message: '已取消删除'
    })
  })
}