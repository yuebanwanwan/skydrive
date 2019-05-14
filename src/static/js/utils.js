/**
 * data: 2019年04月19日
 * author: zhouzhaoping
 * 一些使用的工具函数
 */

import {index} from "./global";


// 以id关联判断文件、文件夹是否包含在指定的数组中
const contains = function (array, element) {
  for(let i=0; i<array.length; i++){
      if(array[i].id === element || array[i].file_id === element){
          return true;
      }
  }
  return false
};

// 以id关联删除数组中指定值的元素(原地删除)
const delete_element = function (array, value) {
    for(let i=0; i<array.length; i++){
        if(array[i].id === value || array[i].file_id === value){
            array.splice(i--, 1);
        }
    }
    return array;
};

// 当没有图片时显示特定图片提醒用户
const switch_nodata = function (vm) {
    let folder_nodata = document.querySelector('.folder-nodata');
    if(vm.datas.length === 0 && vm.file_datas.length === 0){
        folder_nodata.removeAttribute('class', 'display-none');
        folder_nodata.setAttribute('class', 'display-inline-block');
    } else{
        folder_nodata.removeAttribute('class', 'display-inline-block');
        folder_nodata.setAttribute('class', 'display-none');
    }
};

// 在不同场景切换上传按钮隐藏、显示
const switch_upload_btn = function () {
    let upload_btn = document.querySelector('.upload');
    if(index === 0){
        upload_btn.removeAttribute('class', 'display-inline-block');
        upload_btn.setAttribute('class', 'display-none');
    } else{
        upload_btn.removeAttribute('class', 'display-none');
        upload_btn.setAttribute('class', 'display-inline-block');
    }
};



export {contains, delete_element, switch_nodata, switch_upload_btn}
