let maxID = 4;

const FILESYSTEM = [
    {
      id: 0,
      type: 0,
      parentId: null,
      name: 'Folder 1',
    },
    {
      id: 1,
      type: 0,
      parentId: null,
      name: 'Folder 2',
    },
    {
      id: 2,
      type: 0,
      parentId: 1,
      name: 'Folder 3',
    },
    {
      id: 3,
      type: 1,
      parentId: 1,
      name: 'File 1',
    },
    {
      id: 4,
      type: 1,
      parentId: 1,
      name: 'File 2',
    },
  ]

function createFolder(parentId, name) {
    FILESYSTEM.push({
        id:++maxID,
        type:0,
        parentId:parentId,
        name:name,
    })
}

function createFile(parentId, name) {
  FILESYSTEM.push({
    id:++maxID,
    type:1,
    parentId:parentId,
    name:name,
  })
}

function deleteFile(fileId) {
    for (let i = 0; i < FILESYSTEM.length; i++) {
      if(FILESYSTEM[i].type == 1 && FILESYSTEM[i].id == fileId) {
          FILESYSTEM.splice(i, 1);
      }
    }
    return;
  }  

function deleteFolder(folderId) {
    let mID;
    let dI;
    for (let i = 0; i < FILESYSTEM.length; i++) {
        if(FILESYSTEM[i].type === 0 && FILESYSTEM[i].id === folderId) {
            mID = FILESYSTEM[i].id;
            dI = i;
        }
    }
    for (let j = 0; j < FILESYSTEM.length; j++) {
        if(FILESYSTEM[j].type === 1 && FILESYSTEM[j].parentId === mID){
            FILESYSTEM.splice(j, 1);
            j--;
        }
    }
    FILESYSTEM.splice(dI, 1);
    return;
}

class FileSystem{
    data = null
    maxId = 0
    init(data) {
      this.data = data
      this.calcMaxId()
    }
  
    calcMaxId() {
  
    }
  
    createFolder(parentId, name) {
  
    }
    
    createFile(parentId, name) {
      
    }
    
    deleteFile(fileId) {
      
    }
    
    deleteFolder(folderId) {
      
    }
  }
  
  class FileSystemHTML extends FileSystem{
    outerHtml = null
    drow(htmlElement) {
        this.outerHtml = htmlElement
        this.render();
      }
    
      render() {
    
      }
    
      createFolder(parentId, name) {
        super.createFolder(parentId, name)
        this.render()
      }
      
      createFile(parentId, name) {
        super.createFile(parentId, name)
        this.render()
      }
      
      deleteFile(fileId) {
        super.deleteFile(fileId)
        this.render()
      }
      
      deleteFolder(folderId) {
        super.deleteFolder(folderId)
        this.render()
      }
    }
  





