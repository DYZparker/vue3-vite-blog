<template>
  <!-- <el-button text @click="dialogVisible = true"
    >click to open the Dialog</el-button
  > -->
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button type="primary" @click="closeDialog"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  const props = defineProps<{
    dialogVisible: Boolean
  }>()
  const emit = defineEmits(['close', 'addNew', 'reset'])

  const closeDialog = () => emit('close')
  const handleClose = (done: () => void) => {
    console.log('sss')
    ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
  }
</script>

<style scoped lang="scss">
  .form-inline {
    padding: 20px 20px 0 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
