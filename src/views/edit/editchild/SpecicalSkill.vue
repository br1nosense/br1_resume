<template>
    <div class="edit_box">
    <div>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-menu>
              <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              <el-menu-item index="1">技能</el-menu-item>
            </el-menu>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-menu>
              <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              <el-menu-item index="2">专业技能</el-menu-item>
            </el-menu>
          </div>
        </el-col>
      </el-row>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
    name:'SpecicalSkill',
    data(){
        
    },
}
</script>

<style>

</style>