<template>
  <div>添加员工</div>
    <el-form :model="form" label-width="auto">
      <el-form-item label="姓氏">
        <el-input v-model="obj.emp.firstName"/>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="obj.emp.lastName"/>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="obj.emp.phoneNumber"/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="obj.emp.email"/>
      </el-form-item>
      <el-form-item label="部门">
        <el-select placeholder="请选择部门" v-model="obj.emp.departmentId">
          <el-option v-for="dept in obj.deptList" :key="dept.departmentId" :label="dept.departmentName" :value="dept.departmentId" />
        </el-select>
      </el-form-item>
      <el-form-item label="职位">
        <el-select placeholder="请选择职位" v-model="obj.emp.jobId">
            <el-option v-for="job in obj.jobList" :label="job.jobTitle" :value="job.jobId" :key="job.jobId" />
        </el-select>
      </el-form-item>
      <el-form-item label="薪资">
        <el-input  v-model="obj.emp.salary"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleAddEmp">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
</template>
    
<script setup>
import request from "../common/request";
import {ElMessage} from 'element-plus'
import { reactive } from "vue";
import {useRouter} from 'vue-router'

const router = useRouter();

const obj = reactive({
  jobList: [],
  deptList: [],
  emp:{
    firstName:'',
    lastName:'',
    email:'',
    phoneNumber:'',
    jobId:'',
    departmentId:'',
    salary:''
  }
});

const getDeptList = async() =>{
    let result = await request('dept/list');
    obj.deptList = result.data.data;
}
const getJobList = async() =>{
    let result = await request('job/list');
    obj.jobList = result.data.data;
}
getDeptList();
getJobList();


const handleAddEmp = ()=>{
    console.log(obj.emp);

    request({
        method:'post',
        url:'employee/add',
        data:obj.emp
    }).then(resp=>{
        if(resp.data.code != 200){
            ElMessage.error(resp.data.msg)
            return;
        }
        ElMessage({
            message:resp.data.msg,
            type:'success',
            duration:1000,
            onClose:()=>{
                router.push("/emp")
            }
        })
    })
}

</script>
    
<style>
</style>