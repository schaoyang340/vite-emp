<template>
         <div><el-button type="primary" @click="handleAddEmp">添加员工</el-button></div>
  <el-container>
    <el-table :data="obj.list" style="width: 100%">
      <el-table-column label="序号" width="80">
        <template #default="scope">
          <div>{{ scope.$index + 1 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="employee_id" label="员工编号" width="100" />
      <el-table-column label="姓名" width="180">
        <template #default="scope">
          <div>{{ scope.row.first_name + " " + scope.row.last_name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="department_name" label="部门名称" width="180" />
      <el-table-column prop="job_title" label="职位" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="phone_number" label="手机号" />
      <el-table-column prop="salary" label="薪资" />
      <el-table-column prop="hiredate" label="入职日期" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" type="info">详情</el-button>
          <el-button size="small" @click="handleEmpUpdate(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleEmpDel(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column></el-table
    ></el-container
  >
</template>
    
<script setup>
import { reactive } from "vue";
import request from "../common/request";
import { ElMessage, ElMessageBox } from "element-plus";
import {useRouter} from 'vue-router'

const router = useRouter();

const obj = reactive({
  list: [],
});

const listEmp = async () => {
  let result = await request("employee/list");
  obj.list = result.data.data;
};

listEmp();

//删除按钮事件
const handleEmpDel = (emp) => {
  ElMessageBox.confirm(
    `确认删除 ${emp.first_name + " " + emp.last_name} 员工信息吗？`,
    "删除提示",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "error",
    }
  )
    .then(() => {
      //点击确定按钮发送删除请求
      request(`employee/del/${emp.employee_id}`).then((resp) => {
        if (resp.data.code != 200) {
          ElMessage.error("error");
          return;
        }
        ElMessage({
                message: resp.data.msg,
                type: 'success',
                duration:1000,
                onClose:function(){
                        listEmp();
                }
        })
      });
    })
    .catch(() => {
      ElMessage.error("error");
    });
};

const handleAddEmp = ()=>{
        console.log(router);
        router.push("/add")
}

const handleEmpUpdate = (emp)=>{
  router.push(`/update/${emp.employee_id}`)
}
</script>
    
<style>
</style>