import REST from "../static/js/REST_API";
import folder_png from "../static/img/folder.png";
import private_folder_png from "../static/img/private_folder_display.png";


const init_main_page = () => {
    // 初始化文件数据
    const url = REST.getFoldersAPI();
    fetch(url).then(function (response) {
        if(response.ok){
            response.json().then(function (data) {
                // global.ids.push('');
                for(let i = 0; i < data.length; i++){
                    if(data[i].attribute === 'public'){
                        data[i].url = folder_png;
                    } else{
                        data[i].url = private_folder_png;
                    }
                }
                return data;

                // global.stack.push({
                //     'folders': data,
                //     'files': []
                // });
                // utils.switch_nodata(vm);
                // utils.switch_upload_btn();
            });
        } else{
            alert('加载主页数据失败!');
        }
    });
    return false;
};

const post_data = (data, url) => {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    }).then()
};


export {init_main_page};
