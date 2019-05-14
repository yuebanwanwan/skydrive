/**
 * date: 2019年04月25日
 * 通用组件
 * author: zhouzhaoping
 */

import React from 'react';
import REST from '../static/js/REST_API';
import folder_png from '../static/img/folder.png';
import private_folder_png from '../static/img/private_folder_display.png';


function NewShareFolder(props) {
    return (
        <p className="new-folder-icon new-folder" onClick={props.onClick}>
            <span className="label label-success back">新建共享文件夹</span>
        </p>
    );
}

function GouIcon(props) {
    return (
        <span className="gou-icon" onClick={props.onClick}></span>
    );
}

function ChaIcon(props) {
    return (
        <span className="cha-icon" onClick={props.onClick}></span>
    );
}

function Input(props) {
    return (
        <input className="file-name" type="text" defaultValue="新建文件夹" onChange={props.onChange}/>
    );
}

class NewFolderTemplate extends React.Component{

    renderGouIcon(type) {
        return <GouIcon onClick={() => this.props.onClick(type)}/>;
    }

    renderChaIcon(type) {
        return <ChaIcon onClick={() => this.props.onClick(type)}/>;
    }

    rederInput() {
        return <Input onChange={this.props.onChange}/>;
    }

    render() {
        return (
            <div className="col-sm-2 create-panel">
                <div className="panel1 panel-default">
                    <div className="panel-body">
                        {this.props.isShareFolder ? <img src={folder_png} alt="图片加载失败"/>: <img src={private_folder_png} alt="图片加载失败"/>}
                    </div>
                    {this.rederInput()}
                    <div className="edit-region">
                        <div className="edit-icon">
                            {this.renderGouIcon('gou')}
                            {this.renderChaIcon('cha')}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function NewPrivateFolder(props) {
    return (
        <p className="private-folder-icon new-private-folder" onClick={props.onClick}>
            <span className="label label-success back">新建私有文件夹</span>
        </p>
    );
}

function UploadButton() {
    return (
        <p className="upload-icon upload" style={{display: 'none'}}>
            <span className="label label-info back">上传</span>
        </p>
    );
}

function ReturnButton() {
    return (
        <p className="ret-icon ret" style={{display: 'none'}}>
            <span className="label label-info back">返回</span>
        </p>
    );
}

function Column(props) {
    return (
        <span key={props.id} className="hierarchy-icon hierarchy-column" id={props.id}>
            <span className="label label-success back">{props.folder_name}</span>
        </span>
    );
}

// 文件操作三组件
function Download(props) {
    return (
        <p className="download-icon download" onClick={props.onClick}>
            <span className="label label-success back">下载</span>
        </p>
    );
}

function Delete(props) {
    return (
        <p className="delete-icon delete" onClick={props.onClick}>
            <span className="label label-success back" data-toggle="modal" data-target="#deletefiles">删除</span>
        </p>
    );
}

function Rename(props) {
    return (
        <p className="rename-icon rename" onClick={props.onClick}>
            <span className="label label-success back">重命名</span>
        </p>
    );
}



class Operate extends React.Component{
    renderDownload(type) {
        return (
            <Download onClick={(type) => this.props.onClick(type)}/>
        );
    }

    renderDelete(type) {
        return (
            <Delete onClick={() => this.props.onClick(type)}/>
        );
    }

    renderRename(type) {
        return (
            <Rename onClick={() => this.props.onClick(type)}/>
        );
    }

    render() {
        return (
            <div className="operate" style={{display: 'inline'}}>
                <div className="folder-operate" style={{display: 'inline'}}>
                    {this.renderDownload('download')}
                    {this.renderDelete('delete')}
                    {this.renderRename('rename')}
                </div>
            </div>
        );
    }
}

class Hierarchy extends React.Component{
    render() {
        return (
            <div id="hierarchy">
                <div className="hierarchy-body">
                    <Column/>
                </div>
            </div>
        );
    }
}

class BaseOperate extends React.Component{
    constructor() {
        super();
    }

    renderOperate() {
        return (
            <Operate onClick={this.props.onClick}/>
        );
    }

    renderNewShareFolder(type) {
        return (
            <NewShareFolder onClick={() => this.props.onClick(type)}/>
        );
    }

    renderPrivateFolder(type) {
        return (
            <NewPrivateFolder onClick={() => this.props.onClick(type)}/>
        );
    }

    render() {
        return (
            <div className="base-operate">
                {this.renderNewShareFolder('new-share-folder')}
                {this.renderPrivateFolder('new-private-folder')}
                <UploadButton/>
                <ReturnButton/>
                {this.props.focus.length > 0 ? this.renderOperate(): null}
                <Hierarchy/>
            </div>
        );
    }
}

// 另一大块
function FolderNoData() {
    return (
        <div className="folder-nodata" style={{display: 'none'}}>
            <img src="" alt=""/>
            <p>您还没上传文件哦, 可点击上方上传按钮进行上传~</p>
        </div>
    );
}

function Focus(props) {
    return (
        <span className="focus" onClick={props.onClick}></span>
    );
}


class Folder extends React.Component{
    constructor() {
        super();
    }

    renderFocus(type) {
        return (
            <Focus onClick={() => this.props.onClick(type)}/>
        );
    }

    handleClick() {
        console.log('Folder onClick.');
    }

    render() {
        return (
            <div className="col-sm-2">
                <div className={`folder-panel panel panel-default ${this.props.isFocus ? 'focus-parent': null}`} id={this.props.id} pre={this.props.pre} title={this.props.name}>
                    {this.renderFocus({data: this, type: 'focus'})}
                    <div className="panel-body">
                        <img src={this.props.url} alt="图片加载失败"/>
                    </div>
                    <div className="panel-footer">{this.props.name}</div>
                </div>
            </div>
        );
    }
}



function File(props) {
    return (
        <div className="col-sm-2" title={props.file_name}>
            <div className="file-panel panel panel-default" id={props.file_id} data-folder_id={props.folder_id}>
                <span className="focus"></span>
                <a href={props.download_url} className="download-me"></a>
                <div className="panel-body">
                    <img src={props.url} alt="文件加载失败"/>
                </div>
                <div className="panel-footer">{ props.file_name }.{ props.file_format }</div>
            </div>
        </div>
    );
}



class FolderBody extends React.Component{
    renderNewFolderTemplate() {
        return (
            <NewFolderTemplate onChange={this.props.onChange} onClick={this.props.onClick}
                               isShareFolder={this.props.isShareFolder}/>
        );
    }

    render() {
        let items = this.props.history.folders;
        items = items.map((item) => {return <Folder key={item.id} id={item.id} pre={item.pre}
                                                       name={item.folder_name} url={item.url} isFocus={item.isFocus}
                                                       onClick={this.props.onClick}/>;});
        let files = this.props.history.files;
        files = files.map((item) => {return <File key={item.file_id} file_name={item.file_name}
                                                       file_id={item.file_id} folder_id={item.folder_id}
                                                       download_url={item.download_url} url={item.url}
                                                       file_format={item.file_format}/>});
        return (
            <div className="col-sm-12">
                <div id="folder-body">
                    <div className="row folder-body">
                        {items}
                        {this.props.createFolder ? this.renderNewFolderTemplate(): null}
                        {files}
                    </div>
                </div>
            </div>
        );
    }
}

class Row extends React.Component{
    renderFolderBody() {
        return <FolderBody onChange={this.props.onChange} onClick={this.props.onClick} history={this.props.history}
                           createFolder={this.props.createFolder} isShareFolder={this.props.isShareFolder}/>;
    }
    render() {
        return (
            <div className="row">
                <FolderNoData/>
                {this.renderFolderBody()}
            </div>
        );
    }
}

class Container extends React.Component{
    constructor() {
        super();
        this.state = {
          history: [{
              folders: [],
              files: [],
              current_folders: []
          }],
          createFolder: false,
          isShareFolder: true,
          inPutValue: '新建文件夹',
          focus: [],
          operateColumn: {
              upload: false,
              Return: false,
              threeOperate: false
          }
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handelClickFocus = this.handelClickFocus.bind(this);
    }

    handelClickFocus(data) {
        console.log('data:', data);
        const id = data.props.id;
        let isFocus = data.props.isFocus;
        let history = this.state.history;
        for(let i = 0; i < history[history.length - 1].folders.length; i++){
            if(history[history.length - 1].folders[i].id === id){
                if(!isFocus){
                    history[history.length - 1].folders[i].isFocus = true;
                } else{
                    history[history.length - 1].folders[i].isFocus = false;
                }
                break;
            }
        }
        let old_focus = this.state.focus;
        this.setState({
            history: history,
            focus: isFocus ? old_focus.filter(item => item !== id): old_focus.concat([id]),
        });
    }

    handleClick(type) {
        console.log('type:', type);
        if(type.type === 'focus'){
            this.handelClickFocus(type.data);
            return;
        }
        if(type === 'new-share-folder'){
            this.setState({
                createFolder: true,
                isShareFolder: true
            });
            return;
        } else if(type === 'new-private-folder'){
            this.setState({
                createFolder: true,
                isShareFolder: false
            });
            return;
        }
        switch (type) {
            case 'gou':
                const history = this.state.history;
                const current = history[history.length -1];
                const current_folders = current.current_folders;
                const folder_name = this.state.inPutValue;
                let attribute = null;
                if(this.state.isShareFolder){
                    attribute = 'public';
                }else{
                    attribute = 'private';
                }
                const data = {
                    pre: current_folders,
                    attribute: attribute,
                    folder_name: folder_name
                };
                fetch(REST.createFolders(), {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'content-type': 'application/json'
                    }
                }).then((response) => {
                    if(response.ok){
                        let promise = response.json();
                        let new_folder = null;
                        promise.then((data) => {
                            if(data.attribute === 'public'){
                                data.url = folder_png;
                            } else if(data.attribute === 'private'){
                                data.url = private_folder_png;
                            }
                            data.isFocus = false;
                            new_folder = data;
                            let history = this.state.history;
                            history[history.length - 1].folders.push(new_folder);
                            const current_history = history;
                            this.setState({
                                history: current_history,
                                createFolder: false
                            });
                        });
                    } else{
                        alert('新建共享文件夹失败!');
                    }
                });
                break;
            case 'cha':
                this.setState({
                    createFolder: false
                });
                break;
            case 'delete':
                let before_delete_history = this.state.history;
                let before_delete_current = this.state.history[this.state.history.length - 1];
                for(let i = 0; i < before_delete_current.folders.length; i++){
                    if(this.state.focus.includes(before_delete_current.folders[i])){
                        this.setState({
                            focus: this.state.focus.filter(item => item !== before_delete_current.folders[i])
                        });
                    }
                }
                break;
            default:
                break;
        }
    }
    componentDidMount() {
        const mythis = this;
        // 初始化文件数据
        const url = REST.getFoldersAPI();
        fetch(url).then(function (response) {
            if(response.ok){
                response.json().then(function (data) {
                    for(let i = 0; i < data.length; i++){
                        if(data[i].attribute === 'public'){
                            data[i].url = folder_png;
                        } else if(data[i].attribute === 'private'){
                            data[i].url = private_folder_png;
                        }
                        data[i].isFocus = false;
                    }
                    mythis.setState({
                        history: mythis.state.history.concat([{
                            folders: data,
                            files: [],
                            // 初始化当前文件夹为主页
                            current_folders: 'main'
                        }]),
                    });
                });
            } else{
                alert('加载主页数据失败!');
            }
        });

    }

    handleOnChange(event) {
        event.persist();
        this.setState({
            inPutValue: event.target.value
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <BaseOperate onClick={(type) => this.handleClick(type)} operateColumn={this.state.operateColumn} focus={this.state.focus}/>
                <Row onChange={this.handleOnChange} onClick={this.handleClick} history={this.state.history[this.state.history.length - 1]}
                     createFolder={this.state.createFolder} isShareFolder={this.state.isShareFolder}/>
            </div>
        );
    }
}

export {Container};
