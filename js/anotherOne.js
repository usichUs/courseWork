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

class FileSystem{
    data = null
    maxId = 0
    init(data) {
      this.data = data
      this.calcMaxId()
    }
  
    calcMaxId() {
      let maxId = 0;
      for (let i = 0; i < this.data.length; i++) {
        maxId = Math.max(maxId, this.data[i].id);
      }
      this.maxId = maxId;
    }
  
    createFolder(parentId, name) {
      this.maxId++;
      this.data.push({
        id: this.maxId,
        type: 0,
        parentId,
        name,
    })
    }
    
    createFile(parentId, name) {
      this.maxId++;
      this.data.push({
        id: this.maxId,
        type: 1,
        parentId,
        name,
      })
    }
    
    deleteFile(fileId) {
      for (let i = 0; i < this.data.length; i++) {
        if(this.data[i].type == 1 && this.data[i].id == fileId) {
            this.data.splice(i, 1);
            break;
        }
      }
    }
  }
  
  const insertFoler = ```<li>
  <span class="folder">Folder 1</span>
  <ul>

  </ul>
  </li>```
  const insertFile = `<li><span class="file">File 1.1</span></li>`

  class FileSystemHTML extends FileSystem{
    outerHtml = null
    drow(htmlElement) {
        this.outerHtml = htmlElement
        this.render();
      }
    
      render() {
    
      }
      
      createHTMLFolder(id, name) {
        let folder = document.createElement(`li`);
        folder.innerHTML = `<li><span class="folder">${name}</span> <ul></ul> </li>`;
        return folder;
      }

      createHTMLFile(id, name) {
        let file = document.createElement(`li`);
        file.innerHTML = `<li><span class="file">${name}</span></li>`;
        return file;
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
  
    // function deleteFolder(folderId) {
    //   const stack = [];
    
    //   // Удаляем все вложенные элементы из стека
    //   while (stack.length > 0) {
    //     const item = stack.pop();
        
    //     // for (let i = 0; i < FILESYSTEM.length; i++) {

    //     // }
      
    //       // Добавляем все вложенные элементы в стек
    //     for (let i = 0; i < FILESYSTEM.length; i++) {
    //       if (FILESYSTEM[i].parentId === item.id) {
    //         if(FILESYSTEM[i].type === 0) {
    //           stack.push(FILESYSTEM[i]);
    //         }
    //       }
    //     }
    
    //     // Удаляем текущий элемент
    //     const index = FILESYSTEM.indexOf(item);
    //     FILESYSTEM.splice(index, 1);
    //   }
    // } 