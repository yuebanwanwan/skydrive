/**
 * REST接口
 * date: 2019-04-23
 * author: zhouzhaoping
 */


class REST_API{
    static host(){
        let host = 'http://127.0.0.1:8000';
        return host;
    }
    static getFoldersAPI(){
        return REST_API.host().concat('/api/folders/');
    }

    static createFolders() {
        return REST_API.host().concat('/fstore/folderimage/');
    }
}

export default REST_API;
